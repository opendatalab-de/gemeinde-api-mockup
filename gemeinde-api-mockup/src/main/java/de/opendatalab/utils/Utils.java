package de.opendatalab.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.supercsv.io.CsvListReader;
import org.supercsv.prefs.CsvPreference;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.SimpleType;

public class Utils {

	public static void writeData(Object object, String filename) throws JsonProcessingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		String json = null;
		String prettyJson = System.getProperty("pretty.json", "true");
		if ("true".equals(prettyJson)) {
			ObjectWriter objectWriter = objectMapper.writerWithDefaultPrettyPrinter();
			json = objectWriter.writeValueAsString(object);
		}
		else {
			json = objectMapper.writeValueAsString(object);
		}
		OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(filename), Charset.forName("UTF8"));
		out.write(json);
		out.flush();
		out.close();
	}

	public static Map<String, Object> readGenericJson(InputStream in, String charset) {
		try {
			Map<String, Object> map = new ObjectMapper().readValue(
					new InputStreamReader(in, charset),
					MapType.construct(HashMap.class, SimpleType.construct(String.class),
							SimpleType.construct(Object.class)));
			return map;
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static List<String[]> readCsvFile(String filename) {
		try {
			return readCsvFile(new FileInputStream(filename));
		}
		catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
	}

	public static List<String[]> readCsvFile(InputStream in) {
		try {
			long time = System.currentTimeMillis();
			Reader input = new InputStreamReader(in, Charset.forName("ISO-8859-1"));
			CsvListReader reader = new CsvListReader(input, CsvPreference.EXCEL_NORTH_EUROPE_PREFERENCE);
			List<String[]> result = new ArrayList<>();
			List<String> lineOfStrings = null;
			do {
				lineOfStrings = reader.read();
				if (lineOfStrings != null) {
					String[] line = new String[lineOfStrings.size()];
					for (int x = 0; x < lineOfStrings.size(); x++) {
						String cell = lineOfStrings.get(x);
						if (cell != null) {
							line[x] = cell.intern();
						}
						else
							line[x] = "";
					}
					result.add(line);
				}
			} while (lineOfStrings != null);
			reader.close();
			System.out.println("readAll: " + (System.currentTimeMillis() - time) + " ms, Elemente: " + result.size());
			return result;
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public static Map<String, Object> asMap(Object... objects) {
		Map<String, Object> result = new HashMap<>();
		for (int x = 0; x < objects.length; x += 2) {
			result.put((String)objects[x], objects[x + 1]);
		}
		return result;
	}

	public static boolean hasText(String s) {
		return s != null && !s.trim().isEmpty();
	}

	public static Map<String, Object> filterGeoJsonByKey(Map<String, Object> geoJson, String... rsKeys) {
		Map<String, Object> result = Utils.asMap("type", geoJson.get("type"));
		List<Map<String, Object>> filteredFeatures = new ArrayList<>();
		result.put("features", filteredFeatures);
		List<Map<String, Object>> features = (List<Map<String, Object>>)geoJson.get("features");
		Iterator<Map<String, Object>> it = features.iterator();
		while (it.hasNext()) {
			Map<String, Object> feature = it.next();
			Map<String, Object> properties = (Map<String, Object>)feature.get("properties");
			String rs = (String)properties.get("RS");
			for (String rsKey : rsKeys) {
				if (rs != null && rs.startsWith(rsKey)) {
					Map<String, Object> newProperties = new HashMap<>();
					newProperties.put("RS", properties.get("RS"));
					newProperties.put("AGS", rsToAgs((String)properties.get("RS")));
					newProperties.put("Name", properties.get("GEN"));
					newProperties.put("Status", properties.get("DES"));
					newProperties.put("Einwohner", properties.get("EWZ"));
					newProperties.put("qkm", properties.get("SHAPE_AREA"));
					Map<String, Object> newFeature = Utils.asMap("type", feature.get("type"), "geometry",
							feature.get("geometry"), "properties", newProperties);
					filteredFeatures.add(newFeature);
					break;
				}
			}
		}
		return result;
	}

	public static String rsToAgs(String rs) {
		if (rs.length() == 12) {
			return rs.substring(0, 5) + rs.substring(9);
		}
		else
			return rs;
	}
}

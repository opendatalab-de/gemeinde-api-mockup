package de.opendatalab.utils;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Realsteuervergleich {

	public static void main(String[] args) {
		try {
			Map<String, Object> json = Utils.readGenericJson(new FileInputStream(args[0]), "utf8");
			ParserConfiguration configuration = new ParserConfiguration(7, new String[] { "grundsteuerAIstaufkommen",
					"grundsteuerBIstaufkommen", "gewerbesteuerIstaufkommen", "grundsteuerAGrundbetrag",
					"grundsteuerBGrundbetrag", "gewerbesteuerGrundbetrag", "grundsteuerAHebesatz",
					"grundsteuerBHebesatz", "gewerbesteuerHebesatz", "gemeindeanteilAnDerEinkommensteuer",
					"gemeindeanteilAnDerUmsatzsteuer", "gewerbesteuerumlage", "gewerbesteuereinnahmen" });
			ConfigurableParser parser = new ConfigurableParser(Utils.readCsvFile(args[1]), configuration);
			Map<String, Map<String, Object>> rsMap = parser.parse();
			Map<String, Object> result = filterGeoJsonByKey(json, "realsteuer", rsMap);
			System.out.println("Objects: " + ((List<Object>)result.get("features")).size());
			Utils.writeData(result, args[2]);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Map<String, Object> filterGeoJsonByKey(Map<String, Object> geoJson, String label,
			Map<String, Map<String, Object>> rsMap) {
		Map<String, Object> result = Utils.asMap("type", geoJson.get("type"));
		List<Map<String, Object>> filteredFeatures = new ArrayList<>();
		result.put("features", filteredFeatures);
		List<Map<String, Object>> features = (List<Map<String, Object>>)geoJson.get("features");
		Iterator<Map<String, Object>> it = features.iterator();
		while (it.hasNext()) {
			Map<String, Object> feature = it.next();
			Map<String, Object> properties = (Map<String, Object>)feature.get("properties");
			String ags = (String)properties.get("AGS");
			Map<String, Object> data = rsMap.get(ags);
			if (data != null) {
				Map<String, Object> newProperties = new HashMap<>(properties);
				newProperties.putAll(data);
				Map<String, Object> newFeature = Utils.asMap("type", feature.get("type"), "geometry",
						feature.get("geometry"), "properties", newProperties);
				filteredFeatures.add(newFeature);
			}
		}
		return result;
	}
}

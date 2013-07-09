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
			RealsteuerParser parser = new RealsteuerParser(Utils.readCsvFile(args[1]));
			List<Realsteuer> list = parser.parse();
			Map<String, Realsteuer> rsMap = toMap(list);
			Map<String, Object> result = filterGeoJsonByKey(json, rsMap);
			System.out.println("Objects: " + ((List<Object>)result.get("features")).size());
			Utils.writeData(result, args[2]);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static Map<String, Realsteuer> toMap(List<Realsteuer> list) {
		Map<String, Realsteuer> result = new HashMap<String, Realsteuer>();
		for (Realsteuer realsteuer : list) {
			System.out.println(realsteuer.getKs());
			result.put(realsteuer.getKs(), realsteuer);
		}
		return result;
	}

	public static Map<String, Object> filterGeoJsonByKey(Map<String, Object> geoJson, Map<String, Realsteuer> rsMap) {
		Map<String, Object> result = Utils.asMap("type", geoJson.get("type"));
		List<Map<String, Object>> filteredFeatures = new ArrayList<>();
		result.put("features", filteredFeatures);
		List<Map<String, Object>> features = (List<Map<String, Object>>)geoJson.get("features");
		Iterator<Map<String, Object>> it = features.iterator();
		while (it.hasNext()) {
			Map<String, Object> feature = it.next();
			Map<String, Object> properties = (Map<String, Object>)feature.get("properties");
			String ags = (String)properties.get("AGS");
			Realsteuer realsteuer = rsMap.get(ags);
			if (realsteuer != null) {
				Map<String, Object> newProperties = new HashMap<>(properties);
				newProperties.put("realsteuer", realsteuer);
				Map<String, Object> newFeature = Utils.asMap("type", feature.get("type"), "geometry",
						feature.get("geometry"), "properties", newProperties);
				filteredFeatures.add(newFeature);
			}
		}
		return result;
	}
}

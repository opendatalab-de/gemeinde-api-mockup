package de.opendatalab.utils;

import java.io.FileInputStream;
import java.util.List;
import java.util.Map;

public class GemeindeFilter {

	public static void main(String[] args) {
		try {
			Map<String, Object> json = Utils.readGenericJson(new FileInputStream(args[0]), "utf8");
			Map<String, Object> result = Utils.filterGeoJsonByKey(json, "08125", "08121");
			System.out.println("Objects: " + ((List<Object>)result.get("features")).size());
			Utils.writeData(result, args[1]);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}

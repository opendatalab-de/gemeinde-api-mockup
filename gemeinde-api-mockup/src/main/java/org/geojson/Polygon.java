package org.geojson;

import java.util.List;

public class Polygon extends GeoJsonObject {

	private List<List<double[]>> coordinates;

	public List<List<double[]>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<double[]>> coordinates) {
		this.coordinates = coordinates;
	}
}
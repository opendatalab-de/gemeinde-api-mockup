package org.geojson;

import java.util.List;

public class MultiPolygon extends GeoJsonObject {

	private List<List<List<double[]>>> coordinates;

	public List<List<List<double[]>>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<List<double[]>>> coordinates) {
		this.coordinates = coordinates;
	}
}

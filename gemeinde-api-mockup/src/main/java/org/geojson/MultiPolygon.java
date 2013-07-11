package org.geojson;

import java.util.ArrayList;
import java.util.List;

public class MultiPolygon extends GeoJsonObject {

	private List<List<List<LngLatAlt>>> coordinates = new ArrayList<>();

	public MultiPolygon() {
	}

	public MultiPolygon(Polygon polygon) {
		add(polygon);
	}

	public MultiPolygon add(Polygon polygon) {
		coordinates.add(polygon.getCoordinates());
		return this;
	}

	public List<List<List<LngLatAlt>>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<List<LngLatAlt>>> coordinates) {
		this.coordinates = coordinates;
	}
}

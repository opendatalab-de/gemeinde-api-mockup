package org.geojson;

import java.util.ArrayList;
import java.util.List;

public class AbstractCoordinatesList extends GeoJsonObject {

	protected List<List<LngLatAlt>> coordinates = new ArrayList<>();

	public List<List<LngLatAlt>> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<List<LngLatAlt>> coordinates) {
		this.coordinates = coordinates;
	}

	public AbstractCoordinatesList add(List<LngLatAlt> line) {
		coordinates.add(line);
		return this;
	}
}

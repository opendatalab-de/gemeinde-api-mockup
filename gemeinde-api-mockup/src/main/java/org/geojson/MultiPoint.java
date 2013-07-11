package org.geojson;

import java.util.ArrayList;
import java.util.List;

public class MultiPoint extends GeoJsonObject {

	private List<LngLatAlt> coordinates = new ArrayList<LngLatAlt>();

	public MultiPoint() {
	}

	public MultiPoint(LngLatAlt... points) {
		for (LngLatAlt lngLatAlt : points) {
			coordinates.add(lngLatAlt);
		}
	}

	public List<LngLatAlt> getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(List<LngLatAlt> coordinates) {
		this.coordinates = coordinates;
	}
}

package org.geojson;

import java.util.List;

public class MultiLineString extends AbstractCoordinatesList {

	public MultiLineString() {
	}

	public MultiLineString(List<LngLatAlt> line) {
		add(line);
	}
}

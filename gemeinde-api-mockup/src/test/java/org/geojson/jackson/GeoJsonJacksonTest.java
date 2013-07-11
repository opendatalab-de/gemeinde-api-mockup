package org.geojson.jackson;

import static org.junit.Assert.*;

import java.io.InputStreamReader;

import org.geojson.GeoJsonObject;
import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.opendatalab.utils.ResourceUtils;

public class GeoJsonJacksonTest {

	private ObjectMapper mapper = new ObjectMapper();

	@Test
	public void itShouldParseGeoJson() throws Exception {
		GeoJsonObject featureCollection = mapper.readValue(
				new InputStreamReader(ResourceUtils.getResourceAsStream("heilbronn.geojson"), "utf8"),
				GeoJsonObject.class);
		assertNotNull(featureCollection);
	}
}

package de.opendatalab.utils;

import static org.junit.Assert.*;

import org.junit.Test;

public class UtilsTest {

	@Test
	public void itShouldReturnAgs() throws Exception {
		assertEquals("08125039", Utils.rsToAgs("081250039039"));
	}
}

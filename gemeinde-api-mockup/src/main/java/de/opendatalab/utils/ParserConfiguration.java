package de.opendatalab.utils;

public class ParserConfiguration {

	private int skipLines;
	private String[] properties;

	public ParserConfiguration(int skipLines, String[] properties) {
		this.skipLines = skipLines;
		this.properties = properties;
	}

	public int getSkipLines() {
		return skipLines;
	}

	public String[] getProperties() {
		return properties;
	}
}

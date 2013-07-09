package de.opendatalab.utils;

import java.util.Collection;

public class ConfigurableParser extends AbstractCsvParser {

	protected ConfigurableParser(Collection<String[]> lines, ParserConfiguration configuration) {
		super(lines, configuration);
	}

	@Override
	protected KeyValue parseItem(String[] strings) {
		try {
			if (strings.length == 15) {
				String areaKey = strings[0];
				KeyValue keyValue = new KeyValue(areaKey);
				for (int x = 0; x < configuration.getProperties().length; x++) {
					String property = configuration.getProperties()[x];
					String value = strings[2 + x];
					Long convertedValue = Long.valueOf(value);
					keyValue.setValue(property, convertedValue);
				}
				return keyValue;
			}
			else
				return null;
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}

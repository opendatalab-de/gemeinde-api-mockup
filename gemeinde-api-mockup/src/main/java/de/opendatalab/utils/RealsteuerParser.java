package de.opendatalab.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

public class RealsteuerParser extends AbstractColumnCsvParser<Realsteuer> {

	private static final int AREA_KEY = 0;
	public static final String[] PROPERTIES = { "grundsteuerAIstaufkommen", "grundsteuerBIstaufkommen",
			"gewerbesteuerIstaufkommen", "grundsteuerAGrundbetrag", "grundsteuerBGrundbetrag",
			"gewerbesteuerGrundbetrag", "grundsteuerAHebesatz", "grundsteuerBHebesatz", "gewerbesteuerHebesatz",
			"gemeindeanteilAnDerEinkommensteuer", "gemeindeanteilAnDerUmsatzsteuer", "gewerbesteuerumlage",
			"gewerbesteuereinnahmen" };

	public RealsteuerParser(Collection<String[]> lines) {
		super(lines, 6);
	}

	@Override
	protected List<Realsteuer> parseItem(String[] strings) {
		List<Realsteuer> result = new ArrayList<>();
		List<ColumnDefinition> columnDefinitions = getColumnDefinitions();
		try {
			if (strings.length == columnDefinitions.size()) {
				String areaKey = strings[AREA_KEY];
				Realsteuer rs = new Realsteuer();
				rs.setKs(areaKey);
				for (int x = 0; x < PROPERTIES.length; x++) {
					String property = PROPERTIES[x];
					String value = strings[2 + x];
					Long convertedValue = Long.valueOf(value);
					BeanUtils.setProperty(rs, property, convertedValue);
				}
				result.add(rs);
			}
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
		return result;
	}
}

package de.opendatalab.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public abstract class AbstractColumnCsvParser<T> extends AbstractCsvParser<T> {

	private int columnLine;
	private List<ColumnDefinition> columnDefinitions;

	public AbstractColumnCsvParser(Collection<String[]> lines, int columnLine) {
		super(lines);
		this.columnLine = columnLine;
	}

	@Override
	public List<T> parse() {
		Iterator<String[]> it = lines.iterator();
		columnDefinitions = parseColumnLine(getColumnLine(it, columnLine));
		return parseWithIterator(it);
	}

	public List<ColumnDefinition> getColumnDefinitions() {
		return columnDefinitions;
	}

	protected String[] getColumnLine(Iterator<String[]> it, int columnLine) {
		int lineCounter = 0;
		String[] line = null;
		do {
			line = it.next();
		} while (lineCounter++ < columnLine && it.hasNext());
		return line;
	}

	protected List<ColumnDefinition> parseColumnLine(String[] line) {
		List<ColumnDefinition> result = new ArrayList<>();
		for (String colDef : line) {
			ColumnDefinition cd = parseSingleColumn(colDef);
			if (cd != null)
				result.add(cd);
		}
		return result;
	}

	protected ColumnDefinition parseSingleColumn(String column) {
		return new ColumnDefinition(0, column);
	}
}

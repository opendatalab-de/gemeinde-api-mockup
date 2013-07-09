package de.opendatalab.utils;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public abstract class AbstractCsvParser<T> {

	protected Collection<String[]> lines;

	protected AbstractCsvParser(Collection<String[]> lines) {
		this.lines = lines;
	}

	public List<T> parse() {
		return parseWithIterator(lines.iterator());
	}

	protected List<T> parseWithIterator(Iterator<String[]> iterator) {
		List<T> result = new LinkedList<>();
		while (iterator.hasNext()) {
			List<T> item = parseItem(iterator.next());
			if (item != null)
				result.addAll(item);
		}
		return result;
	}

	protected abstract List<T> parseItem(String[] strings);
}

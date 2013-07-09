(function(hdv, Handlebars) {
	'use strict';
	Handlebars.registerHelper('number', function(n) {
		return hdv.formatter.number(n);
	});
	Handlebars.registerHelper('currency', function(n) {
		return hdv.formatter.number(n) + '&nbsp;&euro;';
	});
	Handlebars.registerHelper('financeValue', function(n) {
		if (n === '-' || n === null || n === undefined) {
			return 'nichts vorhanden';
		}
		if (n === '.') {
			return 'unbekannt oder geheimzuhalten';
		}
		return hdv.formatter.number(n) + '&nbsp;&euro;';
	});

	Handlebars.registerHelper('eachProperty', function(context, options) {
		var result = "";
		for ( var key in context) {
			result = result + options.fn({
				'key': key,
				'value': context[key]
			});
		}
		return result;
	});
})(hdv, Handlebars);
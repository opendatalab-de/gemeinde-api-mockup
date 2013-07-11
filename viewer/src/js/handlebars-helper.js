(function(ga, Handlebars) {
	'use strict';
	Handlebars.registerHelper('number', function(n) {
		return ga.formatter.number(n);
	});
	Handlebars.registerHelper('currency', function(n) {
		return ga.formatter.number(n) + '&nbsp;&euro;';
	});
	Handlebars.registerHelper('financeValue', function(n) {
		if (n === '-' || n === null || n === undefined) {
			return 'nichts vorhanden';
		}
		if (n === '.') {
			return 'unbekannt oder geheimzuhalten';
		}
		return ga.formatter.number(n) + '&nbsp;&euro;';
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
})(ga, Handlebars);
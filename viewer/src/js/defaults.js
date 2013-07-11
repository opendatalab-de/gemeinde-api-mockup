(function(ga, _) {
	'use strict';
	var defaults = {
		lat: 49.15,
		lon: 9.2,
		zoom: 10,
		areaType: 'gemeinden',
		valueType: 'Einwohner'
	};

	var defaultService = {
		init: function(options) {
			_.extend(ga.defaults, options, this._parseSearchQuery(window.location.search));
		},
		_parseSearchQuery: function(search) {
			var defaults = {};
			if (search) {
				var params = search.substr(1).split('&');
				_.each(params, function(param) {
					var keyValue = param.split("=");
					if (keyValue.length == 2)
						defaults[keyValue[0]] = keyValue[1];
				});
			}
			return defaults;
		}
	};

	ga.defaults = defaults;
	ga.defaultService = defaultService;
})(ga, _);

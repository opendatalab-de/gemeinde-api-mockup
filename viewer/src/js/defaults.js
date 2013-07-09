(function(hdv, _) {
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
			_.extend(hdv.defaults, options, this._parseSearchQuery(window.location.search));
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

	hdv.defaults = defaults;
	hdv.defaultService = defaultService;
})(hdv, _);

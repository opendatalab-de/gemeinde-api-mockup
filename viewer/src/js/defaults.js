(function(hdv, _) {
	'use strict';
	var defaults = {
		lat: 51.463,
		lon: 7.88,
		zoom: 9,
		product: 999,
		account: 7,
		relation: 'none',
		areaType: 'gemeinden',
		year: 2009
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

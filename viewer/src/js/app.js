var ga = {};

(function(ga, $, _, Handlebars) {
	'use strict';
	ga.init = function(options) {
		ga.defaultService.init(options);
		ga.map.init();
		ga.loader.init();
		ga.settingsService.init();
	};
})(ga, jQuery, _, Handlebars);

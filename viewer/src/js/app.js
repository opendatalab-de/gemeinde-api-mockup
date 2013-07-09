var hdv = {};

(function(hdv, $, _, Handlebars) {
	'use strict';
	hdv.init = function(options) {
		hdv.defaultService.init(options);
		hdv.map.init();
		hdv.loader.init();
		hdv.settingsService.init();
	};
})(hdv, jQuery, _, Handlebars);

(function(hdv, _, $) {
	'use strict';
	var settingsService = {
		init: function() {
			$('.settings').on('change', _.bind(this.update, this));
			this.update();
		},
		update: function() {
			var settings = hdv.serialize.toLiteral($('.settings').serializeArray());
			hdv.settings = settings;
			$(hdv).triggerHandler('settingsUpdate');
		}
	};

	hdv.settings = {};
	hdv.settingsService = settingsService;
})(hdv, _, jQuery);
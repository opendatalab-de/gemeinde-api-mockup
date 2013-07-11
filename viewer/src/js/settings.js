(function(hdv, _, $) {
	'use strict';
	var settingsService = {
		init: function() {
			$('.settings').on('change', _.bind(this.update, this));
			this.update();
		},
		update: function() {
			var settings = hdv.serialize.toLiteral($('.settings').serializeArray());

			var valueOption = $('select[name="valueType"]').find(':selected');
			settings.valueUnit = valueOption.data('unit');
			settings.valueConverter = valueOption.data('converter');

			hdv.settings = settings;
			$(hdv).triggerHandler('settingsUpdate');
		}
	};

	hdv.settings = {};
	hdv.settingsService = settingsService;
})(hdv, _, jQuery);
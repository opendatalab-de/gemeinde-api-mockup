(function(ga, _, $) {
	'use strict';
	var settingsService = {
		init: function() {
			$('.settings').on('change', _.bind(this.update, this));
			this.update();
		},
		update: function() {
			var settings = ga.serialize.toLiteral($('.settings').serializeArray());

			var valueOption = $('select[name="valueType"]').find(':selected');
			settings.valueUnit = valueOption.data('unit');
			settings.valueConverter = valueOption.data('converter');

			var relationOption = $('select[name="relation"]').find(':selected');
			settings.relationUnit = relationOption.data('unit');
			settings.relationConverter = relationOption.data('converter');

			ga.settings = settings;
			$(ga).triggerHandler('settingsUpdate');

			history.replaceState(null, null, this.buildPermalink());
		},
		buildPermalink: function() {
			var baseUrl = window.location.href;
			if (baseUrl.indexOf('?') > 0) {
				baseUrl = baseUrl.substr(0, baseUrl.indexOf('?'));
			}
			return baseUrl + '?' + $.param($('.settings').serializeArray());
		}
	};

	ga.settings = {};
	ga.settingsService = settingsService;
})(ga, _, jQuery);
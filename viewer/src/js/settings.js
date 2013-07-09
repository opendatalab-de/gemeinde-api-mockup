(function(hdv, _, $) {
	'use strict';
	var settingsService = {
		init: function() {
			$('.settings').on('change', _.bind(this.update, this));
			this.update();
		},
		update: function() {
			var settings = hdv.serialize.toLiteral($('.settings').serializeArray());
			hdv.settings = this._mergeSettings(settings, hdv.defaults);
			$(hdv).triggerHandler('settingsUpdate');
		},
		resetAccount: function() {
			hdv.settings.account = hdv.defaults.account;
		},
		_mergeSettings: function(settings, defaults) {
			settings.product = this._mergeProperty(settings.product, defaults.product);
			settings.account = this._mergeProperty(settings.account, defaults.account);
			return settings;
		},
		_mergeProperty: function(value, defaultValue) {
			return !value || value === 'none' ? defaultValue : value;
		}
	};

	hdv.settings = {};
	hdv.settingsService = settingsService;
})(hdv, _, jQuery);
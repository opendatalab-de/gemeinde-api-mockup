(function(hdv, $, _, Handlebars) {
	'use strict';
	var balance = {
		template: null,
		init: function(key) {
			this.template = Handlebars.compile($('#balance-template').html());

			var handleSuccess = function(data) {
				this.render(key, data);
			};

			var handleError = function() {
				$('.load-error').text('Keine Bilanz für Gemeindeschlüssel ' + key + ' vorhanden!');
				$('.alert').show();
				$('#balance').hide();
			};

			var postLoad = function() {
				$('.ajax-loader').hide();
			};

			$.getJSON('data/bilanz/' + key + '.json').done(_.bind(handleSuccess, this)).fail(handleError).always(postLoad);
		},
		render: function(key, data) {
			$('h1').text('Bilanz von ' + data.label);
			$('.assets').html(this.template(data.assets));
			$('.liabilities').html(this.template(data.liabilities));
		},
		getKeyForArea: function(areaKey, areaAttribute) {
			if (areaKey.length > 5) {
				return areaKey;
			}
			return areaAttribute === 'Kreis' ? areaKey + '001' : areaKey + '000';
		}
	};

	hdv.balance = balance;
})(hdv, jQuery, _, Handlebars);
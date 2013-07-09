(function(hdv, $, _, Handlebars) {
	'use strict';
	var areaValue = {
		getCurrentLabel: function() {
			var label = $('.settings select[name="valueType"] option:selected').text();
			return label;
		}
	};

	var areas = {
		init: function() {
			$(hdv).on('loader.finished', _.bind(this.update, this));
		},
		getTemplateObject: function(valueLabel, areaLayer, value) {
			return {
				'valueLabel': valueLabel,
				'areaLabel': areaLayer.Name,
				'value': value
			};
		},
		refreshLayer: function(areaLayer, log10Boundaries, valueLabel, settings) {
			var value = hdv.calc.nullSafeNumber(areaLayer[settings.valueType]);
			var templateObject = this.getTemplateObject(valueLabel, areaLayer, value);

			areaLayer.value.setStyle(hdv.layerStyle.forValue(value, log10Boundaries, true, false));
			areaLayer.value.bindPopup(hdv.map.templates.popup(templateObject));
		},
		refreshLayers: function(settings) {
			var boundaries = hdv.boundaries.findAccordingTo(settings);
			var log10Boundaries = hdv.boundaries.toLog10(boundaries);
			var valueLabel = areaValue.getCurrentLabel();

			_.each(hdv.data.areaLayers, _.bind(function(areaLayer) {
				this.refreshLayer(areaLayer, log10Boundaries, valueLabel, settings);
			}, this));
		},
		update: function() {
			this.refreshLayers(hdv.settings);
		}
	};

	hdv.areas = areas;
	hdv.areaValue = areaValue;
	areas.init();
})(hdv, jQuery, _, Handlebars);
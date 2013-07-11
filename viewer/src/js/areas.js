(function(hdv, $, _, Handlebars) {
	'use strict';
	var converters = {
		qmToqkm: function(value) {
			return Math.round(value / 1000000 * 100) / 100;
		},
		x1000: function(value) {
			return value * 1000;
		}
	};

	var areaValue = {
		of: function(areaLayer) {
			return this.convert(areaLayer[hdv.settings.valueType], hdv.settings.valueConverter);
		},
		convert: function(rawValue, converterName) {
			var value = hdv.calc.nullSafeNumber(rawValue);
			if (converterName) {
				var converter = converters[converterName];
				value = converter(value);
			}
			return value;
		},
		getLabel: function() {
			return $('select[name="valueType"] option:selected').text() + ':';
		}
	};

	var areas = {
		init: function() {
			$(hdv).on('loader.finished', _.bind(this.update, this));
		},
		getTemplateObject: function(areaLayer, value, valueLabel, unit) {
			return {
				'areaLabel': areaLayer.Name,
				'valueLabel': valueLabel,
				'value': value,
				'unit': unit
			};
		},
		refreshLayer: function(areaLayer, log10Boundaries, settings, valueLabel) {
			var value = hdv.areaValue.of(areaLayer);
			var templateObject = this.getTemplateObject(areaLayer, value, valueLabel, settings.valueUnit);

			areaLayer.value.setStyle(hdv.layerStyle.forValue(value, log10Boundaries, true, false));
			areaLayer.value.bindPopup(hdv.map.templates.popup(templateObject));
		},
		refreshLayers: function(settings) {
			var boundaries = hdv.boundaries.findAccordingTo(settings);
			var log10Boundaries = hdv.boundaries.toLog10(boundaries);
			var valueLabel = areaValue.getLabel();

			_.each(hdv.data.areaLayers, _.bind(function(areaLayer) {
				this.refreshLayer(areaLayer, log10Boundaries, settings, valueLabel);
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
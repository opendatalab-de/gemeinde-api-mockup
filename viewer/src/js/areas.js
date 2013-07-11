(function(ga, $, _, Handlebars) {
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
			return this.convert(areaLayer[ga.settings.valueType], ga.settings.valueConverter);
		},
		convert: function(rawValue, converterName) {
			var value = ga.calc.nullSafeNumber(rawValue);
			if (converterName) {
				var converter = converters[converterName];
				value = converter(value);
			}
			return value;
		},
		getLabel: function() {
			return $('select[name="valueType"] option:selected').text() + ':';
		},
		getGroupLabel: function() {
			return $('select[name="valueType"] option:selected').closest('optgroup').attr('label');
		}
	};

	var areas = {
		init: function() {
			$(ga).on('loader.finished', _.bind(this.update, this));
		},
		getTemplateObject: function(areaLayer, value, valueLabel, groupLabel, unit) {
			return {
				'areaLabel': areaLayer.Name,
				'valueLabel': valueLabel,
				'groupLabel': groupLabel,
				'value': value,
				'unit': unit
			};
		},
		refreshLayer: function(areaLayer, log10Boundaries, settings, valueLabel, groupLabel) {
			var value = ga.areaValue.of(areaLayer);
			var templateObject = this.getTemplateObject(areaLayer, value, valueLabel, groupLabel, settings.valueUnit);

			areaLayer.value.setStyle(ga.layerStyle.forValue(value, log10Boundaries, true, false));
			areaLayer.value.bindPopup(ga.map.templates.popup(templateObject));
		},
		refreshLayers: function(settings) {
			var boundaries = ga.boundaries.findAccordingTo(settings);
			var log10Boundaries = ga.boundaries.toLog10(boundaries);
			var valueLabel = areaValue.getLabel();
			var groupLabel = areaValue.getGroupLabel();

			_.each(ga.data.areaLayers, _.bind(function(areaLayer) {
				this.refreshLayer(areaLayer, log10Boundaries, settings, valueLabel, groupLabel);
			}, this));
		},
		update: function() {
			this.refreshLayers(ga.settings);
		}
	};

	ga.areas = areas;
	ga.areaValue = areaValue;
	areas.init();
})(ga, jQuery, _, Handlebars);
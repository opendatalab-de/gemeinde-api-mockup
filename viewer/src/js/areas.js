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
		relationOf: function(areaLayer) {
			return this.convert(areaLayer[ga.settings.relation], ga.settings.relationConverter);
		},
		comparisonValueOf: function(areaLayer) {
			var value = ga.areaValue.of(areaLayer);
			var relationValue = ga.areaValue.relationOf(areaLayer);
			return this.inRelationTo(value, relationValue);
		},
		inRelationTo: function(value, relationValue) {
			if (relationValue <= 0) {
				return value;
			}
			return Math.round(value / relationValue * 10000) / 10000;
		},
		convert: function(rawValue, converterName) {
			var value = ga.calc.nullSafeNumber(rawValue);
			if (converterName) {
				var converter = converters[converterName];
				value = converter(value);
			}
			return value;
		},
		getValueInfo: function(settings) {
			return {
				label: $('select[name="valueType"] option:selected').text() + ':',
				groupLabel: $('select[name="valueType"] option:selected').closest('optgroup').attr('label'),
				unit: settings.valueUnit
			};
		},
		getRelationInfo: function(settings) {
			return {
				label: $('select[name="relation"] option:selected').text() + ':',
				groupLabel: $('select[name="relation"] option:selected').closest('optgroup').attr('label'),
				unit: settings.relationUnit
			};
		}
	};

	var areas = {
		init: function() {
			$(ga).on('loader.finished', _.bind(this.update, this));
		},
		getTemplateObject: function(areaLayer, value, relationValue, comparisonValue, valueInfo, relationInfo) {
			return {
				'areaLabel': areaLayer.Name,
				'value': value,
				'valueInfo': valueInfo,
				'relationValue': relationValue,
				'relationInfo': relationInfo,
				'comparisonValue': Math.round(comparisonValue * 100) / 100,
				'hideRelation': relationInfo.unit === '-' ? true : false
			};
		},
		refreshLayer: function(areaLayer, log10Boundaries, settings, valueInfo, relationInfo) {
			var value = ga.areaValue.of(areaLayer);
			var relationValue = ga.areaValue.relationOf(areaLayer);
			var comparisonValue = ga.areaValue.comparisonValueOf(areaLayer);
			var templateObject = this.getTemplateObject(areaLayer, value, relationValue, comparisonValue, valueInfo, relationInfo);

			areaLayer.value.setStyle(ga.layerStyle.forValue(comparisonValue, log10Boundaries, true, false));
			areaLayer.value.bindPopup(ga.map.templates.popup(templateObject));
		},
		refreshLayers: function(settings) {
			var boundaries = ga.boundaries.findAccordingTo(settings);
			var log10Boundaries = ga.boundaries.toLog10(boundaries);
			var valueInfo = areaValue.getValueInfo(settings);
			var relationInfo = areaValue.getRelationInfo(settings);

			_.each(ga.data.areaLayers, _.bind(function(areaLayer) {
				this.refreshLayer(areaLayer, log10Boundaries, settings, valueInfo, relationInfo);
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
(function(ga, _, $) {
	'use strict';
	var data = {
		areaLayers: [],
		meta: {},
		values: {},
		getAreaLayer: function(key) {
			return _.find(this.areaLayers, function(area) {
				return area.key == key;
			});
		},
		buildAreaLayer: function(feature, layer) {
			return _.extend({
				'value': layer
			}, feature.properties);
		},
		addAreaLayer: function(feature, layer) {
			var areaLayer = this.buildAreaLayer(feature, layer);
			this.areaLayers.push(areaLayer);
		}
	};

	ga.data = data;
})(ga, _, jQuery);

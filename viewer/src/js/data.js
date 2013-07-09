(function(hdv, _, $) {
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
			return {
				'key': feature.properties.KN ? feature.properties.KN : feature.properties.AGS,
				'label': feature.properties.GN ? feature.properties.GN : feature.properties.GEN,
				'attribute': feature.properties.DES,
				'value': layer
			};
		},
		addAreaLayer: function(feature, layer) {
			var areaLayer = this.buildAreaLayer(feature, layer);
			this.areaLayers.push(areaLayer);
		}
	};

	hdv.data = data;
})(hdv, _, jQuery);

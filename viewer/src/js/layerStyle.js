(function(hdv) {
	'use strict';
	var layerStyle = {
		colorSchemes: {
			red: ["#FFF5F0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
			green: ["#F7FCF5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"]
		},
		/**
		 * @param value
		 *            value of the layer
		 * @param log10Boundary
		 *            boundary array [max / min]
		 * @param hasNegativeMeaning
		 */
		forValue: function(value, log10Boundary, hasNegativeMeaning, isInexsistent) {
			var result = {
				'fillOpacity': isInexsistent ? 0 : 0.65,
				'fillColor': this.getFillColor(value, log10Boundary, hasNegativeMeaning, isInexsistent)
			};
			return result;
		},
		getFillColor: function(value, log10Boundary, hasNegativeMeaning, isInexsistent) {
			if (isInexsistent) {
				return '#000';
			}

			var colorScheme = (value < 0 || hasNegativeMeaning) ? this.colorSchemes.red : this.colorSchemes.green;
			var factor = this.getComparisonFactor(value, log10Boundary);
			var colorIndex = Math.max(0, Math.round((colorScheme.length - 1) * factor));
			return colorScheme[colorIndex];
		},
		getComparisonFactor: function(value, log10Boundary) {
			if (log10Boundary[0] === log10Boundary[1]) {
				return 1;
			}
			return Math.round((hdv.calc.safeLog10(value) - log10Boundary[1]) / (log10Boundary[0] - log10Boundary[1]) * 100) / 100;
		}
	};

	hdv.layerStyle = layerStyle;
})(hdv);

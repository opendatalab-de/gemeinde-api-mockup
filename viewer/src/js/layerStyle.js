(function(hdv) {
	'use strict';
	var layerStyle = {
		colorSchemes: {
			blue: ["#DEEBF7", "#C6DBEF", "#9ECAE1", "#6BAED6", "#4292C6", "#2171B5", "#08519C", "#08306B"],
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

			var colorScheme = this.colorSchemes.blue;
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

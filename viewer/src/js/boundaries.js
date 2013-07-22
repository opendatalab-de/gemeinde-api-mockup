(function(ga, $, _) {
	'use strict';
	var boundaries = {
		findAccordingTo: function(settings) {
			var boundaries = [0, Number.MAX_VALUE];
			_.each(ga.data.areaLayers, function(areaLayer) {
				var value = ga.areaValue.comparisonValueOf(areaLayer);
				boundaries[0] = Math.max(boundaries[0], value);
				if (value > 0) {
					boundaries[1] = Math.min(boundaries[1], value);
				}
			});
			if (boundaries[1] === Number.MAX_VALUE) {
				boundaries[1] = 0;
			}
			return boundaries;
		},
		toLog10: function(boundaries) {
			var log10Boundaries = [];
			_.each(boundaries, _.bind(function(boundaryValue) {
				log10Boundaries.push(ga.calc.safeLog10(boundaryValue));
			}, this));
			return log10Boundaries;
		}
	};

	ga.boundaries = boundaries;
})(ga, jQuery, _);
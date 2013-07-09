(function(hdv, _) {
	'use strict';
	hdv.array = {
		remove: function(array, valueToReject) {
			var indexToReject = _.indexOf(array, valueToReject);
			array.splice(indexToReject, 1);
		}
	};

	hdv.serialize = {
		toLiteral: function(array) {
			var literal = {};
			_.each(array, function(element) {
				literal[element.name] = element.value;
			});
			return literal;
		}
	};

	hdv.formatter = {
		number: function(n) {
			var sign = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(2), 10) + "", j = (j = i.length) > 3 ? j % 3 : 0;
			var result = sign + (j ? i.substr(0, j) + '.' : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + '.')
					+ (2 ? ',' + Math.abs(n - i).toFixed(2).slice(2) : "");
			return result.replace(/,00/g, '');
		}
	};

	hdv.calc = {
		safeLog10: function(number) {
			return number === 0 ? 0 : Math.log(Math.abs(number)) / Math.LN10;
		}
	};
})(hdv, _);
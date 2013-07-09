(function(hdv, $, _) {
	'use strict';
	var productSelectList = {
		init: function() {
			$(hdv).on('loaded.metadata', _.bind(this.reset, this));
		},
		reset: function() {
			var selectList = $('select[name="product"]');
			selectList.html(this.generateHtml(hdv.data.meta.tree, hdv.data.meta.products));
			selectList.val(hdv.settings.product);
		},
		getLabel: function(productKey, products) {
			return _.find(products, function(product) {
				return product.key == productKey;
			}).label;
		},
		generateHtml: function(tree, products) {
			var html = '';
			_.each(_.keys(tree), _.bind(function(groupKey) {
				html += '<optgroup label="' + this.getLabel(groupKey, products) + '">';
				html += this.generateOptions(tree[groupKey], products);
				html += '</optgroup>';
			}, this));
			return html;
		},
		generateOptions: function(keys, products) {
			var html = '';
			_.each(keys, _.bind(function(key) {
				html += '<option value="' + key + '">' + this.getLabel(key, products) + '</option>';
			}, this));
			return html;
		}
	};

	var accountSelectList = {
		status: {},
		init: function() {
			$(hdv).on('loader.finished', _.bind(this.update, this));
		},
		update: function() {
			if (this.status.product != hdv.settings.product || this.status.areaType != hdv.settings.areaType || this.status.year != hdv.settings.year) {
				this.reset();
			} else {
				$(hdv).triggerHandler('accountSelectList.finished');
			}
		},
		reset: function() {
			var selectList = $('select[name="account"]');
			var accountKeys = this.getAccountsWithValues(hdv.data.values.areas);
			if (_.indexOf(accountKeys, hdv.settings.account) < 0) {
				hdv.settingsService.resetAccount();
			}
			selectList.html(this.generateHtml(accountKeys, hdv.data.meta.incomeAccounts, hdv.data.meta.spendingsAccounts));
			selectList.val(hdv.settings.account);

			this.status = {
				product: hdv.settings.product,
				areaType: hdv.settings.areaType,
				year: hdv.settings.year
			};
			$(hdv).triggerHandler('accountSelectList.finished');
		},
		getAccountsWithValues: function(areas) {
			var accounts = ['6', '7'];
			_.each(_.values(areas), function(areaAccounts) {
				accounts = accounts.concat(_.keys(areaAccounts));
			});
			return _.uniq(accounts);
		},
		generateHtml: function(accountKeys, incomeAccounts, spendingsAccounts) {
			var html = '';
			html += this.generateOptGroup(accountKeys, incomeAccounts, 'Einnahmen');
			html += this.generateOptGroup(accountKeys, spendingsAccounts, 'Ausgaben');
			return html;
		},
		generateOptGroup: function(accountKeys, accounts, groupLabel) {
			var html = '<optgroup label="' + groupLabel + '">';
			_.each(accounts, function(account) {
				if (_.indexOf(accountKeys, account.key.toString()) >= 0) {
					html += '<option value="' + account.key + '">' + account.label + '</option>';
				}
			});
			html += '</optgroup>';
			return html;
		}
	};

	var accounts = {
		isSpending: function(account) {
			return this._isSpending(account, hdv.data.meta.incomeAccounts, hdv.data.meta.spendingsAccounts);
		},
		_isSpending: function(accountKey, incomeAccounts, spendingsAccounts) {
			var incomeAccount = _.find(incomeAccounts, function(account) {
				return account.key == accountKey;
			});
			return incomeAccount ? false : true;
		}
	};

	/**
	 * Je Produktgruppe (Account) sind 6 Grenzwerte unter dem Attribut "data"
	 * vorhanden. Diese Grenzwerte unterteilen sich in 3 Gruppen, die das
	 * Attribut "relation" (Im Verhältnis zu?) abdecken: absolut / Einwohnerzahl /
	 * Fläche (in dieser Reihenfolge).<br />
	 * Jede Gruppe besteht aus 2 Werten: max und min<br />
	 * Max und Min steht immer für den maximalen bzw. minimalen Wert, den es für
	 * diese Produktgruppe über alle Areas (Gemeinden / Landkreise) hinweg gibt.
	 */
	var accountBoundaries = {
		findAccordingTo: function(settings) {
			var allBoundaries = hdv.data.values.minmax[hdv.settings.account];
			var relevantBoundaries = this.findRelevant(allBoundaries, hdv.settings.relation);
			return relevantBoundaries;
		},
		findRelevant: function(allBoundaries, relation) {
			if (allBoundaries === undefined) {
				return [0, 0];
			}

			var startPos = 0;
			var length = 2;
			if (relation !== 'none') {
				startPos = relation === 'population' ? 2 : 4;
			}

			var boundaries = [];
			for ( var i = startPos; i < startPos + length; i++) {
				boundaries.push(allBoundaries[i]);
			}
			return boundaries;
		},
		toLog10: function(boundaries) {
			var log10Boundaries = [];
			_.each(boundaries, _.bind(function(boundaryValue) {
				log10Boundaries.push(hdv.calc.safeLog10(boundaryValue));
			}, this));
			return log10Boundaries;
		}
	};

	hdv.productSelectList = productSelectList;
	hdv.productSelectList.init();

	hdv.accountSelectList = accountSelectList;
	hdv.accountSelectList.init();

	hdv.accounts = accounts;
	hdv.accountBoundaries = accountBoundaries;
})(hdv, jQuery, _);
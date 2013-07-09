(function(hdv, L, $, _) {
	'use strict';
	var SettingsControl = L.Control.extend({
		options: {
			position: 'topleft'
		},
		onAdd: function(map) {
			var container = L.DomUtil.create('div', 'leaflet-control-settings leaflet-bar');

			this.toggleSettingsButton = this._createButton("*", "Einstellungen", 'leaflet-control-toggle-settings leaflet-bar-part leaflet-bar-part-top',
					container, this.onToggleSettingsClick, this);
			this._bindToggleButton(this.toggleSettingsButton, this.toggleNav);

			this.toggleInfoButton = this._createButton("i", "Information", 'leaflet-control-info leaflet-bar-part leaflet-bar-part-bottom', container);
			this._bindToggleButton(this.toggleInfoButton, this.toggleInfo);

			return container;
		},
		_createButton: function(html, title, className, container, fn, context) {
			var link = L.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;

			return link;
		},
		_bindToggleButton: function(button, fn) {
			var stop = L.DomEvent.stopPropagation;
			L.DomEvent.on(button, 'click', stop);
			L.DomEvent.on(button, 'mousedown', stop);
			L.DomEvent.on(button, 'dblclick', stop);
			L.DomEvent.on(button, 'click', L.DomEvent.preventDefault);
			L.DomEvent.on(button, 'click', function(e) {
				fn.call(this);
			}, this);
		},
		toggleNav: function() {
			$('#nav').toggleClass('hide');
			$(this.toggleSettingsButton).toggleClass('leaflet-control-active');
		},
		toggleInfo: function() {
			$('#info').modal('toggle');
		}
	});

	var loader = {
		loadStatus: {},
		init: function() {
			$(hdv).on('loaded.areaLayers loaded.data loaded.metadata', _.bind(this.done, this));
			$(hdv).on('settingsUpdate', _.bind(this.update, this));
		},
		update: function() {
			if (!this.allLoaded()) {
				this.loadAreaLayers(hdv.settings.areaType);
				this.loadValues(this.getValueFile(hdv.settings.areaType, hdv.settings.year, hdv.settings.product));
				this.loadMetadata(this.getMetadataFile(hdv.settings.areaType, hdv.settings.year));
			} else {
				this.done();
			}
		},
		done: function() {
			if (this.allLoaded()) {
				$('.ajax-loader').hide();
				$(hdv).triggerHandler('loader.finished');
			}
		},
		allLoaded: function() {
			return this.areaLayersLoaded(hdv.settings.areaType)
					&& this.valuesLoaded(this.getValueFile(hdv.settings.areaType, hdv.settings.year, hdv.settings.product))
					&& this.metadataLoaded(this.getMetadataFile(hdv.settings.areaType, hdv.settings.year));
		},
		areaLayersLoaded: function(areaType) {
			return this.loadStatus.areaType === areaType;
		},
		loadAreaLayers: function(areaType) {
			if (!this.areaLayersLoaded(areaType)) {
				$('.ajax-loader').show();

				$.getJSON('data/' + areaType + '.geojson', _.bind(function(data) {
					hdv.map.removeLayers(hdv.data.areaLayers);
					hdv.data.areaLayers = [];

					hdv.map.addAreaLayers(data, _.bind(hdv.data.addAreaLayer, hdv.data));

					this.loadStatus.areaType = areaType;
					$(hdv).triggerHandler('loaded.areaLayers');
				}, this));
			}
		},
		getValueFile: function(areaType, year, product) {
			return year + '/' + areaType + '/' + product + '.json';
		},
		valuesLoaded: function(valueFile) {
			return this.loadStatus.values === valueFile;
		},
		loadValues: function(valueFile) {
			if (!this.valuesLoaded(valueFile)) {
				$('.ajax-loader').show();

				$.getJSON('data/' + valueFile, _.bind(function(data) {
					hdv.data.values = data;
					this.loadStatus.values = valueFile;
					$(hdv).triggerHandler('loaded.data');
				}, this));
			}
		},
		getMetadataFile: function(areaType, year) {
			return year + '/' + areaType + '/metadata.json';
		},
		metadataLoaded: function(metadataFile) {
			return this.loadStatus.metadata === metadataFile;
		},
		loadMetadata: function(metadataFile) {
			if (!this.metadataLoaded(metadataFile)) {
				$('.ajax-loader').show();

				$.getJSON('data/' + metadataFile, _.bind(function(data) {
					hdv.data.meta = data;
					this.loadStatus.metadata = metadataFile;
					$(hdv).triggerHandler('loaded.metadata');
				}, this));
			}
		}
	};

	var map = {
		leafletMap: null,
		templates: {},
		init: function() {
			this.leafletMap = L.map('map', {
				center: [hdv.defaults.lat, hdv.defaults.lon],
				zoom: hdv.defaults.zoom,
				minZoom: 8,
				maxZoom: 11,
				attributionControl: false
			});

			this.setupForm(hdv.defaults);
			this.addTileLayer();
			this.addAttributionControl();
			this.setupModals();
			this.addSettingsControl();
			this.setupTemplates();
		},
		setupForm: function(defaults) {
			$('.settings input[name="relation"]').filter('[value="' + hdv.defaults.relation + '"]').prop('checked', true);
			$('.settings input[name="areaType"]').filter('[value="' + hdv.defaults.areaType + '"]').prop('checked', true);
		},
		setupTemplates: function() {
			this.templates.popup = Handlebars.compile($('#popup-template').html());
		},
		addTileLayer: function() {
			L.tileLayer('http://{s}.tile.cloudmade.com/036a729cf53d4388a8ec345e1543ef53/44094/256/{z}/{x}/{y}.png', {
				'maxZoom': 18
			}).addTo(this.leafletMap);
		},
		addAttributionControl: function() {
			var attribution = '<a class="permalink">Permalink</a> &nbsp;&nbsp; <a class="datasources">Datenquellen</a> &nbsp;&nbsp; <a class="imprint">Impressum</a>';
			L.control.attribution().setPrefix(null).addAttribution(attribution).addTo(this.leafletMap);

			$('.imprint').on('click', function() {
				$('#imprint').modal('toggle');
			});
			$('.datasources').on('click', function() {
				$('#datasources').modal('toggle');
			});
			$('.permalink').on('click', _.bind(function() {
				this.showPermalink();
			}, this));
		},
		showPermalink: function() {
			var permalink = this.buildPermalink();
			prompt('Bitte kopieren Sie folgende URL:', permalink);
		},
		buildPermalink: function() {
			var baseUrl = window.location.href;
			if (baseUrl.indexOf('?') > 0) {
				baseUrl = baseUrl.substr(0, baseUrl.indexOf('?'));
			}
			return baseUrl + '?' + $.param($('.settings').serializeArray());
		},
		setupModals: function() {
			var modals = ['info', 'imprint', 'datasources'];
			_.each(modals, function(modalId) {
				$('#' + modalId).modal({
					'show': false
				});
			});
		},
		addSettingsControl: function() {
			this.settingsControl = new SettingsControl().addTo(this.leafletMap);
			if ($(window).width() > 979) {
				this.settingsControl.toggleNav();
			}

			$('.close-nav').on('click', _.bind(function() {
				this.settingsControl.toggleNav();
			}, this));
		},
		removeLayers: function(areaLayers) {
			_.each(areaLayers, _.bind(function(areaLayer) {
				this.leafletMap.removeLayer(areaLayer.value);
			}, this));
		},
		addAreaLayers: function(geojson, callback) {
			L.geoJson(geojson.features, {
				style: {
					'opacity': 0.5,
					'weight': 1
				},
				onEachFeature: callback
			}).addTo(this.leafletMap);
		}
	};

	hdv.map = map;
	hdv.loader = loader;
})(hdv, L, jQuery, _);
(function(ga, L, $, _) {
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
			$(ga).on('loaded.data', _.bind(this.done, this));
			$(ga).on('settingsUpdate', _.bind(this.update, this));
		},
		update: function() {
			if (!this.allLoaded()) {
				this.loadData();
			} else {
				this.done();
			}
		},
		done: function() {
			if (this.allLoaded()) {
				$('.ajax-loader').hide();
				$(ga).triggerHandler('loader.finished');
			}
		},
		allLoaded: function() {
			return this.dataLoaded();
		},
		dataLoaded: function() {
			return this.loadStatus.data === true;
		},
		loadData: function() {
			if (!this.dataLoaded()) {
				$('.ajax-loader').show();

				$.getJSON('data/heilbronn-rs.geojson', _.bind(function(data) {
					ga.map.removeLayers(ga.data.areaLayers);
					ga.data.areaLayers = [];
					ga.map.addAreaLayers(data, _.bind(ga.data.addAreaLayer, ga.data));

					this.loadStatus.data = true;
					$(ga).triggerHandler('loaded.data');
				}, this));
			}
		}
	};

	var map = {
		leafletMap: null,
		templates: {},
		init: function() {
			this.leafletMap = L.map('map', {
				center: [ga.defaults.lat, ga.defaults.lon],
				zoom: ga.defaults.zoom,
				minZoom: 10,
				maxZoom: 12,
				attributionControl: false
			});

			this.setupForm(ga.defaults);
			this.addTileLayer();
			this.addAttributionControl();
			this.setupModals();
			this.addSettingsControl();
			this.setupTemplates();
		},
		setupForm: function(defaults) {
			$('.settings select[name="valueType"]').val(defaults.valueType);
			$('.settings select[name="relation"]').val(defaults.relation);
		},
		setupTemplates: function() {
			this.templates.popup = Handlebars.compile($('#popup-template').html());
		},
		addTileLayer: function() {
			L.tileLayer('https://{s}.tiles.mapbox.com/v3/codeforheilbronn.i4ff7n72/{z}/{x}/{y}.png', {
				'maxZoom': 18
			}).addTo(this.leafletMap);
		},
		addAttributionControl: function() {
			var attribution = '<a class="datasources">Datenquellen</a> &nbsp;&nbsp; <a class="imprint">Impressum</a> | <a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>';
			L.control.attribution().setPrefix(null).addAttribution(attribution).addTo(this.leafletMap);

			$('.imprint').on('click', function() {
				$('#imprint').modal('toggle');
			});
			$('.datasources').on('click', function() {
				$('#datasources').modal('toggle');
			});
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
			if ($(window).width() > 767) {
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

	ga.map = map;
	ga.loader = loader;
})(ga, L, jQuery, _);
(function(ga, $, _) {
	'use strict';

	var def = [{
		property: "Einwohner",
		label: "Einwohnerzahl"
	}, {
		property: "qkm",
		unit: "km²",
		converter: "qmToqkm",
		label: "Fläche"
	}, {
		group: "Gewerbesteuer",
		properties: [{
			property: "gewerbesteuerIstaufkommen",
			unit: "€",
			converter: "x1000",
			label: "Gewerbesteuer Ist-Aufkommen"
		}, {
			property: "gewerbesteuerGrundbetrag",
			unit: "€",
			converter: "x1000",
			label: "Gewerbesteuer Grundbetrag"
		}, {
			property: "gewerbesteuerumlage",
			unit: "€",
			converter: "x1000",
			label: "Gewerbesteuerumlage"
		}, {
			property: "gewerbesteuereinnahmen",
			unit: "€",
			converter: "x1000",
			label: "Gewerbesteuereinnahmen (Aufkommen abzgl. Umlage)"
		}, {
			property: "gewerbesteuerHebesatz",
			unit: "%",
			label: "Gewerbesteuer Hebesatz"
		}]
	}, {
		group: "Grundsteuer A (agrarisch - Grundstücke der Landwirtschaft)",
		properties: [{
			property: "grundsteuerAIstaufkommen",
			unit: "€",
			converter: "x1000",
			label: "Grundsteuer A Ist-Aufkommen"
		}, {
			property: "grundsteuerAGrundbetrag",
			unit: "€",
			converter: "x1000",
			label: "Grundsteuer A Grundbetrag"
		}, {
			property: "grundsteuerAHebesatz",
			unit: "%",
			label: "Grundsteuer A Hebesatz"
		}]
	}, {
		group: "Grundsteuer B (baulich - bebaute oder bebaubare Grundstücke und Gebäude)",
		properties: [{
			property: "grundsteuerBIstaufkommen",
			unit: "€",
			converter: "x1000",
			label: "Grundsteuer B Ist-Aufkommen"
		}, {
			property: "grundsteuerBGrundbetrag",
			unit: "€",
			converter: "x1000",
			label: "Grundsteuer B Grundbetrag"
		}, {
			property: "grundsteuerBHebesatz",
			unit: "%",
			label: "Grundsteuer B Hebesatz"
		}]
	}, {
		group: "Umsatzsteuer",
		properties: [{
			property: "gemeindeanteilAnDerUmsatzsteuer",
			unit: "€",
			label: "Gemeindeanteil an der Umsatzsteuer"
		}]
	}, {
		group: "Wohngebäude",
		properties: [{
			property: "WohngebäudeInsgesamt",
			label: "Anzahl Wohngebäude"
		}, {
			property: "Wohngebäude1Wohnung",
			label: "Anzahl Einfamilienhäuser (1 Wohnung im Gebäude)"
		}, {
			property: "Wohngebäude2Wohnungen",
			label: "Anzahl Zweifamilienhäuser (2 Wohnungen im Gebäude)"
		}, {
			property: "WohnflächeinWohngebäuden",
			unit: "m²",
			converter: "x1000",
			label: "Wohnfläche (in Wohngebäuden) insgesamt"
		}]
	}, {
		group: "Wohnungen",
		properties: [{
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Insgesamt",
			label: "Anzahl Wohnungen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit1Raum",
			label: "Anzahl Wohnungen mit 1 Raum"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit2Räumen",
			label: "Anzahl Wohnungen mit 2 Räumen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit3Räumen",
			label: "Anzahl Wohnungen mit 3 Räumen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit4Räumen",
			label: "Anzahl Wohnungen mit 4 Räumen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit5Räumen",
			label: "Anzahl Wohnungen mit 5 Räumen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit6Räumen",
			label: "Anzahl Wohnungen mit 6 Räumen"
		}, {
			property: "WohnungeninWohnundNichtwohngebäuden_Größe_Wohnungenmit7Räumenodermehr",
			label: "Anzahl Wohnungen mit 7 oder mehr Räumen"
		}, {
			property: "RäumeinWohnungenmit7odermehrRäumen",
			label: "Räume in Wohnungen mit 7 oder mehr Räumen"
		}]
	}, {
		group: "Verarbeitendes Gewerbe (Handwerk)",
		properties: [{
			property: "HandwerkBetriebe",
			label: "Betriebe"
		}, {
			property: "HandwerkBeschäftigte",
			label: "Beschäftigte"
		}, {
			property: "HandwerkBruttoentgelte",
			unit: "€",
			converter: "x1000",
			label: "Bruttoentgelte"
		}]
	}, {
		group: "Straßenverkehrsunfälle",
		properties: [{
			property: "Unfälle (insgesamt)",
			label: "Unfälle (insgesamt)"
		}, {
			property: "Unfälle mit Personenschaden",
			label: "Unfälle mit Personenschaden"
		}, {
			property: "Schwerwiegende Unfälle mit Sachschaden i. e. S.",
			label: "Schwerwiegende Unfälle mit Sachschaden im engeren Sinne"
		}, {
			property: "Sons.Sachschadensunf.unter d.Einfl.berausch.Mittel",
			label: "Sonstige Sachschadensunfälle unter Einfluss berauschender Mittel"
		}, {
			property: "Getötete Personen",
			label: "Getötete Personen"
		}, {
			property: "Verletzte Personen",
			label: "Verletzte Personen"
		}]
	}, {
		group: "Bodenfläche",
		properties: [{
			property: "Bodenfläche",
			unit: "km²",
			converter: "haToqkm",
			label: "Bodenfläche (insgesamt)"
		}, {
			property: "Siedlungs- und Verkehrsfläche",
			unit: "km²",
			converter: "haToqkm",
			label: "Siedlungs und Verkehrsfläche"
		}, {
			property: "Gebäude- und Freifläche Insgesamt",
			unit: "km²",
			converter: "haToqkm",
			label: "Gebäude und Freifläche (insgesamt)"
		}, {
			property: "Gebäude- und Freifläche Wohnen",
			unit: "km²",
			converter: "haToqkm",
			label: "Gebäude und Freifläche: Wohnen"
		}, {
			property: "Gebäude- und Freifläche Gewerbe, Industrie",
			unit: "km²",
			converter: "haToqkm",
			label: "Gebäude und Freifläche: Gewerbe, Industrie"
		}, {
			property: "Betriebsfläche (ohne Abbauland)",
			unit: "km²",
			converter: "haToqkm",
			label: "Betriebsfläche (ohne Abbauland)"
		}, {
			property: "Erholungsfläche Insgesamt",
			unit: "km²",
			converter: "haToqkm",
			label: "Erholungfläche (insgesamt)"
		}, {
			property: "Erholungsfläche Grünanlage",
			unit: "km²",
			converter: "haToqkm",
			label: "Erholungfläche: Grünanlagen"
		}, {
			property: "Friedhofsfläche",
			unit: "km²",
			converter: "haToqkm",
			label: "Friedhofsfläche"
		}, {
			property: "Verkehrsfläche Insgesamt",
			unit: "km²",
			converter: "haToqkm",
			label: "Verkehrsfläche (insgesamt)"
		}, {
			property: "Verkehrsfläche Straße, Weg, Platz",
			unit: "km²",
			converter: "haToqkm",
			label: "Verkehrsfläche (Straße, Weg, Platz)"
		}, {
			property: "Landwirtschaftsfläche Insgesamt",
			unit: "km²",
			converter: "haToqkm",
			label: "Landwirtschaftsfläche (insgesamt)"
		}, {
			property: "Landwirtschaftsfläche Moor",
			unit: "km²",
			converter: "haToqkm",
			label: "Landwirtschaftsfläche: Moor"
		}, {
			property: "Landwirtschaftsfläche Heide",
			unit: "km²",
			converter: "haToqkm",
			label: "Landwirtschaftsfläche: Heide"
		}, {
			property: "Waldfläche",
			unit: "km²",
			converter: "haToqkm",
			label: "Waldfläche"
		}, {
			property: "Wasserfläche",
			unit: "km²",
			converter: "haToqkm",
			label: "Wasserfläche"
		}, {
			property: "Abbauland",
			unit: "km²",
			converter: "haToqkm",
			label: "Abbauland"
		}, {
			property: "Flächen anderer Nutzung Insgesamt",
			unit: "km²",
			converter: "haToqkm",
			label: "Flächen anderer Nutzung (insgesamt)"
		}, {
			property: "Flächen anderer Nutzung Unland",
			unit: "km²",
			converter: "haToqkm",
			label: "Flächen anderer Nutzung: Unland"
		}]
	}, {
		group: "Tourismus",
		properties: [{
			property: "Geöffnete Beherbergungsbetriebe",
			label: "Geöffnete Beherbergungsbetriebe"
		}, {
			property: "Angebotene Gästebetten",
			label: "Gästebetten"
		}, {
			property: "Gästeübernachtungen",
			label: "Gästeübernachtungen"
		}, {
			property: "Gästeankünfte",
			label: "Gästeankünfte"
		}]
	}, {
		group: "Trinkwasser",
		properties: [{
			property: "TrinkwasserVerbrauchsabhängiges Entgelt pro cbm",
			unit: "€",
			label: "Entgelt je cbm"
		}, {
			property: "TrinkwasserHaushaltsäbliches verbrauchsunabh. Entgelt p. Jahr",
			unit: "€",
			label: "haushaltsübliches Entgelt pro Jahr"
		}]
	}, {
		group: "Arbeitsmarkt",
		properties: [{
			property: "ArbeitsmarktAnzahl",
			label: "Arbeitslose"
		}, {
			property: "ArbeitsmarktAusländer",
			label: "Arbeitslose: Ausländer"
		}, {
			property: "Arbeitsmarktschwerbehindert",
			label: "Arbeitslose: schwerbehindert"
		}, {
			property: "Arbeitsmarkt15 bis unter 20 Jahre",
			label: "Arbeitslose: 15 bis unter 20 Jahre"
		}, {
			property: "Arbeitsmarkt15 bis unter 25 Jahre",
			label: "Arbeitslose: 15 bis unter 25 Jahre"
		}, {
			property: "Arbeitsmarkt55 bis unter 65 Jahre",
			label: "Arbeitslose: 55 bis unter 65 Jahre"
		}, {
			property: "Arbeitsmarktlangzeitarbeitslos",
			label: "Langzeitarbeitslose"
		}]
	}];

	var selectList = {
		generate: function() {
			var html = '';
			_.each(def, _.bind(function(entry) {
				if (entry.group) {
					html += '<optgroup label="' + entry.group + '">';
					_.each(entry.properties, _.bind(function(property) {
						html += this.generateOption(property);
					}, this));
					html += '</optgroup>';
				} else {
					html += this.generateOption(entry);
				}
			}, this));

			$('select[name="valueType"]').html(html);

			html = '<option value="" data-unit="-">- (nichts)</option>' + html;
			$('select[name="relation"]').html(html);
		},
		generateOption: function(entry) {
			if (!entry.unit) {
				entry.unit = "";
			}
			if (!entry.converter) {
				entry.converter = "";
			}
			return '<option value="' + entry.property + '" data-unit="' + entry.unit + '" data-converter="' + entry.converter + '">' + entry.label
					+ '</option>';
		}
	};

	ga.selectList = selectList;
})(ga, jQuery, _);
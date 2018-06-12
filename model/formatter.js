sap.ui.define([], function() {
	"use strict";
	return {
		translate: function(key) {
			var i18nModel = this.getView().getModel("i18n");
			var translation = i18nModel.getProperty(key);
			//check if translation starts with a Capital Letter ~ keys don´t, Values do
			//if (/^[A-Z]/.test(translation)) {
				return translation;
			//} else {
				//key is not in i18n Model
				//console.log(key + " is not in i18n yet!");
				//return "XXXXXXXXXXXXX";
			//}
		},
		/*chartPercentage: function(currentValue, valueGroup) {
			//returns the percentage for the microChart based on its decisionIndication value
			//formatter is called multiple times when saved values are loaded, it should only be executed when all parameters are filled
			if (currentValue !== null && valueGroup !== null) {
				//evade division by 0 
				var share = (currentValue + 0.00001) / (valueGroup[0] + valueGroup[1] + valueGroup[2] + 0.00003);
				
				share = share * 100;
				return share;
				
				// in percent
				return Math.round(share * 100);
			} else {
				return 0;
			}
		},*/
		formatIcon1: function(currentSelection, selectionOptions) {
			var resultInfluence = selectionOptions.filter(function(obj) {
				if (obj.key === currentSelection) {
					return true;
				} else {
					return false;
				}
			})[0].resultInfluence;
			//turn String Array into Int Arrays
			resultInfluence = resultInfluence.map(Number);
			var myInfluence = resultInfluence[0];
			//the higher the bluer
			if (myInfluence === Math.max.apply(null, resultInfluence)) {
				return "blue";
			} else if (myInfluence === Math.min.apply(null, resultInfluence)) {
				return "#5998ff";
			} else {
				return "#d1e2ff";
			}
		},
		formatIcon2: function(currentSelection, selectionOptions) {
			var resultInfluence = selectionOptions.filter(function(obj) {
				if (obj.key === currentSelection) {
					return true;
				} else {
					return false;
				}
			})[0].resultInfluence;
			//turn String Array into Int Arrays
			resultInfluence = resultInfluence.map(Number);
			var myInfluence = resultInfluence[1];
			//the higher the bluer
			if (myInfluence === Math.max.apply(null, resultInfluence)) {
				return "blue";
			} else if (myInfluence === Math.min.apply(null, resultInfluence)) {
				return "#5998ff";
			} else {
				return "#d1e2ff";
			}
		},
		formatIcon3: function(currentSelection, selectionOptions) {
			var resultInfluence = selectionOptions.filter(function(obj) {
				if (obj.key === currentSelection) {
					return true;
				} else {
					return false;
				}
			})[0].resultInfluence;
			//turn String Array into Int Arrays
			resultInfluence = resultInfluence.map(Number);
			var myInfluence = resultInfluence[2];
			//the higher the bluer
			if (myInfluence === Math.max.apply(null, resultInfluence)) {
				return "blue";
			} else if (myInfluence === Math.min.apply(null, resultInfluence)) {
				return "#5998ff";
			} else {
				return "#d1e2ff";
			}
		}
	};
});
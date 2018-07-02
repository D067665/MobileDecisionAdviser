sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	return Controller.extend("sap.ui.demo.nav.controller.BaseController", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		//Page Navigation function
		_onPageNavButtonPress: function(oEvent) {
	/*		var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
	*/			this.getRouter().navTo("landing", {}, true /*no history*/ );
	/*		}
	*/	},
		_onCloseIncludedEnhancementsDialog: function(){
			this._getIncludedEnhancementsDialog().close();
		},
		_getIncludedEnhancementsDialog: function(){
				if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("M3A.fragment.IncludedEnhancements", this);
			}
			return this.dialog;
		},
		_onFooterVersionButtonPress: function(){
			
				var oDialog = this._getIncludedEnhancementsDialog();
				oDialog.open();
			
		}
	});
});
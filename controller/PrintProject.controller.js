sap.ui.define([
	'sap/m/MessageBox',
	'sap/m/Dialog',
	'sap/m/MessageToast',
	'sap/m/Button',
	'sap/m/Text',
	"M3A/controller/BaseController",
	"M3A/model/formatter",
	"M3A/util/storage",
	"M3A/model/models",
	"sap/ui/core/Fragment"

], function(MessageBox, MessageToast, Dialog, Button, Text, BaseController, formatter, storage, models) {
	"use strict";
	return BaseController.extend("M3A.controller.PrintProject", {
		formatter: formatter,
		onInit: function() {
			var oRouter = this.getRouter();
		
			oRouter.getRoute("printProject").attachMatched(this.onRouteMatched, this);

		},
		onRouteMatched: function(oEvent) {
			var oArgs = oEvent.getParameter("arguments");

			this.getView().bindElement({
				path: "/" + oArgs.index,
				model: "savedProjects"
			});

		},

		onAfterRendering: function() {
		
		var that = this;
		
			setTimeout(function() {

				var element = this.getView().byId("printProjectPage").getDomRef().innerHTML;
				
				
				var opt = {
					margin: 0.5,
					filename: 'MobileTechnologyDecisionAdvisorDienstag.pdf',
					
					html2canvas: {
						scale: 2
					},
					jsPDF: {
						unit: 'in',
						format: 'letter',
						orientation: 'landscape'
						
					}
				};

				html2pdf().from(element).set(opt).save();
				
				
				
			

			}.bind(this), 300);
			that._navBackToOverview();
			
			
		
		
			

		},
		clicked: function(oEvent) {
  				this.getView().invalidate();
		},
		 _navBackToOverview: function(oEvent){
		 	
        	//var projectIndex = this.getView().getBindingContext("savedProjects").getPath().slice(1);
        
        	//this._loadSavedValues();
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	//this.getRouter().navTo("loadProject");
        	oRouter.navTo("loadProject");
        	
        /*	oRouter.navTo("createProject",{ 
        		index: path
        	});*/
		 }
        	

	});
});
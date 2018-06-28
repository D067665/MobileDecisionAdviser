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
		globalVariableIndex:0,
		onInit: function() {
			var oRouter = this.getRouter();
			debugger;
		
			oRouter.getRoute("printProject").attachMatched(this.onRouteMatched, this);
			/*this.getView("printProjectPage").addEventDelegate({
				"onAfterRendering": function(){
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRoter.navTo("loadProject");
					/*	oRouter.navTo("createProject", {
        		projectIndex: this.globalVariableIndex
                	});
				}
			},this);*/

		},
		onRouteMatched: function(oEvent) {
			debugger;
			var oArgs = oEvent.getParameter("arguments");

			this.getView().bindElement({
				path: "/" + oArgs.index,
				model: "savedProjects"
			});
			this.globalVariableIndex = oArgs.index;
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
				this._navBackToOverview();
				

			}.bind(this), 500);
			

		},

		/*onAfterRendering: function() {
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
			this._navBackToOverview();
			

		},*/
	/*clicked: function(oEvent) {
  				this.getView().invalidate();
		},*/
		 _navBackToOverview: function(oEvent){
		 	
        	//var projectIndex = this.getView().getBindingContext("savedProjects").getPath().slice(1);
        
        	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	//this.getRouter().navTo("loadProject");
        	//oRouter.navTo("loadProject");
        	
        	oRouter.navTo("createProject", {
        		projectIndex: this.globalVariableIndex
        	});
        	
       
		 }
        	

	});
});
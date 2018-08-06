sap.ui.define([
	'sap/m/MessageBox',
	'sap/m/Dialog',
	'sap/m/MessageToast',
	'sap/m/Button',
	'sap/m/Text',
	"M4A/controller/BaseController",
	"M4A/model/formatter",
	"M4A/util/storage",
	"M4A/model/models",
	"sap/ui/core/Fragment",
	"sap/ui/core/routing/History"

], function(MessageBox, MessageToast, Dialog, Button, Text, BaseController, formatter, storage, models, History) {
	"use strict";
	return BaseController.extend("M4A.controller.PrintProject", {
		formatter: formatter,
		globalVariableIndex: 0,
		globalSelectedIconTab: "0",
		onInit: function() {

			var oRouter = this.getRouter();

			oRouter.getRoute("printProject").attachMatched(this.onRouteMatched, this);

		},

		onRouteMatched: function(oEvent) {
			//getProject Index
			
			var oArgs = oEvent.getParameter("arguments");

			this.getView().bindElement({
				path: "/" + oArgs.index,
				model: "savedProjects"
			});

			this.globalVariableIndex = oArgs.index;
			this.globalSelectedIconTab = this.getView().getModel("savedProjects").getProperty("/" + this.globalVariableIndex +
				"/selectedIconTab");

			setTimeout(function() {

					

					//printPDF
					var element = this.getView().byId("printProjectPage").getDomRef().innerHTML;

					var opt = {
						margin: 0.5,
						filename: 'MobileTechnologyDecisionAdvisor.pdf',

						html2canvas: {
							scale: 2
						},
						jsPDF: {
							unit: 'in',
							format: 'letter',
							orientation: 'landscape'
						}
					};
					var worker = html2pdf().from(element).set(opt).save();

					//var oHistory = History.getInstance();

					//	window.history.go(-1);

					this._navBackToOverview(oEvent);
					//this._dialog.close(oEvent);

				}.bind(this),
				100);

		},

		_onDialogClosed: function() {
			this._navBackToOverview();
		},

		_navBackToOverview: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("createProject", {
				projectIndex: this.globalVariableIndex
			});
		}

	});
});
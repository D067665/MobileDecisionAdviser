sap.ui.define([
	"M4A/controller/BaseController",
	"M4A/model/models"
], function(BaseController,models) {
	"use strict";

	return BaseController.extend("M4A.controller.Landing", {
		_onNavToCreateProject: function(oEvent) {
			var that = this;
			var sUrl = jQuery.sap.getModulePath("M4A.model", "/newProject.json");
			$.ajax({
				type: "GET",
				url: sUrl,
				contentType: "application/json",
				dataType: "json",
				data: {},
				success: function(data) {
					var newProject = data;
					var savedProjectsModel = that.getView().getModel("savedProjects");
					var savedProjects = savedProjectsModel.getData();
					var newProjectIndex = savedProjects.push(newProject) - 1; //push returns new length
					that.getRouter().navTo("createProject", {
						"projectIndex": newProjectIndex
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(textStatus.toString());
				}
			});
			var button1 = sap.ui.getCore().byId("__xmlview3--audienceGroup");
			if(button1 !== null){
			button1.setSelectedButton("__xmlview3--businessToCustomer-button");
			}
		},
		_onNavToLoadProject: function(oEvent) {
			this.getRouter().navTo("loadProject");
		},
			_onDialogInstructionPress: function(oEvent) {
			
			var i18nModel = this.getView().getModel("i18n");
			var newText = "instruction";

			newText = i18nModel.getProperty(newText);
			this._getInstructionDialog().open();
			sap.ui.getCore().byId('inputInstruction').setText(newText);
		},
		_getInstructionDialog: function() {
			// create a fragment with dialog, and pass the selected data

			this.dialog = sap.ui.xmlfragment("M4A.fragment.Instruction", this);

			return this.dialog;
		},
		_onDialogIncludedEnhancementsPress: function(oEvent) {
			
			
			this._getIncludedEnhancementsDialog().open();

		},
		_getIncludedEnhancementsDialog: function() {

			this.dialog = sap.ui.xmlfragment("M4A.fragment.IncludedEnhancements", this);
			var i18nModel = this.getView().getModel("i18n");
			this.dialog.setModel(i18nModel, "i18n"); 

			return this.dialog;
		},

		_onCloseLandingDialog: function() {
			this.dialog.close();
			this._getInstructionDialog().destroy(true);
		}
	});
});
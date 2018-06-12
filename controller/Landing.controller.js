sap.ui.define([
	"M3A/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("M3A.controller.Landing", {
		_onNavToCreateProject: function(oEvent) {
			var that = this;
			var sUrl = jQuery.sap.getModulePath("M3A.model", "/newProject.json");
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
		_getInstructionDialog : function() {
            // create a fragment with dialog, and pass the selected data
            if (!this.dialog) {
                this.dialog = sap.ui.xmlfragment("M3A.fragment.Instruction", this);
            }
            return this.dialog;
        },
        _onCloseLandingDialog : function() {
                this._getInstructionDialog().close();
        }
	});
});
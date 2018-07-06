sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"M4A/model/models",
	"sap/ui/model/resource/ResourceModel"
], function(UIComponent, Device, models, ResourceModel) {
	"use strict";

	return UIComponent.extend("M4A.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// set i18n model
        	var i18nModel = new ResourceModel({
            bundleName : "M4A.i18n.i18n"
        	});
        	this.setModel(i18nModel, "i18n");
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// set the saved Projects model
			this.setModel(models.createSavedProjectsModel(), "savedProjects");
			//set the factor catalog model
			this.setModel(models.createFactorCatalogModel(), "factorCatalog");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// instantiate router
			this.getRouter().initialize();
		}
	});
});
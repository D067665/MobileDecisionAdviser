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
	return BaseController.extend("M3A.controller.CreateProject", {
		formatter: formatter,
		_oFactorCatalogModel: null,
		_oSavedProjectsModel: null,
		_oIconTabBar: null,
		onInit: function() {
			//initialize class variables
			var oRouter = this.getRouter();
			var oTableTechnologyFactors = this.getView().byId("tableClientTechnologyFactors");
			var oTableDataSync = this.getView().byId("tableClientDataSynchronization");
			var oTableOperationsCenter = this.getView().byId("tableClientOperationsCenter");
			// var oContent = document.getElementById("createProjectContent").innerHTML;
			/*	oContent.addEventDelegate({
					"onAfterRendering": this.$().removeClass('sapMPageEnableScrolling')
				});*/
			oTableTechnologyFactors.addEventDelegate({
				"onAfterRendering": this._onchangeBackgroundTechnologyFactors.bind(this)

			});
			oTableDataSync.addEventDelegate({
				"onAfterRendering": this._onchangeBackgroundDataSync.bind(this)
			});
			oTableOperationsCenter.addEventDelegate({
				"onAfterRendering": this._onchangeBackgroundOperationsCenter.bind(this)
			});

			oRouter.getRoute("createProject").attachMatched(this._onRouteMatched, this);
		},
		onAfterRendering: function() {

			var oContent = this.getView().byId("createProjectPage");
			oContent.removeStyleClass("sapMPageEnableScrolling");
		},
		_onNavBackPress: function(oEvent) {
			this._onPageNavButtonPress();
		},
		_onCloseDialog: function() {
			this._getDialog().close();
		},
		_revertChanges: function() {
			//load the Values that have been saved last
			this._getSavedProjectsModel().setData(models.createSavedProjectsModel());
			this._getFactorCatalogModel().setData(models.createFactorCatalogModel());
		},
		_onOverviewToClientTechnologyPress: function(oEvent) {
			var iconTabBar = this._getIconTabBar();
			iconTabBar.setSelectedKey("clientTechnology");
		},
		_onOverviewToDataSyncPress: function(oEvent) {
			var iconTabBar = this._getIconTabBar();
			iconTabBar.setSelectedKey("dataSync");
		},
		_onOverviewToOperationsCenterPress: function(oEvent) {
			var iconTabBar = this._getIconTabBar();
			iconTabBar.setSelectedKey("operationsCenter");
		},
		_onFooterBackButtonPress: function(oEvent) {
			var iconTabBar = this._getIconTabBar();
			var selectedKey = iconTabBar.getSelectedKey();
			var items = iconTabBar.getItems();
			var currentItem = items.filter(function(item) {
				if (item.getKey) {
					if (item.getKey() === selectedKey) {
						return true;
					}
				}
			})[0];

			iconTabBar.setSelectedKey(items[items.indexOf(currentItem) - 2].getKey());
		},
		_onFooterContinueButtonPress: function(oEvent) {
			var iconTabBar = this._getIconTabBar();
			var selectedKey = iconTabBar.getSelectedKey();
			var items = iconTabBar.getItems();
			var currentItem = items.filter(function(item) {
				if (item.getKey) {
					if (item.getKey() === selectedKey) {
						return true;
					}
				}
			})[0];

			iconTabBar.setSelectedKey(items[items.indexOf(currentItem) + 2].getKey());
		},
		_onPressNavPrint: function(oEvent) {

			var path = this.getView().getBindingContext("savedProjects").getPath().slice(1);

			//this._loadSavedValues();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var iconTabBar = this._getIconTabBar();
			var selectedTab = iconTabBar.getSelectedKey();

			oRouter.navTo("printProject", {
				index: path,
				selectedTab: selectedTab
			});
		/*var printFragment = sap.ui.xmlfragment("M3A.fragment.PrintPDF", this);
			printFragment.addEventDelegate({
				"onAfterRendering": function(oEvent) {
					debugger;
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
				}
			}, this);*/
		},
			
		 /*_onPressOpenPrintFragment: function(oEvent){
		 	var printFragment = sap.ui.xmlfragment("M3A.fragment.PrintPDF", this);
			printFragment.addEventDelegate({
				"onAfterRendering": function(oEvent) {
					setTimeout(function() {
					debugger;
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
				}
			}, this);
		 },*/
		_onchangeBackgroundTechnologyFactors: function() {
			//to change background color of select, even for the dependencies(not selected by user)
			this.getView().byId("tableClientTechnologyFactors").getItems().forEach(function(item) {
				item.getCells().forEach(function(cell) {

					if (cell.getId().indexOf("selectClientTechnology") > -1) {
						var sSelectedKey = cell.getSelectedKey();
						if (sSelectedKey !== "notSelected") {
							cell.addStyleClass("changeBackground");
						} else {
							cell.removeStyleClass("changeBackground");
						}
					}

				});
			});
		},
		_onchangeBackgroundDataSync: function() {
			this.getView().byId("tableClientDataSynchronization").getItems().forEach(function(item) {
				item.getCells().forEach(function(cell) {

					if (cell.getId().indexOf("selectDataSync") > -1) {
						var sSelectedKey = cell.getSelectedKey();
						if (sSelectedKey !== "notSelected") {
							cell.addStyleClass("changeBackground");
						} else {
							cell.removeStyleClass("changeBackground");
						}
					}

				});
			});
		},
		_onchangeBackgroundOperationsCenter: function() {
			this.getView().byId("tableClientOperationsCenter").getItems().forEach(function(item) {
				item.getCells().forEach(function(cell) {

					if (cell.getId().indexOf("selectOperationsCenter") > -1) {
						var sSelectedKey = cell.getSelectedKey();
						if (sSelectedKey !== "notSelected") {
							cell.addStyleClass("changeBackground");
						} else {
							cell.removeStyleClass("changeBackground");
						}
					}

				});
			});
		},
		_onPressChangeMode: function(oEvent) {
			//var itemBindingPath = oEvent.getSource().getBindingContext("factorCatalog").getPath();
			//var factorCatalogModel = this._getFactorCatalogModel();
			//var factorPath = itemBindingPath.split("/", 3);
			//var category = factorPath[1];
			var oSource = oEvent.getSource();
			var oIcon = oSource.getIcon();
			var sId = oSource.getId();
			//var oButton = this.getView().byId("changeModeButton");
			if (oIcon === "sap-icon://display") {
				oSource.setIcon("sap-icon://edit");

				if (sId.indexOf("changeModeButtonAI") > -1) {

					var aElements = document.getElementsByTagName("input");
					for (var i = 0; i < aElements.length; i++) {
						jQuery(aElements).control()[i].setEditable(false);

					}
					this.getView().byId("formAdditionalInformation");
					this.getView().byId("form2");
					this.getView().byId("audienceGroup").setEnabled(false);
					//if(this.getView().byId().indexOf("audienceGroup") > -1){

					//}
				} else if (sId.indexOf("changeModeButtonCT") > -1) {
					this.getView().byId("tableClientTechnologyFactors").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectClientTechnology") > -1) {
								cell.setEnabled(false);
							}
							if (cell.getId().indexOf("segmentedButtonClientTechnology") > -1) {
								cell.setEnabled(false);
							}
						});
					});

				} else if (sId.indexOf("changeModeButtonDS") > -1) {
					this.getView().byId("tableClientDataSynchronization").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectDataSync") > -1) {
								cell.setEnabled(false);
							}
							if (cell.getId().indexOf("segmentedButtonDataSync") > -1) {
								cell.setEnabled(false);
							}
						});
					});

				} else if (sId.indexOf("changeModeButtonOC") > -1) {

					this.getView().byId("tableClientOperationsCenter").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectOperationsCenter") > -1) {
								cell.setEnabled(false);
							}
							if (cell.getId().indexOf("segmentedButtonOperationsCenter") > -1) {
								cell.setEnabled(false);
							}
						});
					});
				}
			} else {
				oSource.setIcon("sap-icon://display");
				if (sId.indexOf("changeModeButtonAI") > -1) {

					var aElementsEdit = document.getElementsByTagName("input");
					for (var j = 0; j < aElementsEdit.length; j++) {
						jQuery(aElementsEdit).control()[j].setEditable();

					}
					this.getView().byId("formAdditionalInformation");
					this.getView().byId("form2");
					this.getView().byId("audienceGroup").setEnabled(true);
				} else if (sId.indexOf("changeModeButtonCT") > -1) {
					this.getView().byId("tableClientTechnologyFactors").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectClientTechnology") > -1) {
								cell.setEnabled(true);
							}
							if (cell.getId().indexOf("segmentedButtonClientTechnology") > -1) {
								cell.setEnabled(true);
							}
						});
					});

				} else if (sId.indexOf("changeModeButtonDS") > -1) {
					this.getView().byId("tableClientDataSynchronization").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectDataSync") > -1) {
								cell.setEnabled(true);
							}
							if (cell.getId().indexOf("segmentedButtonDataSync") > -1) {
								cell.setEnabled(true);
							}
						});
					});

				} else if (sId.indexOf("changeModeButtonOC") > -1) {

					this.getView().byId("tableClientOperationsCenter").getItems().forEach(function(item) {
						item.getCells().forEach(function(cell) {
							if (cell.getId().indexOf("selectOperationsCenter") > -1) {
								cell.setEnabled(true);
							}
							if (cell.getId().indexOf("segmentedButtonOperationsCenter") > -1) {
								cell.setEnabled(true);
							}
						});
					});
				}

			}

		},
		_onDataExportPDF: function(oEvent) {

			this._onPressNavPrint();
			var element = document.getElementById("printProjectPage");

			html2pdf(element);

		},

		_onFooterResetButtonPress: function(oEvent) {
			//define empty objects for savedProjects model
			var sApplicationNameSavedProject = "";
			var aAdditionalInformationSavedProject = {
				"useCase": "",
				"owner": "",
				"users": "",
				"userGeography": {
					"selectionOptions": ["regional", "local", "global"]
				},
				"language": {
					"selectionOptions": [""]
				},
				"devicePlatform": {
					"selectionOptions": ["iOS", "Android", "Windows", "Blackberry", "Unknown"]
				},
				"deviceFormFactor": {
					"selectionOptions": ["Smartphone", "Tablet", "Laptop"]
				},
				"plannedGoLive": "",
				"plannedEndOfLife": ""
			};
			var aClientTechnologySavedProject = {
				"appChangeFrequency": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"applicationLifetime": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"devicePlatform": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"extendCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"longTermBudget": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"lookAndFeelExpectation": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"maintenanceCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"mobileUsage": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"numberOfUsers": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"operationsCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"performanceExpectation": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"processComplexity": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"projectBudget": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"projectCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"security": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"technicalCapabilities": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"timeToMarket": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"useCaseImportance": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"userProcesses": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				}

			};
			var aDataSyncSavedProject = {
				"dataLifetime": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"dataOperations": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"dataStructure": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"dataTraffic": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"extendCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"localDataSearch": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"maintenanceCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"mobileUsage": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"numberOfUsers": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"offlineDataVolume": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"operationsCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"projectCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"security": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"useCaseImportance": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"userType": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				}
			};
			var aOperationsCenterSavedProject = {
				"appChangeFrequency": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"applicationLifetime": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"existingBackendSystems": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"existingMobileMiddleware": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"extendCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"maintenanceCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},

				"operationsCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"operationsTeam": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "internal",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"possibleExpenditure": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"projectCost": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},
				"systemAvailability": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				},

				"thirdPartyIntegration": {
					"importance": {
						"key": "medium",
						"weight": "2"
					},
					"selectionOptions": {
						"key": "notSelected",
						"resultInfluence": ["0", "0", "0"]
					}
				}

			};

			/*
			 *dialog fenster um sicherzugehen, dass reset gewünscht
			 *
			 */

			var sKey = this.getView().byId("idIconTabBar").getSelectedKey();
			var savedProjectsModel = this._getSavedProjectsModel();
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath(); //index

			var oDialog = new sap.m.Dialog("dialog", {
				title: this.getView().getModel("i18n").getResourceBundle().getText("warningDialogTitle"),
				type: 'Message',
				state: 'Warning',
				content: new Text({
					text: this.getView().getModel("i18n").getResourceBundle().getText("warningDialogText")
				}),

				beginButton: new Button({
					text: this.getView().getModel("i18n").getResourceBundle().getText("reset"),
					press: function() {

						if (sKey === "information") {
							var updateSavedprojects = savedProjectsModel.setProperty(viewBindingPath + "/additionalInformation",
								aAdditionalInformationSavedProject);
							savedProjectsModel.setProperty(viewBindingPath + "/applicationName", sApplicationNameSavedProject);

							/*var sUrl = jQuery.sap.getModulePath("M3A.model", "/newProject.json");
							$.ajax({
								type: "GET",
								url: sUrl,
								contentType: "application/json",
								dataType: "json",
								data: {},
								success: function(data) {

									var savedProjectsModel = this.getView().getModel("savedProjects");
									var sPath = this.getView().getBindingContext("savedProjects").getPath();
									data.selectedIconTab = "information";
									savedProjectsModel.setProperty(sPath, data);

								}.bind(this),
								error: function(jqXHR, textStatus, errorThrown) {
									alert(textStatus.toString());
								}
							});*/

						} else if (sKey === "clientTechnology") {

							//update savedProjectsModel
							savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology", aClientTechnologySavedProject);

							//Update Percentage(update recommendation not working)

							this._reloadSelection(viewBindingPath, sKey);

							this.getView().byId("tableClientTechnologyFactors").getItems().forEach(function(item) {
								item.getCells().forEach(function(cell) {
									if (cell.getId().indexOf("selectClientTechnology") > -1) {
										cell.removeStyleClass("changeBackground");
									}
								});
							});

						} else if (sKey === "dataSync") {

							savedProjectsModel.setProperty(viewBindingPath + "/dataSync", aDataSyncSavedProject);

							this._reloadSelection(viewBindingPath, sKey);

							this.getView().byId("tableClientDataSynchronization").getItems().forEach(function(item) {
								item.getCells().forEach(function(cell) {
									if (cell.getId().indexOf("selectDataSync") > -1) {
										cell.removeStyleClass("changeBackground");
									}
								});
							});

						} else if (sKey === "operationsCenter") {

							savedProjectsModel.setProperty(viewBindingPath + "/operationsCenter", aOperationsCenterSavedProject);

							this._reloadSelection(viewBindingPath, sKey);
							this.getView().byId("tableClientOperationsCenter").getItems().forEach(function(item) {
								item.getCells().forEach(function(cell) {
									if (cell.getId().indexOf("selectOperationsCenter") > -1) {
										cell.removeStyleClass("changeBackground");
									}
								});
							});
						}
						oDialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: this.getView().getModel("i18n").getResourceBundle().getText("cancel"),
					press: function() {
						oDialog.close();
					}
				}),

				afterClose: function() {
					oDialog.destroy();
				}
			});

			oDialog.open();
		},
		_onDialogButtonPress: function(oEvent) {
			var itemBindingPath = oEvent.getSource().getBindingContext("factorCatalog").getPath();
			var factorCatalogModel = this._getFactorCatalogModel();
			var factorPath = itemBindingPath.split("/", 3);
			var category = factorPath[1];
			var factorPos = factorPath[2];
			var categoryFactor = factorCatalogModel.getProperty("/" + category);
			var factorName = categoryFactor[factorPos].factor;
			var i18nModel = this.getView().getModel("i18n");
			var newText = "";

			if (factorName === "projectCost" || factorName === "operationsCost" || factorName === "maintenanceCost" || factorName ===
				"extendCost") {
				newText = factorName + "_" + category + "_info";
			} else {
				newText = factorName + "_info";
			}
			newText = i18nModel.getProperty(newText);
			this._getDialog().open();
			sap.ui.getCore().byId('inputText').setText(newText);
		},
		_getDialog: function() {
			// create a fragment with dialog, and pass the selected data
			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("M3A.fragment.Information", this);
			}
			return this.dialog;
		},
		_loadSavedValues: function(viewBindingPath) {
			var savedProjectsModel = this._getSavedProjectsModel();
			var factorCatalogModel = this._getFactorCatalogModel();
			var projectValues = savedProjectsModel.getProperty(viewBindingPath);
			for (var category in projectValues) {
				var categoryFactors = factorCatalogModel.getProperty("/" + category);
				if (projectValues.hasOwnProperty(category) && categoryFactors !== undefined && category !== "additionalInformation") {
					for (var i = 0; i < categoryFactors.length; i++) {
						var factorName = categoryFactors[i].factor;
						var selectedOption = projectValues[category][factorName].selectionOptions.key;
						var selectedWeight = projectValues[category][factorName].importance.key;
						factorCatalogModel.setProperty("/" + category + "/" + i + "/currentSelection", selectedOption);
						factorCatalogModel.setProperty("/" + category + "/" + i + "/currentWeight", selectedWeight);
					}
				}
				//initialize Model
				this._updateResults("clientTechnology");
				this._updateResults("dataSync");
				this._updateResults("operationsCenter");
				this._updateSelectionProgress("clientTechnology");
				this._updateSelectionProgress("dataSync");
				this._updateSelectionProgress("operationsCenter");
			}
		},
		_loadCategory: function(viewBindingPath, category) {
			var savedProjectsModel = this._getSavedProjectsModel();
			var factorCatalogModel = this._getFactorCatalogModel();
			var projectValues = savedProjectsModel.getProperty(viewBindingPath);
			var categoryFactors = factorCatalogModel.getProperty("/" + category);
			if (projectValues.hasOwnProperty(category) && categoryFactors !== undefined) {
				for (var i = 0; i < categoryFactors.length; i++) {
					var factorName = categoryFactors[i].factor;
					var selectedOption = projectValues[category][factorName].selectionOptions.key;
					var selectedWeight = projectValues[category][factorName].importance.key;
					factorCatalogModel.setProperty("/" + category + "/" + i + "/currentSelection", selectedOption);
					factorCatalogModel.setProperty("/" + category + "/" + i + "/currentWeight", selectedWeight);
				}
			}
			//initialize Model
			this._updateResults(category);
			this._updateSelectionProgress(category);
		},
		_reloadSelection: function(viewBindingPath, category) {
			var savedProjectsModel = this._getSavedProjectsModel();
			var factorCatalogModel = this._getFactorCatalogModel();
			var projectValues = savedProjectsModel.getProperty(viewBindingPath);
			var categoryFactors = factorCatalogModel.getProperty("/" + category);
			if (projectValues.hasOwnProperty(category) && categoryFactors !== undefined) {
				for (var i = 0; i < categoryFactors.length; i++) {
					var factorName = categoryFactors[i].factor;
					var selectedOption = projectValues[category][factorName].selectionOptions.key;
					factorCatalogModel.setProperty("/" + category + "/" + i + "/currentSelection", selectedOption);
				}
			}
			//initialize Model
			this._updateResults(category);
			this._updateSelectionProgress(category);
		},
		_onRouteMatched: function(oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/" + oArgs.projectIndex,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function(oEvent) {
						oView.setBusy(false);
					}
				},
				model: "savedProjects"
			});
			this._loadSavedValues("/" + oArgs.projectIndex);
			this.getView().getModel("savedProjects").setProperty("/" + oArgs.projectIndex + "/selectedIconTab", "information");

		},
		_onBindingChange: function(oEvent) {
			// No data for the binding
			if (!this.getView().getModel("savedProjects").getProperty(this.getView().getBindingContext("savedProjects").getPath())) {
				sap.m.MessageToast.show("This Project does not exist yet!");
			}
		},
		_onSelectionChange: function(oEvent) {
			//bring changes from factorCatalog Model to savedProjects model, where the calculations are run 
			var savedProjectsModel = this._getSavedProjectsModel();
			var factorCatalogModel = this._getFactorCatalogModel();
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath();
			var itemBindingPath;

			if (oEvent.getParameter("selectedItem") !== undefined) {
				//here it´s simple
				itemBindingPath = oEvent.getParameter("selectedItem").getBindingContext("factorCatalog").getPath();
			} else if (oEvent.getSource().getBindingContext("factorCatalog") !== undefined) {
				//SegmentedButton doesn´t provide the Binding Context of the Item, but only of the Button itself, so the Items Aggregation is filtered by the selectedKey attribute to find the selected item
				itemBindingPath = oEvent.getSource().getBindingContext("factorCatalog").getPath() +
					"/importance/" + oEvent.getSource().getItems().indexOf(
						oEvent.getSource().getItems().filter(
							function(item) {
								if (item.getKey() === oEvent.getSource().getSelectedKey()) {
									return true;
								}
							}
						)[0] // the selected Item, sorry it´s ugly
					);
			}
			var selectedValue = factorCatalogModel.getProperty(itemBindingPath); //either selection of weight or the selectionOption chosen for the factor
			var factorPath = itemBindingPath.split("/", 4);
			var category = factorPath[1];
			var type = factorPath.pop(); //selectionOptions or importance
			factorPath.push("factor");
			factorPath = factorPath.join("/");
			var factor = factorCatalogModel.getProperty(factorPath);
			if (selectedValue.key !== "notSelected") {
				factor = factor;
			}
			var newValue = "";
			var oSource = oEvent.getSource();
			this._updateBackgroundColor(oSource);

			if (category === "clientTechnology") {
				switch (factor) {
					case "devicePlatform":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "15");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "16");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "17");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "18");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "projectCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "devicePlatform" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "16");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "17");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "18");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "operationsCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "15");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "devicePlatform" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "17");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "18");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "maintenanceCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "15");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "16");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "devicePlatform" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "18");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "extendCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "15");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "16");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "17");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "devicePlatform" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "mobileUsage":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "dataSync");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/dataSync/" + "mobileUsage" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "dataSync");
						break;
					case "numberOfUsers":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "dataSync");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/dataSync/" + "numberOfUsers" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "dataSync");
						break;
					case "security":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "dataSync");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/dataSync/" + "security" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "dataSync");
						break;
					case "useCaseImportance":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "dataSync");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/dataSync/" + "useCaseImportance" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "dataSync");
						break;
					case "appChangeFrequency":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "operationsCenter");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/operationsCenter/" + "appChangeFrequency" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "operationsCenter");
						break;
					case "applicationLifetime":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "operationsCenter");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/operationsCenter/" + "applicationLifetime" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "operationsCenter");
						break;
					default:
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						break;
				}
			} else if (category === "dataSync") {
				switch (factor) {
					case "offlineDataVolume":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "12");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "13");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "14");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "projectCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "4");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "offlineDataVolume" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "12");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "13");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "14");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "operationsCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "4");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "offlineDataVolume" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "13");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "14");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "maintenanceCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "12");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "4");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "offlineDataVolume" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "14");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "extendCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "12");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "13");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "4");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "offlineDataVolume" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "mobileUsage":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "mobileUsage" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					case "numberOfUsers":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "numberOfUsers" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					case "security":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "security" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					case "useCaseImportance":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "useCaseImportance" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					default:
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						break;
				}
			} else if (category === "operationsCenter") {
				switch (factor) {
					case "existingBackendSystems":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "9");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "10");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "projectCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "0");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "existingBackendSystems" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "9");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "10");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "operationsCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "0");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "existingBackendSystems" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "10");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "maintenanceCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "9");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "0");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "existingBackendSystems" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "11");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "extendCost" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "extendCost":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "8");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "projectCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "9");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "operationsCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "10");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "maintenanceCost" + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "2", "0");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + "existingBackendSystems" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, category);
						break;
					case "appChangeFrequency":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "appChangeFrequency" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					case "applicationLifetime":
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						newValue = this._updatePath(itemBindingPath, newValue, "1", "clientTechnology");
						selectedValue = factorCatalogModel.getProperty(newValue);
						savedProjectsModel.setProperty(viewBindingPath + "/clientTechnology/" + "applicationLifetime" + "/" + type, selectedValue);
						this._reloadSelection(viewBindingPath, "clientTechnology");
						break;
					default:
						savedProjectsModel.setProperty(viewBindingPath + "/" + category + "/" + factor + "/" + type, selectedValue);
						break;
				}
			}
			this._updateResults(category);
			this._updateSelectionProgress(category);
		},
		_updatePath: function(itemBindingPath, newValue, arrayPosition, value) {
			newValue = itemBindingPath.split("/", 5);
			newValue[arrayPosition] = value;
			newValue = newValue.join("/");
			return newValue;
		},
		_updateNewValue: function(newValue, arrayPosition, value) {
			newValue = newValue.split("/", 5);
			newValue[arrayPosition] = value;
			newValue = newValue.join("/");
			return newValue;
		},
		_updateSelectionProgress: function(category) {
			var factorCatalogModel = this._getFactorCatalogModel();
			var selectedFactors = 0;
			var factors = factorCatalogModel.getProperty("/" + category);
			var totalFactors = factors.length;
			//loop through factors of the category and count those where the key "notSelected" is currenty selected
			for (var i = 0; i < totalFactors; i++) {
				var factor = factors[i];
				//check if the user selected something for that factor
				if (factor.currentSelection !== "notSelected") {
					selectedFactors++;
				}
			}
			//save result into savedProjectsModel
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath();
			var savedProjectsModel = this._getSavedProjectsModel();
			savedProjectsModel.setProperty(viewBindingPath + "/selectionProgress/" + category + "/selectedFactors", selectedFactors);
			savedProjectsModel.setProperty(viewBindingPath + "/selectionProgress/" + category + "/totalFactors", totalFactors);
			this._updateStatus(selectedFactors, category, totalFactors);
		},
		_updateBackgroundColor: function(oSource) {

			var sKey = oSource.getSelectedKey();

			if (sKey !== "notSelected" && sKey !== "low" && sKey !== "medium" && sKey !== "high") {

				oSource.addStyleClass("changeBackground");
			} else {
				oSource.removeStyleClass("changeBackground");
			}
		},

		_updateStatus: function(selectedFactors, category, totalFactors) {
			var i18nModel = this.getView().getModel("i18n");
			var status = "";

			var translationProgress = i18nModel.getProperty("inprogress");
			var translationFinished = i18nModel.getProperty("finished");
			var translationStarted = i18nModel.getProperty("notstarted");

			//check if selectedFactors match totalFactors
			if (selectedFactors !== totalFactors && selectedFactors !== 0) {
				status = translationProgress;
			} else if (selectedFactors === totalFactors) {
				status = translationFinished;
			} else {
				status = translationStarted;
			}

			//save result into savedProjectsModel
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath();
			var savedProjectsModel = this._getSavedProjectsModel();
			savedProjectsModel.setProperty(viewBindingPath + "/selectionProgress/" + category + "/status", status);

			//check the overall status
			var wholeStatus = savedProjectsModel.getProperty(status);
			var ctStatus = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/clientTechnology/status");
			var dsStatus = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/dataSync/status");
			var ocStatus = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/operationsCenter/status");

			//check if the category status are finished
			if (ctStatus === translationFinished && dsStatus === translationFinished && ocStatus === translationFinished) {
				wholeStatus = translationFinished;
			} else if (ctStatus === translationStarted && dsStatus === translationStarted && ocStatus === translationStarted) {
				wholeStatus = translationStarted;
			} else {
				wholeStatus = translationProgress;
			}

			//save status into savedProjectsModel
			savedProjectsModel.setProperty(viewBindingPath + "/status", wholeStatus);
			savedProjectsModel.setProperty(this.getView().getBindingContext("savedProjects") + "/lastChangedDate", new Date());
			var savedProjects = savedProjectsModel.getJSON();
			storage.save("savedProjects", savedProjects);

			this._updateRecommendation(category);
		},
		_updateRecommendation: function(category) {
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath();
			var savedProjectsModel = this._getSavedProjectsModel();
			var i18nModel = this.getView().getModel("i18n");

			//Read all decisionIndication for the round function
			var currentDecision = savedProjectsModel.getProperty(viewBindingPath + "/decisionIndication/" + category);
			var counter = 0;

			for (var i = 0; i < currentDecision.length; i++) {
				counter = counter + currentDecision[i];
			}

			if (counter === 0) {
				counter = counter + 0.00003;
			}

			//Calculate the percentage
			var currentPercentage = [0, 0, 0];

			for (i = 0; i < currentPercentage.length; i++) {
				currentPercentage[i] = (currentDecision[i] / counter) * 100;
				if (currentPercentage[i] === 0) {
					currentPercentage[i] = currentPercentage[i] + 0.00001;
				}
			}

			//Start the round function
			var roundPercentage = this._roundToHundred(currentPercentage, 100);

			savedProjectsModel.setProperty(viewBindingPath + "/decisionPercentage/" + category, roundPercentage);

			//Look if there is a new recommendation
			var results = savedProjectsModel.getProperty(viewBindingPath + "/decisionPercentage/" + category);
			var currentReco = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/" + category + "/recommendation");
			var recoPos = 0;
			var max = 0;
			var max2 = 0;
			var recommended = false;
			var bestValues = results.slice();
			var deleteIndex = null;
			var wholeRecommendation = "";

			for (i = 0; i < results.length; i++) {
				if (results[i] > max) {
					max = results[i];
					recoPos = i;
					deleteIndex = i;
				}
			}

			bestValues.splice(deleteIndex, 1);

			for (i = 0; i < bestValues.length; i++) {
				if (bestValues[i] > max2) {
					max2 = bestValues[i];
				}
			}

			if (max >= max2 + 10) {
				recommended = true;
			} else {
				recommended = false;
			}
			var translation = i18nModel.getProperty("recommendation");
			wholeRecommendation = translation + ": " + currentReco;

			//Save the changed recommendation
			currentReco = savedProjectsModel.getProperty(viewBindingPath + "/iconTabs/" + category + "/" + recoPos);
			currentReco = this._capitalizeRecommendation(currentReco);

			//Check if it should be recommended
			var translationDistinct = i18nModel.getProperty("notdistinct");
			if (recommended !== true) {
				currentReco = translationDistinct;
				wholeRecommendation = "";
			}
			savedProjectsModel.setProperty(viewBindingPath + "/selectionProgress/" + category + "/recommendation", currentReco);
			savedProjectsModel.setProperty(viewBindingPath + "/selectionProgress/" + category + "/wholeRecommendation", wholeRecommendation);

			//Read  all recommendation and set the whole recommendation for output
			var ctReco = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/clientTechnology/recommendation");
			var dsReco = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/dataSync/recommendation");
			var ocReco = savedProjectsModel.getProperty(viewBindingPath + "/selectionProgress/operationsCenter/recommendation");

			var wholeReco = ctReco + " - " + dsReco + " - " + ocReco;

			savedProjectsModel.setProperty(viewBindingPath + "/recommendation", wholeReco);
		},

		_roundToHundred: function(orig, target) {
			var i = orig.length,
				j = 0,
				total = 0,
				change, newVals = [],
				next, factor1, factor2, len = orig.length,
				marginOfErrors = [];
			// map original values to new array
			while (i--) {
				total += newVals[i] = Math.round(orig[i]);
			}
			change = total < target ? 1 : -1;
			// select number that will be less affected by change determined in terms of itself e.g. Incrementing 10 by 1 would mean an error of 10% in relation to itself.
			while (total !== target) {
				for (i = 0; i < len; i++) {
					next = i === len - 1 ? 0 : i + 1;
					factor2 = this._errorFactor(orig[next], newVals[next] + change);
					factor1 = this._errorFactor(orig[i], newVals[i] + change);
					if (factor1 > factor2) {
						j = next;
					}
				}
				newVals[j] += change;
				total += change;
			}
			for (i = 0; i < len; i++) {
				marginOfErrors[i] = newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
			}
			for (i = 0; i < len; i++) {
				for (j = 0; j < len; j++) {
					if (j === i) {
						continue;
					}
					var roundUpFactor = this._errorFactor(orig[i], newVals[i] + 1) + this._errorFactor(orig[j], newVals[j] - 1);
					var roundDownFactor = this._errorFactor(orig[i], newVals[i] - 1) + this._errorFactor(orig[j], newVals[j] + 1);
					var sumMargin = marginOfErrors[i] + marginOfErrors[j];
					if (roundUpFactor < sumMargin) {
						newVals[i] = newVals[i] + 1;
						newVals[j] = newVals[j] - 1;
						marginOfErrors[i] = newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
						marginOfErrors[j] = newVals[j] && Math.abs(orig[j] - newVals[j]) / orig[j];
					}
					if (roundDownFactor < sumMargin) {
						newVals[i] = newVals[i] - 1;
						newVals[j] = newVals[j] + 1;
						marginOfErrors[i] = newVals[i] && Math.abs(orig[i] - newVals[i]) / orig[i];
						marginOfErrors[j] = newVals[j] && Math.abs(orig[j] - newVals[j]) / orig[j];
					}
				}
			}
			return newVals;
		},
		_quickhelp: function(oControl, sText, bCustomize) {
			// create the RichTooltip control
			var oRichTooltip = new sap.ui.commons.RichTooltip({
				text: sText,
				title: "Quick Help",
				imageSrc: "images/Tip.gif"
			});
			//Change position and durations if required
			if (bCustomize) {
				oRichTooltip.setMyPosition("begin top");
				oRichTooltip.setAtPosition("end top");
				oRichTooltip.setOpenDuration(300);
				oRichTooltip.setCloseDuration(300);
			}
			// add it to the control
			oControl.setTooltip(oRichTooltip);
			// return the control itself (makes this function a decorator function)
			return oControl;
		},
		_errorFactor: function(oldNum, newNum) {
			return Math.abs(oldNum - newNum) / oldNum;
		},
		_capitalizeRecommendation: function(string) {
			return string.substring(0, 1).toUpperCase() + string.substring(1);
		},
		_updateResults: function(category) {
			var viewBindingPath = this.getView().getBindingContext("savedProjects").getPath();
			var savedProjectsModel = this._getSavedProjectsModel();
			var factorsInCategory = savedProjectsModel.getProperty(viewBindingPath + "/" + category);
			var results = [0, 0, 0];
			for (var factor in factorsInCategory) {
				if (factorsInCategory.hasOwnProperty(factor)) {
					var factorObject = factorsInCategory[factor];
					for (var j = 0; j < factorObject.selectionOptions.resultInfluence.length; j++) {
						results[j] += parseInt(factorObject.selectionOptions.resultInfluence[j], 10) * parseInt(factorObject.importance.weight, 10);
					}
				}
			}

			//Check if KO-criteria fits
			var ko = savedProjectsModel.getProperty(viewBindingPath + "/" + category + "/offlineDataVolume/selectionOptions/key");
			if (category === "dataSync" && ko === "LT100MB" || ko === "MT100MB") {
				//Set online option to zero
				results[0] = 0;
			}
			savedProjectsModel.setProperty(viewBindingPath + "/decisionIndication/" + category, results);
		},
		/////////////////////////////////////////////////GETTERS & SETTERS///////////////////////////////////////////////////////
		_getIconTabBar: function() {
			var oIconTabBar = this._oIconTabBar;
			if (oIconTabBar !== null) {
				return oIconTabBar;
			} else {
				this._oIconTabBar = this.getView().byId("idIconTabBar");
				return this._oIconTabBar;
			}
		},
		_getSavedProjectsModel: function() {
			var oSavedProjectsModel = this._oSavedProjectsModel;
			if (oSavedProjectsModel === null) {
				this._oSavedProjectsModel = this.getView().getModel("savedProjects");
				return this._oSavedProjectsModel;
			} else {
				return oSavedProjectsModel;
			}
		},
		_getFactorCatalogModel: function() {
			var oFactorCatalogModel = this._oFactorCatalogModel;
			if (oFactorCatalogModel === null) {
				this._oFactorCatalogModel = this.getView().getModel("factorCatalog");
				return this._oFactorCatalogModel;
			} else {
				return oFactorCatalogModel;
			}
		}
	});
});
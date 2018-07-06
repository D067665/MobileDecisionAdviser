sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"M4A/util/storage"
], function(JSONModel, Device, storage) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createFactorCatalogModel: function() {
			var oModel = new JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			oModel.setData(new function() {
				var factorCatalog = JSON.parse(storage.load("factorCatalog"));
				if(factorCatalog === null) {
				factorCatalog =	{
	"clientTechnology": [
							{"factor": "mobileUsage", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "moreAtTheOffice", "resultInfluence": ["3","1","1"]},{"key": "halfHalf", "resultInfluence": ["1","2","2"]}, {"key": "moreMobile", "resultInfluence": ["1","2","3"]}], "enabled": "True"},
							{"factor": "numberOfUsers", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "extreme", "resultInfluence": ["3","1","2"]}, {"key": "many", "resultInfluence": ["3","2","3"]}, {"key": "few", "resultInfluence": ["2","1","3"]}], "enabled": "True"},
							{"factor": "security", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "confidential", "resultInfluence": ["1","2","3"]}, {"key": "restricted", "resultInfluence": ["2","2","3"]}, {"key": "public", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "useCaseImportance", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "businessCritical", "resultInfluence": ["1","2","3"]}, {"key": "revenueEnabling", "resultInfluence": ["1","2","2"]}, {"key": "internal", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "appChangeFrequency", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "frequent", "resultInfluence": ["3","2","1"]}, {"key": "occasional", "resultInfluence": ["2","3","2"]}, {"key": "rare", "resultInfluence": ["1","2","3"]}], "enabled": "True"},
							{"factor": "applicationLifetime", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "long", "resultInfluence": ["1","2","2"]}, {"key": "medium", "resultInfluence": ["1","2","1"]}, {"key": "short", "resultInfluence": ["2","1","0"]}], "enabled": "True"},
							{"factor": "performanceExpectation", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "high", "resultInfluence": ["1","2","4"]}, {"key": "normal", "resultInfluence": ["2","2","1"]}], "enabled": "True"},
							{"factor": "lookAndFeelExpectation", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "amazing", "resultInfluence": ["0","0","15"]}, {"key": "normal", "resultInfluence": ["2","2","2"]}, {"key": "noMatter", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "devicePlatform", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "single", "resultInfluence": ["2","1","3"]}, {"key": "multiple", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "technicalCapabilities", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "specialFeatures", "resultInfluence": ["0","1","3"]}, {"key": "noSpecific", "resultInfluence": ["2","2","2"]}], "enabled": "True"},
							{"factor": "userProcesses", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "one", "resultInfluence": ["3","2","1"]}, {"key": "few", "resultInfluence": ["1","2","2"]}, {"key": "many", "resultInfluence": ["1","1","3"]}], "enabled": "True"},
							{"factor": "processComplexity", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "high", "resultInfluence": ["0","1","3"]}, {"key": "medium", "resultInfluence": ["1","2","2"]}, {"key": "low", "resultInfluence": ["2","1","0"]}], "enabled": "True"},
							{"factor": "projectBudget", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "high", "resultInfluence": ["1","2","3"]}, {"key": "restricted", "resultInfluence": ["2","2","2"]}, {"key": "low", "resultInfluence": ["3","1","1"]}, {"key": "unknown", "resultInfluence": ["2","1","1"]}], "enabled": "True"},
							{"factor": "longTermBudget", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "high", "resultInfluence": ["0","2","3"]}, {"key": "restricted", "resultInfluence": ["1","1","2"]}, {"key": "low", "resultInfluence": ["3","0","1"]}, {"key": "unknown", "resultInfluence": ["2","1","1"]}], "enabled": "True"},
							{"factor": "timeToMarket", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "short", "resultInfluence": ["3","1","1"]}, {"key": "normal", "resultInfluence": ["2","1","2"]}, {"key": "long", "resultInfluence": ["1","2","3"]}], "enabled": "True"},
							{"factor": "projectCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "single", "resultInfluence": ["2","1","3"]}, {"key": "multiple", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "operationsCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "single", "resultInfluence": ["1","1","3"]}, {"key": "multiple", "resultInfluence": ["3","2","1"]}], "enabled": "True"},
							{"factor": "maintenanceCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "single", "resultInfluence": ["5","2","5"]}, {"key": "multiple", "resultInfluence": ["6","4","2"]}], "enabled": "True"},
							{"factor": "extendCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "single", "resultInfluence": ["1","1","3"]}, {"key": "multiple", "resultInfluence": ["2","2","1"]}], "enabled": "True"}
						],
	"dataSync": [
							{"factor": "mobileUsage", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "moreAtTheOffice", "resultInfluence": ["3","2","1"]},{"key": "halfHalf", "resultInfluence": ["1","2","2"]}, {"key": "moreMobile", "resultInfluence": ["1","3","3"]}], "enabled": "True"},
							{"factor": "numberOfUsers", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "extreme", "resultInfluence": ["3","0","2"]}, {"key": "many", "resultInfluence": ["3","1","3"]}, {"key": "few", "resultInfluence": ["3","3","3"]}] , "enabled": "True"},
							{"factor": "security", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "confidential", "resultInfluence": ["3","1","2"]}, {"key": "restricted", "resultInfluence": ["2","2","2"]}, {"key": "public", "resultInfluence": ["3","1","1"]}] , "enabled": "True"},
							{"factor": "useCaseImportance", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "businessCritical", "resultInfluence": ["1","2","3"]}, {"key": "revenueEnabling", "resultInfluence": ["1","2","2"]}, {"key": "internal", "resultInfluence": ["3","2","1"]}] , "enabled": "True"},
							{"factor": "offlineDataVolume", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "no", "resultInfluence": ["10","1","1"]}, {"key": "LT100MB", "resultInfluence": ["0","3","2"]}, {"key": "MT100MB", "resultInfluence": ["0","0","10"]}], "enabled": "True"},
							{"factor": "dataTraffic", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "plenty", "resultInfluence": ["3","1","1"]}, {"key": "moderate", "resultInfluence": ["2","2","2"]}, {"key": "little", "resultInfluence": ["1","3","3"]}], "enabled": "True"},
							{"factor": "dataLifetime", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "long", "resultInfluence": ["2","2","3"]}, {"key": "medium", "resultInfluence": ["2","2","3"]}, {"key": "short", "resultInfluence": ["3","1","2"]}], "enabled": "True"},
							{"factor": "dataOperations", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "simple", "resultInfluence": ["2","2","2"]}, {"key": "complex", "resultInfluence": ["2","1","3"]}], "enabled": "True"},
							{"factor": "localDataSearch", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "veryImportant", "resultInfluence": ["0","1","3"]}, {"key": "important", "resultInfluence": ["1","2","2"]}, {"key": "unimportant", "resultInfluence": ["3","1","1"]}] , "enabled": "True"},
							{"factor": "dataStructure", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "simple", "resultInfluence": ["2","2","1"]}, {"key": "complex", "resultInfluence": ["1","1","2"]}] , "enabled": "True"},
							{"factor": "userType", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "internal", "resultInfluence": ["1","2","3"]}, {"key": "partner", "resultInfluence": ["2","2","2"]}, {"key": "consumer", "resultInfluence": ["3","1","1"]}] , "enabled": "True"},
							{"factor": "projectCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "no", "resultInfluence": ["3","0","0"]}, {"key": "LT100MB", "resultInfluence": ["0","3","2"]}, {"key": "MT100MB", "resultInfluence": ["0","0","3"]}], "enabled": "True"},
							{"factor": "operationsCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "no", "resultInfluence": ["3","0","0"]}, {"key": "LT100MB", "resultInfluence": ["0","3","2"]}, {"key": "MT100MB", "resultInfluence": ["0","0","3"]}], "enabled": "True"},
							{"factor": "maintenanceCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "no", "resultInfluence": ["6","0","0"]}, {"key": "LT100MB", "resultInfluence": ["0","6","4"]}, {"key": "MT100MB", "resultInfluence": ["0","0","6"]}], "enabled": "True"},
							{"factor": "extendCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "no", "resultInfluence": ["3","0","0"]}, {"key": "LT100MB", "resultInfluence": ["0","3","2"]}, {"key": "MT100MB", "resultInfluence": ["0","0","3"]}], "enabled": "True"}
						],
	"operationsCenter": [
							{"factor": "existingBackendSystems", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "hybrid", "resultInfluence": ["0","1","3"]}, {"key": "inCloud", "resultInfluence": ["0","3","0"]}] , "enabled": "True"},
							{"factor": "existingMobileMiddleware", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "inCloud", "resultInfluence": ["0","3","1"]}] , "enabled": "True"},
							{"factor": "thirdPartyIntegration", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "inCloud", "resultInfluence": ["0","3","1"]}] , "enabled": "True"},
							{"factor": "operationsTeam", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "internal", "resultInfluence": ["3","1","2"]}, {"key": "external", "resultInfluence": ["1","3","2"]}] , "enabled": "True"},
							{"factor": "appChangeFrequency", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "frequent", "resultInfluence": ["1","3","2"]}, {"key": "occasional", "resultInfluence": ["2","2","2"]}, {"key": "rare", "resultInfluence": ["3","1","2"]}] , "enabled": "True"},
							{"factor": "applicationLifetime", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "long", "resultInfluence": ["3","1","2"]}, {"key": "medium", "resultInfluence": ["2","2","2"]}, {"key": "short", "resultInfluence": ["1","3","2"]}] , "enabled": "True"},
							{"factor": "systemAvailability", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "high", "resultInfluence": ["1","3","1"]}, {"key": "normal", "resultInfluence": ["2","2","1"]}, {"key": "low", "resultInfluence": ["3","2","2"]}] , "enabled": "True"},
							{"factor": "possibleExpenditure", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "capex", "resultInfluence": ["3","1","2"]}, {"key": "opex", "resultInfluence": ["1","3","2"]}] , "enabled": "True"},
							{"factor": "projectCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "hybrid", "resultInfluence": ["1","2","3"]}, {"key": "inCloud", "resultInfluence": ["0","3","1"]}] , "enabled": "True"},
							{"factor": "operationsCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "hybrid", "resultInfluence": ["1","1","3"]}, {"key": "inCloud", "resultInfluence": ["0","3","1"]}] , "enabled": "True"},
							{"factor": "maintenanceCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["6","0","2"]}, {"key": "hybrid", "resultInfluence": ["2","2","5"]}, {"key": "inCloud", "resultInfluence": ["0","6","2"]}] , "enabled": "True"},
							{"factor": "extendCost", "type": "calculationFactor", "currentSelection": "notSelected", "currentWeight": "medium", "importance": [{"key":"low","weight":"1"},{"key": "medium", "weight" : "2"},{"key": "high", "weight": "3"}], "selectionOptions":[{"key": "notSelected", "resultInfluence": ["0","0","0"]}, {"key": "onPremise", "resultInfluence": ["3","0","1"]}, {"key": "hybrid", "resultInfluence": ["1","1","3"]}, {"key": "inCloud", "resultInfluence": ["0","3","1"]}] , "enabled": "True"}
						]
};
}
return factorCatalog;

}
);
			return oModel;
		},
		
		createSavedProjectsModel: function() {
			var oModel = new JSONModel();
			
			oModel.setData(new function() {
				var savedProjects = JSON.parse(storage.load("savedProjects"));
				
				if(savedProjects === null || savedProjects === "" || savedProjects.length === 0) {
					savedProjects = [



//Database for the Example
{
"applicationName":"Example App",
"status":"finished",
"lastChangedDate":"",
"recommendation":"Native - Not Distinct - HybridCloud",
"selectedIconTab":"information",
"iconTabs":{"information":[],"clientTechnology":["web","hybrid","native"],"dataSync": ["online","liteOffline","offline"],"operationsCenter":["onPremise","cloud","hybridCloud"],"overview":[]},
"audienceGroup":"businessToEmployee",
"additionalInformation":{
"deviceFormFactor":[true,true,true],
"devicePlatform":[true,true,true,false,false],
"language":"german",
"owner":"Sporthochschule Köln",
"plannedEndOfLife":"unknown",
"plannedGoLive":"Final POC delivery = Q1 2020",
"useCase":"Digital Non-interventional AF-screening study",
"userGeography":[false,true,false],
"users": ""
},
"clientTechnology":{
	"appChangeFrequency":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"frequent","resultInfluence":["3","2","1"]}},
	"applicationLifetime":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"long","resultInfluence":["1","2","2"]}},
	"devicePlatform":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"single","resultInfluence":["2","1","3"]}},
	"extendCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"single","resultInfluence":["1","1","3"]}},
	"longTermBudget":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"high","resultInfluence":["0","2","3"]}},
	"lookAndFeelExpectation":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"amazing","resultInfluence":["0","0","15"]}},
	"maintenanceCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"single","resultInfluence":["5","2","5"]}},
	"mobileUsage":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"moreAtTheOffice","resultInfluence":["3","1","1"]}},
	"numberOfUsers":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"many","resultInfluence":["3","2","3"]}},
	"operationsCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"single","resultInfluence":["1","1","3"]}},
	"performanceExpectation":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"high","resultInfluence":["1","2","4"]}},
	"processComplexity":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"low","resultInfluence":["2","1","0"]}},
	"projectBudget":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"unknown","resultInfluence":["2","1","1"]}},
	"projectCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"single","resultInfluence":["2","1","3"]}},
	"security":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"confidential","resultInfluence":["1","2","3"]}},
	"technicalCapabilities":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"specialFeatures","resultInfluence":["0","1","3"]}},
	"timeToMarket":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"long","resultInfluence":["1","2","3"]}},
	"useCaseImportance":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"revenueEnabling","resultInfluence":["1","2","2"]}},
	"userProcesses":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"one","resultInfluence":["3","2","1"]}}
},
"dataSync":{
	"dataLifetime":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"medium","resultInfluence":["2","2","3"]}},
	"dataOperations":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"simple","resultInfluence":["2","2","2"]}},
	"dataStructure":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"simple","resultInfluence":["2","2","1"]}},
	"dataTraffic":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"moderate","resultInfluence":["2","2","2"]}},
	"extendCost":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"LT100MB","resultInfluence":["0","3","2"]}},
	"localDataSearch":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"unimportant","resultInfluence":["3","1","1"]}},
	"maintenanceCost":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"LT100MB","resultInfluence":["0","6","4"]}},
	"mobileUsage":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"moreAtTheOffice","resultInfluence":["3","2","1"]}},
	"numberOfUsers":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"many","resultInfluence":["3","1","3"]}},
	"offlineDataVolume":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"LT100MB","resultInfluence":["0","3","2"]}},
	"operationsCost":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"LT100MB","resultInfluence":["0","3","2"]}},
	"projectCost":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"LT100MB","resultInfluence":["0","3","2"]}},
	"security":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"confidential","resultInfluence":["3","1","2"]}},
	"useCaseImportance":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"revenueEnabling","resultInfluence":["1","2","2"]}},
	"userType":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"partner","resultInfluence":["2","2","2"]}}
},
"operationsCenter":{
	"appChangeFrequency":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"frequent","resultInfluence":["1","3","2"]}},
	"applicationLifetime":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"long","resultInfluence":["3","1","2"]}},
	"existingBackendSystems":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"hybrid","resultInfluence":["0","1","3"]}},
	"existingMobileMiddleware":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"onPremise","resultInfluence":["3","0","1"]}},
	"extendCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"hybrid","resultInfluence":["1","1","3"]}},
	"maintenanceCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"hybrid","resultInfluence":["2","2","5"]}},
	"operationsCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"hybrid","resultInfluence":["1","1","3"]}},
	"operationsTeam":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"internal","resultInfluence":["3","1","2"]}},
	"possibleExpenditure":{"importance":{"key":"high","weight":"3"},"selectionOptions":{"key":"capex","resultInfluence":["3","1","2"]}},
	"projectCost":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"hybrid","resultInfluence":["1","2","3"]}},
	"systemAvailability":{"importance":{"key":"low","weight":"1"},"selectionOptions":{"key":"high","resultInfluence":["1","3","1"]}},
	"thirdPartyIntegration":{"importance":{"key":"medium","weight":"2"},"selectionOptions":{"key":"inCloud","resultInfluence":["0","3","1"]}}
},
"selectionProgress":{
	"clientTechnology":{"recommendation":"Native","selectedFactors":19,"status":"Finished","totalFactors":19,"wholeRecommendation":"Recommendation: Native"},
	"dataSync":{"recommendation":"Not Distinct","selectedFactors":15,"status":"Finished","totalFactors":15,"wholeRecommendation":""},
	"operationsCenter":{"recommendation":"HybridCloud","selectedFactors":12,"status":"Finished","totalFactors":12,"wholeRecommendation":"Recommendation: HybridCloud"}
},
"decisionIndication":{
	"clientTechnology":[66,57,130],
	"dataSync":[0,83,72],
	"operationsCenter":[41,38,58]
},
"decisionPercentage":{
	"clientTechnology":[26,23,51],
	"dataSync":[0,54,46],
	"operationsCenter":[30,28,42]
}
}
];} else {
	savedProjects.forEach(function(project) { project.lastChangedDate = new Date(project.lastChangedDate); });
}
return savedProjects; 
			});
			return oModel;
		}
	};
});
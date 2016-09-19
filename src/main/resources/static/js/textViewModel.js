"use strict";
var textViewModel = function(httpRequests){
	
	var self = this;
	
	self.textMessage = ko.observable("");
	self.serverMessage = ko.observable("");
	
	self.isServerMessageVisible = ko.observable(false);
	self.sendTextSuccessCallback = function(data){
		
		self.serverMessage(data);
		self.isServerMessageVisible(true);
		
	}
	
	self.sendMessage = function(){
		
		httpRequests.echoText(self.sendTextSuccessCallback, self.textMessage());
		
	}	
	
	
}
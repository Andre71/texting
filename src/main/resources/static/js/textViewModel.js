"use strict";
function textViewModel (httpRequests){
	
	var self = this;
	
	self.textUserName = ko.observable(""); 
	self.textMessage = ko.observable("");
	self.serverMessage = ko.observable("");
	
	self.isServerMessageVisible = ko.observable(false);
	self.sendTextSuccessCallback = function(data){
		
		self.serverMessage(data);
		self.isServerMessageVisible(true);
		
	}
	
	self.sendMessage = function(){
		
		httpRequests.createText(self.sendTextSuccessCallback, self.textMessage(), self.textUserName() );
		
	}	
	
	
}
"use strict";
function textViewModel (httpRequests){
	
	var self = this;	
	
	
	self.createMessage = function(){
		
		return {		
			textUserName : ko.observable(""), 
			textMessage : ko.observable("")
		}
		
	}	

	self.newTextMessage = self.createMessage();
	
	self.serverMessage = ko.observable("");
	
	self.isServerMessageVisible = ko.observable(false);
	self.postTextSuccessCallback = function(data){
		
		self.serverMessage(data);
		self.isServerMessageVisible(true);
		
	}
	
	self.postMessage = function(){
		
		httpRequests.createText(self.postTextSuccessCallback, self.newTextMessage );
		
	}	
	
	
}
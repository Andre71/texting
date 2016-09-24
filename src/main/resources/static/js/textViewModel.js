"use strict";
function textViewModel (httpRequests){
	
	var self = this;	
	
	
	self.createMessage = function(){
		
		return {		
			textUserName : ko.observable(""), 
			textMessage : ko.observable(""),
			replyToTextId : ko.observable("")
		}
		
	}
	
	self.clearMessages = function(message){		
		message.textUserName("");
		message.textMessage("");
		message.replyToTextId("");		
	}

	self.newTextMessage = self.createMessage();
	self.replyTextMessage = self.createMessage(); 
	
	self.serverMessage = ko.observable("");
	
	self.isServerMessageVisible = ko.observable(false);
	self.postTextSuccessCallback = function(data){
		
		self.serverMessage(data);
		self.isServerMessageVisible(true);
		self.clearMessages(self.newTextMessage);
		self.loadAllPostsByUser();
		
	}
	
	self.postMessage = function(){
		
		httpRequests.createText(self.postTextSuccessCallback, self.newTextMessage );
		
	}	
	
	self.postReplyMessageCallback = function(){
		
		self.loadAllPostsByUser();
		self.clearMessages(self.replyTextMessage);		
	}
	
	self.postReplyMessage = function(){

		httpRequests.createText(self.postReplyMessageCallback, self.replyTextMessage );
		
	}	
	
	
	self.allPostsByUser = ko.observableArray([]);	
	self.loadAllPostsByUserCallback = function(data){
		
		self.allPostsByUser(data);
		
	}
	
	self.loadAllPostsByUser = function(){
		
		httpRequests.getAllposts(self.loadAllPostsByUserCallback );
		
	}
	
	self.init = function(){
		self.loadAllPostsByUser();
		
	}();
	
	
}
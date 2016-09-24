"use strict";
function textViewModel (httpRequests){
	
	var self = this;	
	
	self.createMessage = function(){
		
		return {		
			textUserName : ko.observable(""), 
			textMessage : ko.observable(""),
			replyToTextId : ko.observable(""),
			city : ko.observable(""),
			locationQuery : ko.observable("")
		}		
	}

	
	self.clearMessages = function(message){		
		message.textUserName("");
		message.textMessage("");
		message.replyToTextId("");
		message.city("");
		self.cityList([]);
	}

	self.newTextMessage = self.createMessage();
	self.replyTextMessage = self.createMessage(); 
	
	self.enableDoneButton = ko.computed(function() {
	    return 	self.newTextMessage.textUserName() &&
			    self.newTextMessage.textMessage() &&
			    self.newTextMessage.city() &&
			    self.newTextMessage.locationQuery(); 
	}, self);
		
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
	
	self.cityList = ko.observableArray([]);
	
	self.getCityListCallback = function(data){		
		
		
		if(data.response.hasOwnProperty("results")){
			
			self.cityList([]);
			
			for (var i = 0; i < data.response.results.length; i++){
			
				self.cityList.push({
					"locationString" : data.response.results[i].city + " - " + data.response.results[i].state + "-" + data.response.results[i].country_name,
					"locationQuery" : data.response.results[i].l						
				})
				
			}
			
		}else{
			
			alert("No results found for city : " + self.newTextMessage.city());
		}
		
	}
	

	
	self.getCityList = function(){
		
		httpRequests.getCityList(self.newTextMessage.city(), self.getCityListCallback );
		
	}
	
	
	self.init = function(){
		self.loadAllPostsByUser();
		
	}();
	
	
}
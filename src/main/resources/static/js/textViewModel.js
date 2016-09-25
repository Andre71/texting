"use strict";
function textViewModel (httpRequests){
	
	var self = this;	

	self.createMessage = function(){
		
		return {		
			textUserName : ko.observable(""), 
			textMessage : ko.observable(""),
			replyToTextId : ko.observable(""),
			city : ko.observable(""),
			latitiude : ko.observable(""),
			longitude : ko.observable(""),
			temperature : ko.observable(""),
			locationQuery : ko.observable("")
		}		
	}

	
	self.clearMessages = function(message){		
		message.textUserName("");
		message.textMessage("");
		message.replyToTextId("");
		message.city("");
		message.latitiude("");
		message.longitude("");
		message.temperature("");
		message.locationQuery("");
		self.cityList([]);
	}

	self.newTextMessage = self.createMessage();
	self.replyTextMessage = self.createMessage(); 
	
	self.isLoading = ko.observable(false);
	
	self.enableDoneButton = ko.computed(function() {
	    return 	self.newTextMessage.textUserName() &&
			    self.newTextMessage.textMessage() &&
			    self.newTextMessage.city() &&
			    self.newTextMessage.locationQuery() &&
			    !self.isLoading();
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
		self.isLoading(false);
	}
	
	self.postReplyMessage = function(){

		self.isLoading(true);
		httpRequests.createText(self.postReplyMessageCallback, self.replyTextMessage );
		
	}	
	
	
	self.allPostsByUser = ko.observableArray([]);	
	self.loadAllPostsByUserCallback = function(data){
		
		self.allPostsByUser(data);
		self.isLoading(false);
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
					"locationQuery" : data.response.results[i].zmw						
				})				
				
			}
			
			self.getWeatherLookup(data.response.results[0].zmw,	self.getWeatherLookupCallback)
			
		}else{
			
			alert("No results found for city : " + self.newTextMessage.city());
		}
		
	}
	
	self.getCityList = function(){
		
		if(self.newTextMessage.city()){		
			httpRequests.getCityList(self.newTextMessage.city().trim(), self.getCityListCallback );
		}
	}
	
	self.getWeatherLookupCallback = function(data){
		
		if( 			
			data.hasOwnProperty("location") && 
			data.hasOwnProperty("current_observation")			
		){
						
			self.newTextMessage.latitiude(data.location.lat);
			self.newTextMessage.longitude(data.location.lon);
			self.newTextMessage.temperature(data.current_observation.temp_c);
			self.isLoading(false);
			
		}else{
			
			alert("Failed to retrive weather data");
			
		}
	}
	
	self.getWeatherLookup = function(){
		
		self.isLoading(true);
		httpRequests.getWeatherLookup(self.newTextMessage.locationQuery(), self.getWeatherLookupCallback );
		
	}
	
	
	self.init = function(){
		self.loadAllPostsByUser();
		
	}();
	
	
}
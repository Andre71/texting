//textViewModel.js
var textViewModel = function(httpRequests){
	
	var self = this;
	
	self.textMessage = ko.observable("here is some text");
	self.sendMessage = function(){
		
		httpRequests.echoText(function(data){ alert(data) }, self.textMessage());
		
	}	
	
	
}
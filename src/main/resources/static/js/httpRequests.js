"use strict";

var httpRequets = {
		
		createText : function(onSuccess, textMessageObj){
			
			$.ajax({
			    url: '/createText',
			    type: 'POST',
			    contentType: "application/json",
			    data : JSON.stringify({			    	
			    	messageText : textMessageObj.textMessage(), 			
			    	userName : textMessageObj.textUserName(),
			    	replyToTextId : textMessageObj.replyToTextId(),
			    	city : textMessageObj.city(),
					latitiude : textMessageObj.latitiude(),
					longitude : textMessageObj.longitude(),
					temperature : textMessageObj.temperature()
			    	
			    }),
			    success: function(data){ 
			    	
			    	onSuccess(data);

			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});
			
		},
		
		getAllposts : function(onSuccess){
			
			$.ajax({
			    url: '/getAllTextsWithReplies',
			    type: 'GET',
			    contentType: "application/json",
			    success: function(data){	    	
			    	onSuccess(data);
			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});
			
		},	
		
		getCityList : function(cityName, onSuccess){

			$.ajax({
			    url: '/cityLookup/' + cityName,
			    type: 'GET',
			    contentType: "application/json",
			    success: function(data){	
			    	onSuccess(data);
			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});			
			
		},
		
		getWeatherLookup : function(locationQuery, onSuccess){

			$.ajax({
			    url: '/weatherLookup?zmw=' + locationQuery,
			    type: 'GET',
			    contentType: "application/json",
			    success: function(data){	
			    	onSuccess(data);
			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});			
			
		}
		

}
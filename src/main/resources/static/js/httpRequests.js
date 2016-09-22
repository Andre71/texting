"use strict";

var httpRequets = {
		
		createText : function(onSuccess, textMessageObj){
			
			$.ajax({
			    url: '/createText',
			    type: 'POST',
			    contentType: "application/json",
			    data : JSON.stringify({			    	
			    	messageText : textMessageObj.textMessage(), 			
			    	userName : textMessageObj.textUserName()
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
			    url: '/getAlltexts',
			    type: 'GET',
			    contentType: "application/json",
			    success: function(data){ 
			    	
			    	console.log(typeof data)
			    	console.log(data);			    	
			    	onSuccess(data);

			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});
			
		}	
		
}
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
			    	replyToTextId : textMessageObj.replyToTextId()
			    	
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
			
		}	
		
}
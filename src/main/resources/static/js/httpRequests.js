"use strict";

var httpRequets = {
		
		createText : function(onSuccess, messageText, userName){
			
			$.ajax({
			    url: '/createText',
			    type: 'POST',
			    contentType: "application/json",
			    data : JSON.stringify({			    	
			    	messageText : messageText, 
			    	userName : userName
			    }),
			    success: function(data){ 
			    	
			    	onSuccess(data);

			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});
			
		}			
		
		
}
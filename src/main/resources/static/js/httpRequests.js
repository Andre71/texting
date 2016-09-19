var httpRequets = {
		
		echoText : function(onSuccess, message){
			
			$.ajax({
			    url: '/echotext?text=' + message,
			    type: 'GET',
			    success: function(data){ 
			    	
			    	onSuccess(data);

			    },
			    error: function() {
			        alert('Transmission Error'); 
			    }
			});
			
		}			
		
		
}
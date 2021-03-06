describe("the text view model", function () {
	
	var allBackEndTextsStub = [];
	
	var mockHttpRequets = {			
			createText : function(onSuccess, message){
				
				onSuccess(message.textMessage());
			},
			getAllposts : function(onSuccess){
				
				allBackEndTextsStub.push({
					createTimeStamp : 1474516762000,
					id : 123,
					messageText : "message text",
					userName : "userName"
					
				});
				
				onSuccess(allBackEndTextsStub);
			},
			getCityList :  function(message, onSuccess){
				
				onSuccess(onSuccess);
			},
			getWeatherLookup : function(message, onSuccess){
				
				onSuccess(onSuccess);
			}
	}
	
	var viewModel;
	
	beforeEach(function(){
		viewModel = new textViewModel(mockHttpRequets);
	});
	
    it("the viewmodel must be defined", function () {

        expect(typeof viewModel).toBe("object");
    });
	

    it("must default the server message section to not visible", function () {

        expect(viewModel.isServerMessageVisible()).toBe(false);
    });    
    
    
    it("must invoke the postTextSuccessCallback method after postMessage has been called ", function () {    	

    	spyOn(viewModel, 'postTextSuccessCallback') 
    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("myUserName");    	
    	viewModel.postMessage();    	
        expect(viewModel.postTextSuccessCallback).toHaveBeenCalled();
        
    });
    
    it("must call and increment allPostsByUser after postMessage has been called  ", function () {
    	
    	var expectLength = viewModel.allPostsByUser().length + 1;
    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("myUserName");    	
    	viewModel.postMessage();      	
    	expect(expectLength).toBe(viewModel.allPostsByUser().length);
    	
    });
    
    it("must display the same message from the server as the one entered", function () {
    	var message = "this is a message";
    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("myUserName");  
    	viewModel.postMessage();    	
        expect(viewModel.serverMessage()).toBe(message);
        
    });
    
    it("must clear the text form once the postMessage has been called ", function () {  
    	
    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("myUserName");  	
    	viewModel.postMessage();    	
        expect(viewModel.newTextMessage.textMessage()).toBe("");
        expect(viewModel.newTextMessage.textUserName()).toBe("");

    	
    });    
    
    
    it("must prevent submissions when form fields are blank", function () {  
    	
    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("");
        expect(viewModel.enableDoneButton()).toBe("");
    	
    });
    
    
    it("must not make an ajax call via getCityList if city is blank", function () {  
    	
    	 spyOn(viewModel, 'getCityListCallback')
    	 viewModel.newTextMessage.city("");
    	 viewModel.getCityList();
    	 expect(viewModel.getCityListCallback).not.toHaveBeenCalled();
    	
    });
    
    it("must make an ajax call via getCityList if city is not blank", function () {  
    	
	   	 spyOn(viewModel, 'getCityListCallback')
	   	 viewModel.newTextMessage.city("Tornoto");
	   	 viewModel.getCityList();
	   	 expect(viewModel.getCityListCallback).toHaveBeenCalled();
   	
   });


});

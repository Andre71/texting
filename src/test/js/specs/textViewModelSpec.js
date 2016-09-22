describe("the text view model", function () {
	
	var mockHttpRequets = {			
			createText : function(onSuccess, message){
				
				onSuccess(message.textMessage());
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
    
    
    it("must display the same message from the server as the one entered", function () {

    	viewModel.newTextMessage.textMessage("this is a message");
    	viewModel.newTextMessage.textUserName("myUserName");  
    	viewModel.postMessage();    	
        expect(viewModel.serverMessage()).toBe(viewModel.newTextMessage.textMessage());
        
    });


});

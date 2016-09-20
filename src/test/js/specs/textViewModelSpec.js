describe("the text view model", function () {
	
	var mockHttpRequets = {			
			echoText : function(onSuccess, message){
				
				onSuccess(message);
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
    
    
    it("must invoke the sendTextSuccessCallback method after sendMessage has been called ", function () {

    	spyOn(viewModel, 'sendTextSuccessCallback') 
    	viewModel.textMessage("this is a message");
    	viewModel.sendMessage();    	
        expect(viewModel.sendTextSuccessCallback).toHaveBeenCalled();
        
    });
    
    
    it("must display the same message from the server as the one entered", function () {

    	viewModel.textMessage("this is a message");
    	viewModel.sendMessage();    	
        expect(viewModel.serverMessage()).toBe(viewModel.textMessage());
        
    });


});

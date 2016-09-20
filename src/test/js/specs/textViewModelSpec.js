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
	

    it("must default the server message seaction to not visible", function () {

        expect(viewModel.isServerMessageVisible()).toBe(false);
    });


});

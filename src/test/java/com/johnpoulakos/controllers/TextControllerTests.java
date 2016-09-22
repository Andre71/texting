package com.johnpoulakos.controllers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import com.google.gson.Gson;
import com.johnpoulakos.TextingApplication;
import com.johnpoulakos.domain.Message;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TextingApplication.class)
@WebAppConfiguration
public class TextControllerTests {
	
	private MockMvc mockMvc;
	
	private Message stubMessage;
	
    @Autowired
    private WebApplicationContext webApplicationContext;
	
    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();
        this.stubMessage = new Message();        
    }
	
    @Test
    public void createTextReturnsOkStatusAndCorrectContent() throws Exception {
    	
    	stubMessage.setMessageText("johnMessage");
    	stubMessage.setUserName("johnUser");
    	
	    Gson gson = new Gson();
	    String json = gson.toJson(this.stubMessage);
    	
        mockMvc.perform(post("/createText").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk())
                .andExpect(content().string(stubMessage.getMessageText()));

    }
    
    
    @Test
    public void createTextReturnsOkStatusAndCorrectContentWithSpacesAndSpecialCharacters() throws Exception {

    	stubMessage.setMessageText("john is 'testing' ");
    	stubMessage.setUserName("johnUser");
    	
	    Gson gson = new Gson();
	    String json = gson.toJson(this.stubMessage);
    	
        mockMvc.perform(post("/createText").contentType(MediaType.APPLICATION_JSON).content(json))
	        .andExpect(status().isOk())
	        .andExpect(content().string(stubMessage.getMessageText()));

    }
    
    @Test
    public void createTextDoesNotReturnOkStatusWhenTextParamMissing() throws Exception {    	
        mockMvc.perform(post("/createText"))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    public void getAlltextsReturnsOkStatus() throws Exception {
    	
        mockMvc.perform(get("/getAlltexts"))
                .andExpect(status().isOk());

    }

}

package com.johnpoulakos.controllers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;


import com.johnpoulakos.TextingApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TextingApplication.class)
@WebAppConfiguration
public class TextControllerTests {
	
	private MockMvc mockMvc;
	
    @Autowired
    private WebApplicationContext webApplicationContext;
	
    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();
        
    }
	
    @Test
    public void echotextReturnsOkStatusAndCorrectContent() throws Exception {
    	
    	String param = "john";
    	
        mockMvc.perform(get("/echotext?text=" + param))
                .andExpect(status().isOk())
                .andExpect(content().string(param));

    }
    
    
    @Test
    public void echotextReturnsOkStatusAndCorrectContentWithSpacesAndSpecialCharacters() throws Exception {
    	
    	String param = "john is 'testing' ";
    	
        mockMvc.perform(get("/echotext?text=" + param))
                .andExpect(status().isOk())
                .andExpect(content().string(param));

    }
    
    @Test
    public void echotextDoesNotReturnOkStatusWhenTextParamMissing() throws Exception {    	
        mockMvc.perform(get("/echotext"))
                .andExpect(status().isBadRequest());
    }

}

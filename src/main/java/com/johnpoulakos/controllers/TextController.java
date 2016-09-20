package com.johnpoulakos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.johnpoulakos.services.MessageService;

@RestController
public class TextController {
	
    private MessageService messageService;

    @Autowired
    public void setProductService(MessageService messageService) {
        this.messageService = messageService;
    }
	
	@RequestMapping("/echotext")
	@ResponseBody ResponseEntity<?> echoText(@RequestParam("text") String text){				
		
		return new ResponseEntity<String>(text, HttpStatus.OK);
		
	}

}

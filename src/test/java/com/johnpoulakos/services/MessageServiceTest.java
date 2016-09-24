package com.johnpoulakos.services;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.johnpoulakos.TextingApplication;
import com.johnpoulakos.domain.Message;
import com.johnpoulakos.domain.MessageDao;
import com.johnpoulakos.domain.MessageGroup;
import com.johnpoulakos.utils.*;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TextingApplication.class)
public class MessageServiceTest {
	
	private MessageService messageService;
	
	private MessageDao messageDao;
	
	@Autowired
	public void setMessageDao(MessageDao messageDao){
		
		this.messageDao = messageDao;
		
	}		
	
	@Autowired
	public void setMessageService(MessageService messageService){
		
		this.messageService = messageService;
		
	}		
	
    @Test
    public void testFindallSortsByUserName(){   	
		
    	
    	this.messageDao.deleteAll();

		String messageText = "This is a message";
		
		String users[] = { "bbb", "ccc", "aaa" };
		String usersSorted[] = { "aaa", "bbb", "ccc" };
		
		
		for (int i=0; i<users.length; i++){
						
			Message message = new Message();
			message.setMessageText(messageText);
			message.setUserName(users[i]);
			
			Message confirm = this.messageDao.save(message);			
			System.out.println(confirm.getUserName());
			
		}		

		Iterable<Message> messages = this.messageService.getAllMessages();		
		List<MessageGroup> messageGroupList = this.messageService.getMessgeGroup(messages);
		messageGroupList = MessageGroupBuilder.sortByUser(messageGroupList);
		
		int counter = 0;		
		
	    for (MessageGroup msgGroup : messageGroupList) {	    	
	    	
	    	assertEquals(usersSorted[counter++], msgGroup.getMessage().getUserName());
	    		
	    }
		
			    
		
		
    }
	

}

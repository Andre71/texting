package com.johnpoulakos.services;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
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
	
	
    @Before
    public void clearData() {

    	this.messageDao.deleteAll();
    }

	
    @Test
    public void testFindallSortsByUserName(){

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
    
    @Test
    public void testResponsesAreMapptedToMessages(){   
    	
		Message message = new Message();
		message.setMessageText("test message");
		message.setUserName("userA");
		
		Message confirm = this.messageDao.save(message);
	
		String replyString = "reply message";
		
		Message reply = new Message();	
		reply.setMessageText(replyString);
		reply.setUserName("userB");		
		reply.setReplyToTextId(confirm.getId());
		this.messageDao.save(reply);
		
		Iterable<Message> allMessages = this.messageService.getAllMessages();
		List<MessageGroup> messageGrouplist = this.messageService.getMessgeGroup(allMessages);
		
		assertEquals(messageGrouplist.size(), 1);
		assertEquals(messageGrouplist.get(0).getMessage().getId(),
				messageGrouplist.get(0).getReplies().get(0).getReplyToTextId());
		assertEquals(replyString,
				messageGrouplist.get(0).getReplies().get(0).getMessageText());
    	
    }
	

}

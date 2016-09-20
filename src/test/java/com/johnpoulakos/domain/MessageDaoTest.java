package com.johnpoulakos.domain;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.johnpoulakos.TextingApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TextingApplication.class)
public class MessageDaoTest {
	
	private MessageDao messageDao;		

	@Autowired
	public void setMessageDao(MessageDao messageDao){
		
		this.messageDao = messageDao;
		
	}
	
    @Test
    public void testSavingMessages(){    	
		
		Message message = new Message();
		message.setMessageText("First test message");		
		this.messageDao.save(message);
				
		Message confirmMessage = this.messageDao.findOne(message.getId());
		
		assertEquals(message.getMessageText(), confirmMessage.getMessageText());
		assertEquals(confirmMessage.getId(), message.getId());

    }
    
    @Test
    public void testCreatedTimeStampGenerated(){    	
		
		Message message = new Message();
		message.setMessageText("Test timestamp");		
		this.messageDao.save(message);
		
		Message confirmMessage = this.messageDao.findOne(message.getId());
		assertNotNull(confirmMessage.getCreateTimeStamp());
		
    }
	
	
	
}

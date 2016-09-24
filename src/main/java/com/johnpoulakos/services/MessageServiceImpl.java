package com.johnpoulakos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import com.johnpoulakos.domain.Message;
import com.johnpoulakos.domain.MessageDao;
import com.johnpoulakos.domain.MessageGroup;
import com.johnpoulakos.utils.MessageGroupBuilder;

@Service
public class MessageServiceImpl implements MessageService {
	
	private MessageDao messageDao;
	
    @Autowired
    public void setMessageDao(MessageDao messageDao) {
        this.messageDao = messageDao;
    }

	@Override
	public Message saveMessage(Message message) {
		
		 return messageDao.save(message);
	}
	
	@Override
	public  Iterable<Message> getAllMessages() {
		
		 return messageDao.findAll(new Sort(Sort.Direction.ASC, "createTimeStamp"));
	}		
	
	@Override
	public List<MessageGroup> getMessgeGroup(Iterable<Message> allMessages){	
		
		return MessageGroupBuilder.parseGroupMessage(allMessages);		
		
	}
	

	

}

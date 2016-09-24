package com.johnpoulakos.services;

import java.util.List;

import com.johnpoulakos.domain.Message;
import com.johnpoulakos.domain.MessageGroup;

public interface MessageService {
 
    Message saveMessage(Message message);
    
    Iterable<Message> getAllMessages();
    
    List<MessageGroup> getMessgeGroup(Iterable<Message> allMessages);


}

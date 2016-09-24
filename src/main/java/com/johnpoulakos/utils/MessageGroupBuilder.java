package com.johnpoulakos.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.johnpoulakos.domain.Message;
import com.johnpoulakos.domain.MessageGroup;

public class MessageGroupBuilder {
	
	
	public static List<MessageGroup> sortByUser(List<MessageGroup> messageGroupList){

		Collections.sort(messageGroupList, 
								(o1, o2) -> o1.getMessage().getUserName().compareTo(o2.getMessage().getUserName()));
		
		
		return messageGroupList;
	}
	
	
	public static List<MessageGroup> parseGroupMessage(Iterable<Message> allMessages){
		
		List<MessageGroup> messageGroupList = new ArrayList<MessageGroup>();
		
	    for (Message msg : allMessages) {	    
	    	
	    	if(msg.getReplyToTextId() == null){
	    		
	    		MessageGroup messageGroup = new MessageGroup();
	    		messageGroup.setMessage(msg);	 
	    		messageGroup.setReplies(new ArrayList<Message>());
	    		messageGroupList.add(messageGroup);
	    		
	    		
	    	} else {
	    		
	    		for(MessageGroup msgGp : messageGroupList){
	    			
	    			if(msgGp.getMessage().getId().equals(msg.getReplyToTextId())){
	    				
	    				msgGp.getReplies().add(msg);
	    				
	    			}
	    			
	    		}
	    		
	    	}	    		
	    }
		
		
		return messageGroupList;
		
		
	}


}

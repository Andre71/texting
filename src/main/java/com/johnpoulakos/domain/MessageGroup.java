package com.johnpoulakos.domain;

import java.util.List;

public class MessageGroup {
	
	private Message message;
	private List<Message> replies;
	
	public Message getMessage() {
		return message;
	}
	public void setMessage(Message message) {
		this.message = message;
	}
	public List<Message> getReplies() {
		return replies;
	}
	public void setReplies(List<Message> replies) {
		this.replies = replies;
	}

}

package com.johnpoulakos.domain;

import org.springframework.data.repository.CrudRepository;



public interface MessageDao  extends CrudRepository<Message, Integer>{}

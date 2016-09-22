package com.johnpoulakos.domain;


import org.springframework.data.repository.PagingAndSortingRepository;



public interface MessageDao extends PagingAndSortingRepository<Message, Integer>{}

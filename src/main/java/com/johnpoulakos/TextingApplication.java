package com.johnpoulakos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = { "com.johnpoulakos.controllers", "com.johnpoulakos.services"})
@SpringBootApplication
public class TextingApplication {

	public static void main(String[] args) {
		SpringApplication.run(TextingApplication.class, args);
	}
}

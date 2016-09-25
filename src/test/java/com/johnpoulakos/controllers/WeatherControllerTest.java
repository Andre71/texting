package com.johnpoulakos.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.johnpoulakos.TextingApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TextingApplication.class)
@WebAppConfiguration
public class WeatherControllerTest {

	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext webApplicationContext;

	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

	}

	@Test
	public void cityLookupReturnsOkStatus() throws Exception {

		mockMvc.perform(get("/cityLookup/Toronto")).andExpect(status().isOk());

	}

	@Test
	public void cityLookupReturns404WhenMissingCityParam() throws Exception {

		mockMvc.perform(get("/cityLookup/")).andExpect(status().isNotFound());

	}

	@Test
	public void weatherLookupReturnsOkStatus() throws Exception {

		mockMvc.perform(get("/weatherLookup?zmw=00000.1.71265")).andExpect(status().isOk());

	}

	@Test
	public void weatherLookupReturnsBadRequestWhenMissingZmwParam() throws Exception {

		mockMvc.perform(get("/weatherLookup")).andExpect(status().isBadRequest());

	}

}

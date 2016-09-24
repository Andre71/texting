package com.johnpoulakos.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class WeatherController {	

	@RequestMapping(value="/cityLookup/{city}", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody ResponseEntity<?> getPossibleCities(@PathVariable String city){			
				
		RestTemplate restTemplate = new RestTemplate();
		String reponse = restTemplate.getForObject("http://api.wunderground.com/api/44d4a5cf50e1b318/geolookup/conditions/forecast/q/"+city+".json", 
				String.class);		
		
		return new ResponseEntity<String>(reponse, HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/weatherLookup", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody ResponseEntity<?> getWeatherLookup(@RequestParam("zmw") String zmw){			
		System.out.println("http://api.wunderground.com/api/44d4a5cf50e1b318/geolookup/conditions/forecast/q/zmw:"+zmw+".json");
		RestTemplate restTemplate = new RestTemplate();
		String reponse = restTemplate.getForObject("http://api.wunderground.com/api/44d4a5cf50e1b318/geolookup/conditions/forecast/q/zmw:"+zmw+".json", 
				String.class);		
		
		return new ResponseEntity<String>(reponse, HttpStatus.OK);
		
	}


}

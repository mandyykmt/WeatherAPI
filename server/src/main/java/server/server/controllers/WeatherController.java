package server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import server.server.services.WeatherException;
import server.server.services.WeatherService;

@Controller
@ResponseBody
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class WeatherController {
  
    @Autowired
    private WeatherService weatherSvc;

    @GetMapping(path="/weather")
    public ResponseEntity<String> getWeather (
                @RequestParam String city,
                @RequestParam(defaultValue = "metric") String units) {
        
        try {
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
            weatherSvc.getWeather(city, units).stream()
                        .map(d -> Json.createObjectBuilder()
                                    .add("main", d.main())
                                    .add("description", d.description())
                                    .add("icon", d.icon())
                                    .build())
                        .forEach(arrayBuilder::add);
            return ResponseEntity.ok(arrayBuilder.build().toString());
                                   
        } catch (WeatherException ex) {
            return ResponseEntity.status(400)
                                .body(
                                    Json.createObjectBuilder()
                                        .add("error", ex.getMessage())
                                        .build().toString()
                                );
        }
        
    }
}

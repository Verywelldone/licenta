package jwtspring.controllers;

import jwtspring.models.DTO.SitterRequest;
import jwtspring.service.sitterRequest.SitterRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/sitter")
public class BecomeSitterController {


    @Autowired
    SitterRequestService sitterRequestService;

    @PostMapping(value = "/submit", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getBecomeHostRequest(@RequestBody SitterRequest sitterRequest){
        System.out.println();
        return sitterRequestService.saveSitterRequest(sitterRequest);
    }
}

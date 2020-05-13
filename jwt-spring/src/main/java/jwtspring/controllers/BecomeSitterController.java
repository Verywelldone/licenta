package jwtspring.controllers;

import jwtspring.models.SitterRequest;
import jwtspring.payload.response.MessageResponse;
import jwtspring.service.sitterRequest.SitterRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/sitter")
public class BecomeSitterController {


    @Autowired
    SitterRequestService sitterRequestService;

    @PostMapping(value = "/submit", consumes = "application/json", produces = "application/json")
    public ResponseEntity getBecomeHostRequest(@RequestBody SitterRequest sitterRequest){
        sitterRequestService.saveSitterRequest(sitterRequest);
        return  ResponseEntity.ok(new MessageResponse("A INTRAT AICI"));
    }
}

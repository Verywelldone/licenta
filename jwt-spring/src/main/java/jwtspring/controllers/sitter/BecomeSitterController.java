package jwtspring.controllers.sitter;

import jwtspring.models.DTO.sitter.SitterRequest;
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
        return sitterRequestService.saveSitterRequest(sitterRequest);
    }
}

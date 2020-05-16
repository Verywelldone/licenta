package jwtspring.controllers;

import jwtspring.models.SitterRequest;
import jwtspring.models.service.HostService;
import jwtspring.service.sitterRequest.SitterRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/sitter")
public class SitterController {

    @Autowired
    SitterRequestService sitterRequestService;

    @GetMapping("/info/{userId}")
    HostService getSitterInfo(@PathVariable(value = "userId") int userId) {

        return sitterRequestService.getSitterRequest(userId);
    }
}

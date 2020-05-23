package jwtspring.controllers.client;


import jwtspring.models.user.User;
import jwtspring.service.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("sitter-list")
    public List<User> getSitterList() {
        return clientService.getSitterList();
    }
}

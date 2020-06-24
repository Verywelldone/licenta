package jwtspring.controllers.client;


import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.user.User;
import jwtspring.service.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/pending-requests/{userId}")
    List<SitterOrdersModelDTO> getPendingRequests(@PathVariable(value = "userId") int userId) {
        return clientService.getPendingClientOrders(userId);
    }

    @GetMapping("/accepted-requests/{userId}")
    List<SitterOrdersModelDTO> getAcceptedRequests(@PathVariable(value = "userId") int userId) {
        return clientService.getAcceptedRequests(userId);
    }


    @GetMapping("/declined-requests/{userId}")
    List<SitterOrdersModelDTO> getDeclinedRequests(@PathVariable(value = "userId") int userId) {
        return clientService.getDeclinedRequests(userId);
    }

}

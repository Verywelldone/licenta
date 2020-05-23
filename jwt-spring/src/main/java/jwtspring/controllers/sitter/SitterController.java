package jwtspring.controllers.sitter;

import jwtspring.models.DTO.clientOrderDTO.ClientOrderDTO;
import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.order.ClientOrder;
import jwtspring.models.service.HostService;
import jwtspring.service.sitterRequest.SitterOrdersService;
import jwtspring.service.sitterRequest.SitterRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/sitter")
public class SitterController {

    @Autowired
    SitterRequestService sitterRequestService;

    @Autowired
    SitterOrdersService sitterOrdersService;

    @GetMapping("/info/{userId}")
    HostService getSitterInfo(@PathVariable(value = "userId") int userId) {
        return sitterRequestService.getSitterRequest(userId);
    }

    @GetMapping("/pending-requests/{userId}")
    List<SitterOrdersModelDTO> getPendingRequests(@PathVariable(value = "userId") int userId) {
        return sitterOrdersService.getPendingClientOrders(userId);
    }

    @GetMapping("/accepted-requests/{userId}")
    List<SitterOrdersModelDTO> getAcceptedRequests(@PathVariable(value = "userId") int userId) {
        return sitterOrdersService.getAcceptedRequests(userId);
    }


    @GetMapping("/declined-requests/{userId}")
    List<SitterOrdersModelDTO> getDeclinedRequests(@PathVariable(value = "userId") int userId) {
        return sitterOrdersService.getDeclinedRequests(userId);
    }


    @PostMapping("/accept-request")
    ResponseEntity acceptRequest(@RequestBody int serviceId) {
        return this.sitterOrdersService.acceptClientRequest(serviceId);
    }

    @PostMapping("/decline-request")
    ResponseEntity declineRequest(@RequestBody int serviceId) {
        return this.sitterOrdersService.declineClientRequest(serviceId);
    }

}

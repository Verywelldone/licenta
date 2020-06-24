package jwtspring.controllers.client;

import jwtspring.models.DTO.clientOrderDTO.ClientOrderDTO;
import jwtspring.service.clientOrder.ClientOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/client")
public class BecomeClientController {

    @Autowired
    ClientOrderService clientOrderService;

    @PostMapping("/sitter-request")
    public ResponseEntity submitSitterRequest(@RequestBody ClientOrderDTO clientOrderDTO) {


        return clientOrderService.saveClientOrder(clientOrderDTO);
    }
}

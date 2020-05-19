package jwtspring.service.clientOrder;

import jwtspring.models.DTO.clientOrderDTO.ClientOrderDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ClientOrderService {

    public ResponseEntity saveClientOrder(ClientOrderDTO clientOrderDTO);
}

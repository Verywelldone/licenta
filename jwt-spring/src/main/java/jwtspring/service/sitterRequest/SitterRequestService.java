package jwtspring.service.sitterRequest;

import jwtspring.models.DTO.SitterRequest;
import jwtspring.models.order.ClientOrder;
import jwtspring.models.service.HostService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@Service
public interface SitterRequestService {
    public ResponseEntity<?> saveSitterRequest(@RequestBody SitterRequest sitterRequest);
    public HostService getSitterRequest(int userId);

    ResponseEntity updateSitterRequest(int userId, SitterRequest sitterRequest);
}

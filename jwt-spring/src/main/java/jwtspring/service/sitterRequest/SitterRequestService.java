package jwtspring.service.sitterRequest;

import jwtspring.models.DTO.SitterRequest;
import jwtspring.models.service.HostService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface SitterRequestService {
    public ResponseEntity<?> saveSitterRequest(@RequestBody SitterRequest sitterRequest);
    public HostService getSitterRequest(int userId);
}

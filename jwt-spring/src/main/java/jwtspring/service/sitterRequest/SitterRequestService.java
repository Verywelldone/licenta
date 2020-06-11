package jwtspring.service.sitterRequest;

import jwtspring.models.DTO.sitter.SitterRequest;
import jwtspring.models.service.HostService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface SitterRequestService {
    ResponseEntity<?> saveSitterRequest(@RequestBody SitterRequest sitterRequest);

    HostService getSitterRequest(int userId);

    ResponseEntity updateSitterRequest(int userId, SitterRequest sitterRequest);
}

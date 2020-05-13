package jwtspring.service.sitterRequest;

import jwtspring.models.SitterRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public interface SitterRequestService {
    public void saveSitterRequest(@RequestBody SitterRequest sitterRequest);
}

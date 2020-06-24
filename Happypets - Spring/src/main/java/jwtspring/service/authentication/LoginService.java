package jwtspring.service.authentication;

import jwtspring.payload.request.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
public interface LoginService {
    ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest);
}

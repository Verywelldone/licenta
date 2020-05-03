package jwtspring.service.authentication;

import jwtspring.payload.request.SignupRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Service
public interface RegisterService {

    ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest);
}

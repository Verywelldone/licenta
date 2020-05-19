package appmarius.demo.service;

import appmarius.demo.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    public ResponseEntity registerUser(User user);
    public String loginUser(User user);

    class AuthServiceImpl {
    }
}

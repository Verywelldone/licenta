package appmarius.demo.service.serviceImpl;

import appmarius.demo.model.User;
import appmarius.demo.repository.UserRepository;
import appmarius.demo.service.AuthService;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity registerUser(User user) {
        System.out.println(user);
        if (userRepository.findUserByEmailAndPassword(user.getEmail(), user.getPassword()) != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already registered");
        else
            userRepository.save(user);
        return ResponseEntity.ok().body("User registered successfully!");
    }

    @Override
    public String loginUser(User user) {
        if (userRepository.findUserByEmailAndPassword(user.getEmail(), user.getPassword()) != null)
            return "User logged in successfully";
        else
            return "User not found!";
    }
}

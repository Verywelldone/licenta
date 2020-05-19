package appmarius.demo.controller;

import appmarius.demo.model.User;
import appmarius.demo.repository.UserRepository;
import appmarius.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    AuthService authService;

    @PostMapping(value = "register" , consumes= "application/json", produces = "application/json")
    public ResponseEntity register(@RequestBody User user) {
        System.out.println("User = " + user);
        return authService.registerUser(user);
    }

    @PostMapping(value = "login", consumes ="application/json",produces = "application/json")
    public String login(@RequestBody User user) {
        System.out.println("User = " + user);
        return authService.loginUser(user);
    }

}

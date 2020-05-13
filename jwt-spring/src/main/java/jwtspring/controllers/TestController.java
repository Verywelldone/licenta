package jwtspring.controllers;


import javassist.NotFoundException;
import jwtspring.models.user.User;
import jwtspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public String allAccess() {
        System.out.println(userRepository.findAll());
        return "Public Content.";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @GetMapping("/user-list")
    public ResponseEntity<List<User>> getAllUsers() throws NotFoundException {
        List<User> userList = userRepository.findAll();

        if (!userList.isEmpty()) {
            return ResponseEntity.ok().body(userList);
        } else {
            throw new NotFoundException("No users found!");
        }
    }

//    @GetMapping("/user-list")
//    @PreAuthorize("hasRole('USER')")
//    public List<User> getAllUsers(){
//        System.out.println(userRepository.findAll());
//        return null;
//    }
}
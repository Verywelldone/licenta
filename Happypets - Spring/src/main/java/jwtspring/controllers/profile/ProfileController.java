/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.controllers.profile;


import jwtspring.models.user.User;
import jwtspring.service.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/user")
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getUserProfile(@PathVariable(value = "username") String username) {
     return this.profileService.getUserProfile(username);
    }
}

/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.service.profile.profileServiceImp;

import jwtspring.models.user.User;
import jwtspring.repository.UserRepository;
import jwtspring.service.profile.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImp implements ProfileService {
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<User> getUserProfile(String username) {
        final User[] selectedUser = {new User()};
        Optional<User> user = userRepository.findByUsername(username);
        user.ifPresent(foundUser -> {
            selectedUser[0] = foundUser;
        });

        return ResponseEntity.ok(selectedUser[0]);
    }
}

/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.service.passwordReset.passwordResetImp;

import jwtspring.models.DTO.user.NewPasswordDTO;
import jwtspring.models.DTO.user.PasswordRecoveryDTO;
import jwtspring.models.user.User;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.UserRepository;
import jwtspring.service.passwordReset.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class PasswordResetServiceImp implements PasswordResetService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public ResponseEntity findByUsername(PasswordRecoveryDTO passwordRecoveryDTO) {
        Optional<User> user = userRepository.findByUsername(passwordRecoveryDTO.getRememberedField());
        AtomicInteger id = new AtomicInteger(-1);
        user.ifPresent(user1 -> {
            id.set(user1.getId());
        });

        if (id.intValue() > 0) {
            if (encoder.matches(passwordRecoveryDTO.getSecurityQuestion(), userRepository.findUserById(id.intValue()).getUserDetails().getSecurityQuestion()))
                return ResponseEntity.ok(id);
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Answers don't match");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No user found with provided username");
    }

    @Override
    public ResponseEntity findByEmail(PasswordRecoveryDTO passwordRecoveryDTO) {
        User user = userRepository.findByEmail(passwordRecoveryDTO.getRememberedField());

        if (user != null) {
            if (encoder.matches(passwordRecoveryDTO.getSecurityQuestion(), user.getUserDetails().getSecurityQuestion()))
                return ResponseEntity.ok(user.getId());
            else
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Answers don't match");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No user found with provided email");
    }

    @Override
    public ResponseEntity resetPassword(NewPasswordDTO newPasswordDTO) {

        User user = userRepository.findUserById(newPasswordDTO.getUserId());
        user.setPassword(encoder.encode(newPasswordDTO.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
    }
}

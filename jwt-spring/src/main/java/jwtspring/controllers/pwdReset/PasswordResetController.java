/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.controllers.pwdReset;

import jwtspring.models.DTO.user.NewPasswordDTO;
import jwtspring.models.DTO.user.PasswordRecoveryDTO;
import jwtspring.service.passwordReset.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/password-recovery")
public class PasswordResetController {

    @Autowired
    PasswordResetService passwordResetService;

    @PostMapping("/username")
    public ResponseEntity getUserIdByUsername(@RequestBody PasswordRecoveryDTO passwordRecoveryDTO) {
        return this.passwordResetService.findByUsername(passwordRecoveryDTO);
    }

    @PostMapping("/email")
    public ResponseEntity getUserIdByEmail(@RequestBody PasswordRecoveryDTO PasswordRecoveryDTO) {
        return passwordResetService.findByEmail(PasswordRecoveryDTO);
    }

    @PostMapping("/pwd-reset")
    public ResponseEntity resetPassword(@RequestBody NewPasswordDTO newPasswordDTO) {
        return passwordResetService.resetPassword(newPasswordDTO);
    }
}


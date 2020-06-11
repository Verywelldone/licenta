/*
 * Copyright (c) 2020. 
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.service.passwordReset;

import jwtspring.models.DTO.user.NewPasswordDTO;
import jwtspring.models.DTO.user.PasswordRecoveryDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface PasswordResetService {

    ResponseEntity findByUsername(PasswordRecoveryDTO passwordRecoveryDTO);

    ResponseEntity findByEmail(PasswordRecoveryDTO passwordRecoveryDTO);

    ResponseEntity resetPassword(NewPasswordDTO newPasswordDTO);
}

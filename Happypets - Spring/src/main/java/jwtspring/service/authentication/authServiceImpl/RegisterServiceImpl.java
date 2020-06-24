package jwtspring.service.authentication.authServiceImpl;

import jwtspring.models.user.User;
import jwtspring.models.user.UserAccountStatus;
import jwtspring.models.user.UserDetails;
import jwtspring.models.user.role.ERole;
import jwtspring.models.user.role.Role;
import jwtspring.payload.request.SignupRequest;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.RoleRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.authentication.RegisterService;
import jwtspring.service.emailsmtp.EmailSmtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    EmailSmtpService emailSmtpService;


    @Override
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getUserDetails(),
                signUpRequest.getUserAccountStatus()
        );

        try {
            emailSmtpService.sendRegisterEmail(signUpRequest);
        }catch (MailException e){
            e.printStackTrace();
            e.getCause();
        }

//        user.getUserDetails().setSecurityQuestion(encoder.encode(signUpRequest.getSecurityQuestion()));

//    Validare pentru @MapId @One-to-One
        UserDetails userDetails = signUpRequest.getUserDetails();

//        System.out.println(signUpRequest.getSecurityQuestion());
        System.out.println(signUpRequest.getUserDetails().toString());

        userDetails.setSecurityQuestion(encoder.encode(signUpRequest.getUserDetails().getSecurityQuestion()));
        userDetails.setUser(user);
        user.setUserDetails(userDetails);

//    Validare pentru @MapId @One-to-One
        UserAccountStatus userAccountStatus = signUpRequest.getUserAccountStatus();
        userAccountStatus.setUser(user);
        user.setUserAccountStatus(userAccountStatus);

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}

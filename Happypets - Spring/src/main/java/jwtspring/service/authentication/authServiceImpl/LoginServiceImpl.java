package jwtspring.service.authentication.authServiceImpl;

import jwtspring.models.user.User;
import jwtspring.payload.request.LoginRequest;
import jwtspring.payload.response.JwtResponse;
import jwtspring.repository.UserRepository;
import jwtspring.security.jwt.JwtUtils;
import jwtspring.service.authentication.LoginService;
import jwtspring.service.userDetails.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<?> authenticateUser(@Valid LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

//        userDetails.getUserAccountStatus().setLastLogin(date.getTime());
        List<String> roles = userDetails
                .getAuthorities()
                .stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

//        Set new Login Date
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy hh:mm");
        String lastLogin = format.format(new Date());

        User user = userRepository.findUserById(userDetails.getId());
        user.getUserAccountStatus().setLastLogin(lastLogin);
        userRepository.save(user);

        if (!user.getUserAccountStatus().getBanned()) {
            return ResponseEntity.ok(
                    new JwtResponse(
                            jwt,
                            userDetails.getId(),
                            userDetails.getUsername(),
                            userDetails.getEmail(),
                            roles,
                            userDetails.getUserDetails(),
                            userDetails.getUserAccountStatus()
                    ));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account is banned!");
        }

    }
}

package jwtspring.service.admin.adminImp;


import jwtspring.models.user.User;
import jwtspring.models.user.role.ERole;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.RoleRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImp implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<List<User>> getUserList() {
        List<User> userList = userRepository.findAllByRoles(roleRepository.findByName(ERole.ROLE_USER));
        return ResponseEntity.ok(userList);
    }

    @Override
    public ResponseEntity disableAccount(int userId) {
        User user = userRepository.findUserById(userId);
        user.getUserAccountStatus().setBanned(true);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Account disabled successfully!"));
    }

    @Override
    public ResponseEntity enableAccount(int userId) {
        User user = userRepository.findUserById(userId);
        user.getUserAccountStatus().setBanned(false);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Account enabled successfully!"));
    }

}

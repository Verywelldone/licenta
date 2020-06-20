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

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class AdminServiceImp implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public ResponseEntity<List<User>> getUserList() {
        List<User> userList = userRepository
                .findAllByRoles(roleRepository.findByName(ERole.ROLE_USER))
                .stream()
                .filter(user ->
                        user.getRoles()
                                .stream()
                                .allMatch(role -> !role.getName().equals(ERole.ROLE_ADMIN)))
                .collect(Collectors.toList());

//        List<User> test = new ArrayList<>();
//        for (User user : userList) {
//            AtomicBoolean admin = new AtomicBoolean(false);
//            user.getRoles().forEach(role -> {
//                if (role.getName().equals(ERole.ROLE_ADMIN))
//                    admin.set(true);
//            });
//            if (admin.get() == false)
//                test.add(user);
//        }

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

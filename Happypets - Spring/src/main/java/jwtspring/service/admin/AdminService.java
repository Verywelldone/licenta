package jwtspring.service.admin;

import jwtspring.models.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {

    ResponseEntity<List<User>> getUserList();

    ResponseEntity disableAccount(int userId);

    ResponseEntity enableAccount(int userId);
}

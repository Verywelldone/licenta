package jwtspring.service.admin;

import java.util.List;
import jwtspring.models.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {

    ResponseEntity<List<User>> getUserList();
}

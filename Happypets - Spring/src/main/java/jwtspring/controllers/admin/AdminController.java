package jwtspring.controllers.admin;

import jwtspring.models.user.User;
import jwtspring.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/user-list")
    public ResponseEntity<List<User>> getUserList() {
        return this.adminService.getUserList();
    }

    @PostMapping("/disable-account")
    public ResponseEntity disableAccount(@RequestBody int userId) {
        return this.adminService.disableAccount(userId);
    }

    @PostMapping("/enable-account")
    public ResponseEntity enableAccount(@RequestBody int userId) {
        return this.adminService.enableAccount(userId);
    }
}

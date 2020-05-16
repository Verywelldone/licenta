package jwtspring.service.client;

import java.util.List;
import jwtspring.models.user.User;
import org.springframework.stereotype.Service;

@Service
public interface ClientService {
    public List<User> getSitterList();
}

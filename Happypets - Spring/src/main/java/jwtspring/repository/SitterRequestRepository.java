package jwtspring.repository;

import jwtspring.models.service.HostService;
import jwtspring.models.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SitterRequestRepository extends JpaRepository<HostService, Integer> {

    HostService findHostServiceByUser(User user);
}

package jwtspring.repository;

import jwtspring.models.service.HostService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SitterRequestRepository extends JpaRepository<HostService, Integer> {
}

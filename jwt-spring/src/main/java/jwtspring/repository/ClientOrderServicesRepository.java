package jwtspring.repository;

import jwtspring.models.order.OrderServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOrderServicesRepository extends JpaRepository<OrderServices, Integer> {
}

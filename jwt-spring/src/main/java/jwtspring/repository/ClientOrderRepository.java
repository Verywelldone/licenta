package jwtspring.repository;

import jwtspring.models.order.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {
}

package jwtspring.repository;

import jwtspring.models.order.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {
    ClientOrder getClientOrderByFromClientAndToSitter(int client, int sitter);

    List<ClientOrder> getAllByFromClient(int client);
}

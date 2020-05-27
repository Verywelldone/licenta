package jwtspring.repository;

import java.util.List;
import jwtspring.models.order.ClientOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientOrderRepository extends JpaRepository<ClientOrder, Integer> {
    ClientOrder getClientOrderByFromClientAndToSitter(int client, int sitter);

    List<ClientOrder> getAllByFromClient(int client);
}

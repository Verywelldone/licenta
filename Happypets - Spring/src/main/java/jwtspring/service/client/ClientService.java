package jwtspring.service.client;

import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {
    List<User> getSitterList();

    List<SitterOrdersModelDTO> getPendingClientOrders(int userId);

    List<SitterOrdersModelDTO> getAcceptedRequests(int userId);

    List<SitterOrdersModelDTO> getDeclinedRequests(int userId);
}

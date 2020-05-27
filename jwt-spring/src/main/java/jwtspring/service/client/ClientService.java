package jwtspring.service.client;

import java.util.List;

import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.user.User;
import org.springframework.stereotype.Service;

@Service
public interface ClientService {
    public List<User> getSitterList();

    List<SitterOrdersModelDTO> getPendingClientOrders(int userId);

    List<SitterOrdersModelDTO> getAcceptedRequests(int userId);

    List<SitterOrdersModelDTO> getDeclinedRequests(int userId);
}

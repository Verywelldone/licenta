package jwtspring.service.sitterRequest;

import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SitterOrdersService {

    List<SitterOrdersModelDTO> getPendingClientOrders(int userId);

    ResponseEntity acceptClientRequest(int serviceId);

    ResponseEntity declineClientRequest(int serviceId);

    List<SitterOrdersModelDTO> getAcceptedRequests(int userId);

    List<SitterOrdersModelDTO> getDeclinedRequests(int userId);
}

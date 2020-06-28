package jwtspring.service.sitterRequest.sitterRequestImp;

import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.order.ClientOrder;
import jwtspring.repository.ClientOrderRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.sitterRequest.SitterOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SitterOrdersServiceImp implements SitterOrdersService {

    @Autowired
    ClientOrderRepository clientOrderRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<SitterOrdersModelDTO> getPendingClientOrders(int userId) {
        List<ClientOrder> allClientOrders = clientOrderRepository.findAll();

        List<SitterOrdersModelDTO> sitterOrdersModelDTOS = new ArrayList<>();

        allClientOrders.forEach(clientOrder -> {
            if (clientOrder.getToSitter() == userId &&
                    !clientOrder.getOrderDetails().getDecline() &&
                    !clientOrder.getOrderDetails().getAccepted() &&
                    !clientOrder.getOrderDetails().getCanceled()) {
                extractedMethod(sitterOrdersModelDTOS, clientOrder);
            }

        });

        return sitterOrdersModelDTOS;
    }

    @Override
    public List<SitterOrdersModelDTO> getAcceptedRequests(int userId) {
        List<ClientOrder> allClientOrders = clientOrderRepository.findAll();

        List<SitterOrdersModelDTO> sitterOrdersModelDTOS = new ArrayList<>();

        allClientOrders.forEach(clientOrder -> {
            if (clientOrder.getToSitter() == userId &&
                    !clientOrder.getOrderDetails().getDecline() &&
                    clientOrder.getOrderDetails().getAccepted() &&
                    !clientOrder.getOrderDetails().getCanceled()) {
                extractedMethod(sitterOrdersModelDTOS, clientOrder);
            }

        });

        return sitterOrdersModelDTOS;
    }

    @Override
    public List<SitterOrdersModelDTO> getDeclinedRequests(int userId) {
        List<ClientOrder> allClientOrders = clientOrderRepository.findAll();

        List<SitterOrdersModelDTO> sitterOrdersModelDTOS = new ArrayList<>();

        allClientOrders.forEach(clientOrder -> {
            if (clientOrder.getToSitter() == userId &&
                    clientOrder.getOrderDetails().getDecline() &&
                    !clientOrder.getOrderDetails().getAccepted() &&
                    !clientOrder.getOrderDetails().getCanceled()) {
                extractedMethod(sitterOrdersModelDTOS, clientOrder);
            }

        });

        return sitterOrdersModelDTOS;
    }

    private void extractedMethod(List<SitterOrdersModelDTO> sitterOrdersModelDTOS, ClientOrder clientOrder) {
        SitterOrdersModelDTO sitterOrdersModelDTO = new SitterOrdersModelDTO();

        sitterOrdersModelDTO.setId(clientOrder.getId());

        sitterOrdersModelDTO.setFromClient(userRepository.findUserById(clientOrder.getFromClient()).getUserDetails());
        sitterOrdersModelDTO.setToSitter(userRepository.findUserById(clientOrder.getToSitter()).getUserDetails());

        sitterOrdersModelDTO.setStartDate(clientOrder.getOrderDetails().getStartDate());
        sitterOrdersModelDTO.setEndDate(clientOrder.getOrderDetails().getEndDate());
        sitterOrdersModelDTO.setCreatedAt(clientOrder.getOrderDetails().getCreatedAt());

        sitterOrdersModelDTO.setOrderServicesSet(clientOrder.getOrderDetails().getOrderServices());

        sitterOrdersModelDTOS.add(sitterOrdersModelDTO);
    }

    @Override
    public ResponseEntity acceptClientRequest(int serviceId) {

        Optional<ClientOrder> clientOrder = this.clientOrderRepository.findById(serviceId);
        clientOrder.ifPresent(order -> {
            order.getOrderDetails().setAccepted(true);
            clientOrderRepository.save(order);
        });

        return ResponseEntity.ok().body("Request Accepted");
    }

    @Override
    public ResponseEntity cancelAccept(int serviceId) {

        Optional<ClientOrder> clientOrder = this.clientOrderRepository.findById(serviceId);
        clientOrder.ifPresent(order -> {
            order.getOrderDetails().setAccepted(false);
            clientOrderRepository.save(order);
        });

        return ResponseEntity.ok().body("Request returned to Pending");
    }

    @Override
    public ResponseEntity declineClientRequest(int serviceId) {
        Optional<ClientOrder> clientOrder = this.clientOrderRepository.findById(serviceId);
        clientOrder.ifPresent(order -> {
            order.getOrderDetails().setDecline(true);
            clientOrderRepository.save(order);
        });
        return ResponseEntity.ok().body("Request Declined");
    }
}

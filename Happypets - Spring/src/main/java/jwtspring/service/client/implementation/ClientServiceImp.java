package jwtspring.service.client.implementation;

import jwtspring.models.DTO.clientOrderDTO.SitterOrdersModelDTO;
import jwtspring.models.order.ClientOrder;
import jwtspring.models.user.User;
import jwtspring.repository.ClientOrderRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientServiceImp implements ClientService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClientOrderRepository clientOrderRepository;

    @Override
    public List<User> getSitterList() {
        List<User> userList = userRepository.findAll();

        List<User> sitterList = new ArrayList<>();
        for (User user : userList) {
            if (user.getHostService() != null && user.getHostService().isActive())
                sitterList.add(user);
        }

        return sitterList;
    }

    @Override
    public List<SitterOrdersModelDTO> getPendingClientOrders(int userId) {
        List<ClientOrder> clientOrderList = clientOrderRepository.getAllByFromClient(userId);
        List<SitterOrdersModelDTO> pendingOrders = new ArrayList<>();
        clientOrderList
                .stream()
                .filter(clientOrder -> !clientOrder.getOrderDetails().getAccepted() && !clientOrder.getOrderDetails().getDecline())
                .forEach(clientOrder -> extractedMethod(pendingOrders, clientOrder));

        return pendingOrders;
    }

    @Override
    public List<SitterOrdersModelDTO> getAcceptedRequests(int userId) {
        List<ClientOrder> clientOrderList = clientOrderRepository.getAllByFromClient(userId);
        List<SitterOrdersModelDTO> acceptedRequests = new ArrayList<>();

        clientOrderList
                .stream()
                .filter(clientOrder -> clientOrder.getOrderDetails().getAccepted() && !clientOrder.getOrderDetails().getDecline())
                .forEach(clientOrder ->
                        extractedMethod(acceptedRequests, clientOrder));
        return acceptedRequests;
    }

    @Override
    public List<SitterOrdersModelDTO> getDeclinedRequests(int userId) {
        List<ClientOrder> clientOrderList = clientOrderRepository.getAllByFromClient(userId);
        List<SitterOrdersModelDTO> declinedRequests = new ArrayList<>();
        clientOrderList
                .stream()
                .filter(clientOrder -> !clientOrder.getOrderDetails().getAccepted() && clientOrder.getOrderDetails().getDecline())
                .forEach(clientOrder -> extractedMethod(declinedRequests, clientOrder));

        return declinedRequests;
    }


    private void extractedMethod(List<SitterOrdersModelDTO> pendingOrders, ClientOrder clientOrder) {
        SitterOrdersModelDTO sitterOrdersModelDTO = new SitterOrdersModelDTO();
        sitterOrdersModelDTO.setFromClient(userRepository.findUserById(clientOrder.getFromClient()).getUserDetails());
        sitterOrdersModelDTO.setToSitter(userRepository.findUserById(clientOrder.getToSitter()).getUserDetails());
        sitterOrdersModelDTO.setStartDate(clientOrder.getOrderDetails().getStartDate());
        sitterOrdersModelDTO.setEndDate(clientOrder.getOrderDetails().getEndDate());
        sitterOrdersModelDTO.setOrderServicesSet(clientOrder.getOrderDetails().getOrderServices());
        sitterOrdersModelDTO.setCreatedAt(clientOrder.getOrderDetails().getCreatedAt());
        pendingOrders.add(sitterOrdersModelDTO);
    }

}

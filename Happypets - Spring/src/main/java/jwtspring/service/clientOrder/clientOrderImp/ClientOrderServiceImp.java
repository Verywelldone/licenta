package jwtspring.service.clientOrder.clientOrderImp;


import jwtspring.models.DTO.sitter.ServiceArray;
import jwtspring.models.DTO.clientOrderDTO.ClientOrderDTO;
import jwtspring.models.order.ClientOrder;
import jwtspring.models.order.OrderDetails;
import jwtspring.models.order.OrderServices;
import jwtspring.models.service.ServiceModel;
import jwtspring.repository.ClientOrderRepository;
import jwtspring.repository.ClientOrderServicesRepository;
import jwtspring.repository.ServiceRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.clientOrder.ClientOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClientOrderServiceImp implements ClientOrderService {

    @Autowired
    ClientOrderServicesRepository clientOrderServicesRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private ClientOrderRepository clientOrderRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    @Override
    public ResponseEntity saveClientOrder(ClientOrderDTO clientOrderDTO) {

        if (clientOrderRepository
                .getClientOrderByFromClientAndToSitter(clientOrderDTO.getFromClient(), clientOrderDTO.getToSitter()) != null) {
            return ResponseEntity.unprocessableEntity().body("You already have an order placed for this sitter!");

        } else {

            List<ServiceModel> serviceModels = serviceRepository.findAllByHostServices(userRepository.findUserById(clientOrderDTO.getToSitter()).getHostService());

            if (!Collections.disjoint(serviceModels, clientOrderDTO.getServices())) {
                return ResponseEntity.unprocessableEntity().body("Siiter no longer have these services displayed. Please refresh the page!");
            }
//        Client Order Block
            ClientOrder clientOrder = new ClientOrder();

            clientOrder.setFromClient(clientOrderDTO.getFromClient());
            clientOrder.setToSitter(clientOrderDTO.getToSitter());

            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setStartDate(clientOrderDTO.getStartDate());
            orderDetails.setEndDate(clientOrderDTO.getEndDate());
            orderDetails.setAccepted(false);
            orderDetails.setDecline(false);
            orderDetails.setCanceled(false);
            orderDetails.setCreatedAt(new Date());

            Set<ServiceArray> ordersFromClient = clientOrderDTO.getServices();
            Set<OrderServices> orderServicesSet = new HashSet<>();

            ordersFromClient.forEach(service -> {
                OrderServices orderService = new OrderServices();
                orderService.setName(service.getName());
                orderService.setPrice(service.getPrice());

                orderServicesSet.add(orderService);
            });
            orderDetails.setOrderServices(orderServicesSet);

            orderDetails.setOrder(clientOrder);
            clientOrder.setOrderDetails(orderDetails);

            clientOrderRepository.save(clientOrder);
            orderServicesSet.forEach(orderService -> {
                orderService.setOrderDetails(orderDetails);
                clientOrderServicesRepository.save(orderService);
            });


            return new ResponseEntity("Order saved successfully!", HttpStatus.OK);
        }
    }
}

package jwtspring.service.clientOrder.clientOrderImp;

import jwtspring.models.DTO.ServiceArray;
import jwtspring.models.DTO.clientOrderDTO.ClientOrderDTO;
import jwtspring.models.order.ClientOrder;
import jwtspring.models.order.OrderDetails;
import jwtspring.models.order.OrderServices;
import jwtspring.models.service.ServiceModel;
import jwtspring.repository.ClientOrderRepository;
import jwtspring.repository.ClientOrderServicesRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.clientOrder.ClientOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ClientOrderServiceImp implements ClientOrderService {

    @Autowired
    private ClientOrderRepository clientOrderRepository;

    @Autowired
    ClientOrderServicesRepository clientOrderServicesRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity saveClientOrder(ClientOrderDTO clientOrderDTO) {

//        Client Order Block
        ClientOrder clientOrder = new ClientOrder();

        clientOrder.setFromClient(clientOrderDTO.getFromClient());
        clientOrder.setToSitter(clientOrderDTO.getToSitter());

        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setStartDate(clientOrderDTO.getEndDate());
        orderDetails.setEndDate(clientOrderDTO.getEndDate());
        orderDetails.setAccepted(false);
        orderDetails.setDecline(false);

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


        return ResponseEntity.ok().body("Order saved successfully!");
    }
}

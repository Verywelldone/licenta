package jwtspring.service.sitterRequest.sitterRequestImp;

import jwtspring.models.DTO.ServiceArray;
import jwtspring.models.DTO.SitterRequest;
import jwtspring.models.service.HostService;
import jwtspring.models.service.ServiceModel;
import jwtspring.models.user.User;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.ServiceRepository;
import jwtspring.repository.SitterRequestRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.sitterRequest.SitterRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class SitterRequestServiceImp implements SitterRequestService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    SitterRequestRepository sitterRequestRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Override
    public ResponseEntity<?> saveSitterRequest(SitterRequest sitterRequest) {
        User user = userRepository.findUserById(sitterRequest.getUserId());

        System.out.println(sitterRequest.toString());
        String animalType = Arrays.toString(sitterRequest.getAnimalType());
        animalType = animalType.replace("[", "");
        animalType = animalType.replace("]", "");

        String dogSize = Arrays.toString(sitterRequest.getDogSizeArray());

        dogSize = dogSize.replace("[", "");
        dogSize = dogSize.replace("]", "");

        System.out.println(dogSize);
        System.out.println(animalType);

        HostService hostService = new HostService();
        hostService.setAnimalType(animalType);
        hostService.setDogSize(dogSize);
        hostService.setHouseType(sitterRequest.getPlaceToLive());
        hostService.setOtherPets(sitterRequest.getOtherPets());

        hostService.setActive(true);

        ArrayList<ServiceArray> servicesFromRequest = sitterRequest.getServiceArray();
        Set<ServiceModel> serviceModels = new HashSet<>();

        servicesFromRequest.forEach(serv -> {
            ServiceModel serviceModel = new ServiceModel();
            serviceModel.setName(serv.getName());
            serviceModel.setPrice(serv.getPrice());


            serviceModels.add(serviceModel);
        });
        hostService.setServiceModelSet(serviceModels);

        user.setHostService(hostService);
        hostService.setUser(user);


        sitterRequestRepository.save(hostService);
        serviceModels.forEach(serviceModel -> {
            serviceModel.setHostServices(hostService);
            serviceRepository.save(serviceModel);
        });

        return ResponseEntity.ok(new MessageResponse("User is now sitter"));
    }

    @Override
    public HostService getSitterRequest(int userId) {
        User user = userRepository.findUserById(userId);

        return user.getHostService();
    }
}

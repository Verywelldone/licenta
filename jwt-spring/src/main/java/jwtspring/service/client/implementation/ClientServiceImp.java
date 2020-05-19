package jwtspring.service.client.implementation;

import java.util.List;

import jwtspring.models.user.User;
import jwtspring.repository.UserRepository;
import jwtspring.service.client.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClientServiceImp implements ClientService {

    @Autowired
    UserRepository userRepository;

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

}

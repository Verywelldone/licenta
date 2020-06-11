package jwtspring.repository;


import jwtspring.models.service.HostService;
import jwtspring.models.service.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {

    void deleteAllByHostServices(HostService hostService);

    List<ServiceModel> findAllByHostServices(HostService hostService);
}

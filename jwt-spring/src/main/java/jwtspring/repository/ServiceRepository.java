package jwtspring.repository;


import java.util.List;
import jwtspring.models.service.HostService;
import jwtspring.models.service.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {

    public void deleteAllByHostServices(HostService hostService);

    public List<ServiceModel> findAllByHostServices(HostService hostService);
}

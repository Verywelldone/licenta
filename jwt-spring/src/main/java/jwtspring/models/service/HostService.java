package jwtspring.models.service;

import jwtspring.models.user.User;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "host_service")
public class HostService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String animalType;

    @Column
    private String dogSize;

    @Column
    private String houseType;

    @Column
    private String otherPets;

    @Column
    private boolean isActive;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_serviceid")
//    private Service service;

    @OneToMany(mappedBy = "hostServices")
    private Set<ServiceModel> serviceModelSet;

//    @OneToOne(mappedBy = "hostService")
//    private User host;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private User user;

    public String getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }

    public String getDogSize() {
        return dogSize;
    }

    public void setDogSize(String dogSize) {
        this.dogSize = dogSize;
    }

    public String getHouseType() {
        return houseType;
    }

    public void setHouseType(String houseType) {
        this.houseType = houseType;
    }

    public String getOtherPets() {
        return otherPets;
    }

    public void setOtherPets(String otherPets) {
        this.otherPets = otherPets;
    }

    public Set<ServiceModel> getServiceModelSet() {
        return serviceModelSet;
    }

    public void setServiceModelSet(Set<ServiceModel> serviceModelSet) {
        this.serviceModelSet = serviceModelSet;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }
}

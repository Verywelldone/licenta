package jwtspring.models.service;

import javax.persistence.*;

@Entity
@Table(name = "service")
public class ServiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private int price;

    @ManyToOne
    @JoinColumn(name = "host_serviceId", nullable = false)
    private HostService hostServices;

    public ServiceModel() {
    }

    public ServiceModel(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public void setHostServices(HostService hostServices) {
        this.hostServices = hostServices;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

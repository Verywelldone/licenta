package jwtspring.models.DTO.clientOrderDTO;

import jwtspring.models.DTO.ServiceArray;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class ClientOrderDTO {

    private int id;

    private int fromClient;
    private int toSitter;

    private Date startDate;
    private Date endDate;

    private Set<ServiceArray> services;

    public int getFromClient() {
        return fromClient;
    }

    public void setFromClient(int fromClient) {
        this.fromClient = fromClient;
    }

    public int getToSitter() {
        return toSitter;
    }

    public void setToSitter(int toSitter) {
        this.toSitter = toSitter;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Set<ServiceArray> getServices() {
        return services;
    }

    public void setServices(Set<ServiceArray> services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "ClientOrderDTO{" +
                "fromClient=" + fromClient +
                ", toSitter=" + toSitter +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", services=" + services +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

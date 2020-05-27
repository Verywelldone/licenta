package jwtspring.models.DTO.clientOrderDTO;

import jwtspring.models.order.OrderServices;
import jwtspring.models.user.User;
import jwtspring.models.user.UserDetails;

import java.util.Date;
import java.util.Set;

public class SitterOrdersModelDTO {

    private int id;

    UserDetails fromClient;
    UserDetails toSitter;

    Date startDate;
    Date endDate;

    Set<OrderServices> orderServicesSet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserDetails getFromClient() {
        return fromClient;
    }

    public void setFromClient(UserDetails fromClient) {
        this.fromClient = fromClient;
    }

    public UserDetails getToSitter() {
        return toSitter;
    }

    public void setToSitter(UserDetails toSitter) {
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

    public Set<OrderServices> getOrderServicesSet() {
        return orderServicesSet;
    }

    public void setOrderServicesSet(Set<OrderServices> orderServicesSet) {
        this.orderServicesSet = orderServicesSet;
    }

    @Override
    public String toString() {
        return "SitterOrdersModel{" +
                "fromUser=" + fromClient +
                ", toUser=" + toSitter +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", orderServicesSet=" + orderServicesSet +
                '}';
    }
}

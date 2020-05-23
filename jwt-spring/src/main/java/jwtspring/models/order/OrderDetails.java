package jwtspring.models.order;

import jwtspring.models.service.ServiceModel;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String startDate;

    @Column
    private String endDate;

    @Column
    private Boolean isAccepted;

    @Column
    private Boolean isDecline;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private ClientOrder order;

    @OneToMany(mappedBy = "orderDetails")
    private Set<OrderServices> orderServices;

    public Set<OrderServices> getOrderServices() {
        return orderServices;
    }

    public void setOrderServices(Set<OrderServices> orderServices) {
        this.orderServices = orderServices;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

//    public ClientOrder getOrder() {
//        return order;
//    }

    public void setOrder(ClientOrder order) {
        this.order = order;
    }

    public Boolean getAccepted() {
        return isAccepted;
    }

    public void setAccepted(Boolean accepted) {
        isAccepted = accepted;
    }

    public Boolean getDecline() {
        return isDecline;
    }

    public void setDecline(Boolean decline) {
        isDecline = decline;
    }

    @Override
    public String toString() {
        return "OrderDetails{" +
                "id=" + id +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", orderServices=" + orderServices +
                '}';
    }
}

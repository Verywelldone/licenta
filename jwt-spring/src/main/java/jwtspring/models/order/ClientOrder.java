package jwtspring.models.order;

import jwtspring.models.user.UserDetails;

import javax.persistence.*;

@Entity
@Table
public class ClientOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int fromClient;

    @Column
    private int toSitter;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private OrderDetails orderDetails;

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

    public OrderDetails getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetails orderDetails) {
        this.orderDetails = orderDetails;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", fromClient=" + fromClient +
                ", toSitter=" + toSitter +
                ", orderDetails=" + orderDetails +
                '}';
    }
}

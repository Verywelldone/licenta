package jwtspring.models.order;

import javax.persistence.*;

@Table(name = "order_comments")
@Entity
public class OrderComments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String orderId;

    @Column
    private int fromUserId;

    @Column
    private String date;

    @Column
    private String message;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private ClientOrder clientOrder;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(int fromUserId) {
        this.fromUserId = fromUserId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

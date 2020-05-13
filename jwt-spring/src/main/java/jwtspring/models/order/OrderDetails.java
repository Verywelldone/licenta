package jwtspring.models.order;

import javax.persistence.*;

@Entity
@Table(name = "order_details")
public class OrderDetails {

    // id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String orderId;

    //    service type
    @Column
    private String service;

    //    start date
    @Column
    private String startDate;

    //    end date
    @Column
    private String endDate;

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

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
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
}

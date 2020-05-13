package jwtspring.models.order;


import javax.persistence.*;

@Entity
@Table(name = "client_order")
public class ClientOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    //    sursa
    @Column (name = "source_user")
    private int sourceUser;

    //    destinatie
    @Column (name = "destination_user")
    private int destinationUser;


    public int getId() {
        return orderId;
    }

    public void setId(int id) {
        this.orderId = id;
    }

    public int getSourceUser() {
        return sourceUser;
    }

    public void setSourceUser(int sourceUser) {
        this.sourceUser = sourceUser;
    }

    public int getDestinationUser() {
        return destinationUser;
    }

    public void setDestinationUser(int destinationUser) {
        this.destinationUser = destinationUser;
    }

    public ClientOrder() {
    }

    public ClientOrder(int id, int sourceUser, int destinationUser) {
        this.orderId = id;
        this.sourceUser = sourceUser;
        this.destinationUser = destinationUser;
    }
}

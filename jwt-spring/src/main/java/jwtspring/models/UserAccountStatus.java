package jwtspring.models;

import javax.persistence.*;

@Entity
@Table(name = "user_status")
public class UserAccountStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_statusid;
    @Column
    private String isActive;
    @Column
    private String isBanned;
    @Column
    private String isHost;
    @Column
    private String isClient;
    @OneToOne(mappedBy = "userAccountStatus")
    private User user;

    public int getUser_statusid() {
        return user_statusid;
    }

    public void setUser_statusid(int user_statusid) {
        this.user_statusid = user_statusid;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public String getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(String isBanned) {
        this.isBanned = isBanned;
    }

    public String getIsHost() {
        return isHost;
    }

    public void setIsHost(String isHost) {
        this.isHost = isHost;
    }

    public String getIsClient() {
        return isClient;
    }

    public void setIsClient(String isClient) {
        this.isClient = isClient;
    }

}

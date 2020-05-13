package jwtspring.models.user;

import javax.persistence.*;

@Entity
@Table(name = "user_status")
public class UserAccountStatus {

    @Id
   // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String lastLogin;

    @Column
    private String createdAt;

    @Column
    private String updatedAt;

    @Column
    private Boolean isConfirmed;

    @Column
    private Boolean isBanned;

//    @OneToOne(mappedBy = "userAccountStatus")
//    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    public int getUser_statusid() {
        return id;
    }

    public void setUser_statusid(int user_statusid) {
        this.id = user_statusid;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getConfirmed() {
        return isConfirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        isConfirmed = confirmed;
    }

    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }
}

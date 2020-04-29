package jwtspring.models;

import javax.persistence.*;

@Table(name = "user_coordinates")
@Entity
public class UserCoordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_coordinatesid;

    @Column
    private String latitude;

    @Column
    private String longitude;

    @OneToOne(mappedBy = "userCoordinates")
    private UserDetails userDetails;

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public int getUser_coordinatesid() {
        return user_coordinatesid;
    }

    public void setUser_coordinatesid(int user_coordinatesid) {
        this.user_coordinatesid = user_coordinatesid;
    }
//
//    public UserDetails getUserDetails() {
//        return userDetails;
//    }
//
//    public void setUserDetails(UserDetails userDetails) {
//        this.userDetails = userDetails;
//    }
}

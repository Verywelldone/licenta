package jwtspring.models.user;

import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class UserDetails {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private User user;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_coordinatesid")
    private UserCoordinates userCoordinates;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_profileImage")
    private UserProfileImage profileImage;

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserProfileImage getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(UserProfileImage profileImage) {
        this.profileImage = profileImage;
    }

    public UserCoordinates getUserCoordinates() {
        return userCoordinates;
    }

    public void setUserCoordinates(UserCoordinates userCoordinates) {
        this.userCoordinates = userCoordinates;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", userCoordinates=" + userCoordinates +
                ", profileImage=" + profileImage +
                '}';
    }
}
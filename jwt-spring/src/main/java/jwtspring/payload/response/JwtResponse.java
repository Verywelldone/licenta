package jwtspring.payload.response;

import jwtspring.models.UserAccountStatus;
import jwtspring.models.UserDetails;

import java.util.List;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private UserDetails userData;
    private UserAccountStatus userStatus;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, UserDetails userDetails, UserAccountStatus userAccountStatus) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.userData = userDetails;
        this.userStatus = userAccountStatus;
    }

    public UserAccountStatus getUserAccountStatus() {
        return userStatus;
    }

    public void setUserAccountStatus(UserAccountStatus userAccountStatus) {
        this.userStatus = userAccountStatus;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public UserDetails getUserDetails() {
        return userData;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userData = userDetails;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public UserDetails getUserData() {
        return userData;
    }

    public void setUserData(UserDetails userData) {
        this.userData = userData;
    }

    public UserAccountStatus getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserAccountStatus userStatus) {
        this.userStatus = userStatus;
    }
}

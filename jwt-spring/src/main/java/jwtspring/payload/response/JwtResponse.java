package jwtspring.payload.response;

import jwtspring.models.service.HostService;
import jwtspring.models.user.UserAccountStatus;
import jwtspring.models.user.UserDetails;

import java.util.List;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private int id;
    private String username;
    private String email;
    private List<String> roles;
    private UserDetails userData;
    private UserAccountStatus userStatus;
    private HostService hostService;

    public JwtResponse(String accessToken, int id, String username, String email, List<String> roles, UserDetails userDetails, UserAccountStatus userAccountStatus, HostService hostService) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.userData = userDetails;
        this.userStatus = userAccountStatus;
        this.hostService = hostService;
    }

    public JwtResponse(String accessToken, int id, String username, String email, List<String> roles, UserDetails userDetails, UserAccountStatus userAccountStatus) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.userData = userDetails;
        this.userStatus = userAccountStatus;
    }

    public HostService getHostService() {
        return hostService;
    }

    public void setHostService(HostService hostService) {
        this.hostService = hostService;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public void setRoles(List<String> roles) {
        this.roles = roles;
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

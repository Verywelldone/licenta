/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.models.DTO.user;

import jwtspring.models.user.UserDetails;
import jwtspring.models.user.UserProfileImage;

public class UserRatingDTO {

    private UserDetails fromUser;

    private UserProfileImage fromUserProfileImage;

    private UserDetails toUser;

    private int stars;

    private String message;

    private String rateDate;

    public UserDetails getFromUser() {
        return fromUser;
    }

    public void setFromUser(UserDetails fromUser) {
        this.fromUser = fromUser;
    }

    public UserProfileImage getFromUserProfileImage() {
        return fromUserProfileImage;
    }

    public void setFromUserProfileImage(UserProfileImage fromUserProfileImage) {
        this.fromUserProfileImage = fromUserProfileImage;
    }

    public UserDetails getToUser() {
        return toUser;
    }

    public void setToUser(UserDetails toUser) {
        this.toUser = toUser;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRateDate() {
        return rateDate;
    }

    public void setRateDate(String rateDate) {
        this.rateDate = rateDate;
    }
}

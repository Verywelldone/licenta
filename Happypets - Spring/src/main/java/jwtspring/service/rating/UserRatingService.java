/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.service.rating;

import jwtspring.models.user.UserRating;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserRatingService {

    public ResponseEntity<List<UserRating>> getAllUserRatings(int userId);

    ResponseEntity saveRating(UserRating userRating);
}

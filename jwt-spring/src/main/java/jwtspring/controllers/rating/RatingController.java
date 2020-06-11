/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.controllers.rating;

import jwtspring.models.user.UserRating;
import jwtspring.service.rating.UserRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/user")
public class RatingController {

    @Autowired
    UserRatingService userRatingService;

    @GetMapping("/get-ratings/{userId}")
    public ResponseEntity<List<UserRating>> getAllUserRatings(@PathVariable(value = "userId") int userId) {
        return this.userRatingService.getAllUserRatings(userId);
    }

    @PostMapping("/save-rating")
    public ResponseEntity saveRating(@RequestBody UserRating userRating) {
        return this.userRatingService.saveRating(userRating);
    }

}

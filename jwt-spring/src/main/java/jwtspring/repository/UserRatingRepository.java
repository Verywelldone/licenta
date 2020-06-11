/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.repository;

import jwtspring.models.user.UserRating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRatingRepository extends JpaRepository<UserRating, Integer> {

    List<UserRating> getAllByToUser(int toUser);
}

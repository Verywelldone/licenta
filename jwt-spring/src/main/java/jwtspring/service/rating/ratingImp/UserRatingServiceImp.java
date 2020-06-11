/*
 * Copyright (c) 2020.
 * @Fatu Ionut Bogdan
 * This project is for educational purpose only!
 * It serves only as a Bachelor's Thesis
 */

package jwtspring.service.rating.ratingImp;

import jwtspring.models.DTO.user.UserRatingDTO;
import jwtspring.models.user.UserRating;
import jwtspring.repository.UserRatingRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.rating.UserRatingService;
import jwtspring.service.userImg.UserImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserRatingServiceImp implements UserRatingService {

    @Autowired
    UserRatingRepository userRatingRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserImgService userImgService;

    @Override
    public ResponseEntity getAllUserRatings(int userId) {
        List<UserRatingDTO> userRatingDTOList = new ArrayList<>();

        List<UserRating> userRatings = userRatingRepository.getAllByToUser(userId);
        userRatings.forEach(userRating -> {
            try {
            UserRatingDTO userRatingDTO = new UserRatingDTO();
            userRatingDTO.setFromUser(userRepository.findUserById(userRating.getFromUser()).getUserDetails());
            userRatingDTO.setFromUserProfileImage(userImgService.getImage(userRating.getFromUser()));


            userRatingDTO.setStars(userRating.getStars());
            userRatingDTO.setMessage(userRating.getMessage());
            userRatingDTO.setRateDate(userRating.getRateDate());
            userRatingDTO.setToUser(userRepository.findUserById(userRating.getToUser()).getUserDetails());



            userRatingDTOList.add(userRatingDTO);
            } catch (IOException e) {
                e.printStackTrace();
            }

        });

        return ResponseEntity.ok(userRatingDTOList);
    }

    @Override
    public ResponseEntity saveRating(UserRating userRating) {
        this.userRatingRepository.save(userRating);
        return ResponseEntity.ok("User rating saved!");
    }
}

package jwtspring.repository;

import jwtspring.models.user.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ImageRepository extends JpaRepository<UserProfileImage, Long> {
    Optional<UserProfileImage> findByName(String name);
}
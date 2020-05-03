package jwtspring.repository;

import java.util.Optional;
import jwtspring.models.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepository extends JpaRepository<UserProfileImage, Long> {
    Optional<UserProfileImage> findByName(String name);
}
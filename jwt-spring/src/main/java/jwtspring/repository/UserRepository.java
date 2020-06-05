package jwtspring.repository;

import jwtspring.models.user.User;
import jwtspring.models.user.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User findUserById(int id);

    List<User> findAllByRoles(Optional<Role> role);
}

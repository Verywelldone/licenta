package appmarius.demo.repository;

import appmarius.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findUserByEmailAndPassword(String userEmail, String userPassword);
}

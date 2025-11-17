package AUTH.SERVICE.AUTH_SERVICE.repo;

import AUTH.SERVICE.AUTH_SERVICE.model.UserC;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;



public interface UserRepository extends JpaRepository<UserC, Long> {
    Optional<UserC> findByEmail(String email);
}
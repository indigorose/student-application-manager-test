package com.studentappmanager.backend.user;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, Long> {

    Optional<User> findById(Long id);

    // Find by email method
    Optional<User> findByEmail(String email);

    // Find by role
    List<User> findByRole(Role role);

}

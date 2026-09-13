package com.studentappmanager.backend.user;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, Long> {

    // List all users
    List<User> findAll();

    // List all active users
    List<User> findByIsActiveTrue();

    // Find by Id
    Optional<User> findById(Long id);

    // Find by email method
    Optional<User> findByEmailAndIsActiveTrue(String email);

    // Find by role
    List<User> findByRoleAndIsActiveTrue(Role role);

}

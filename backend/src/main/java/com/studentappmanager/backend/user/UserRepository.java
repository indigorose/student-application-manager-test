package com.studentappmanager.backend.user;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, Long> {

    List<User> findByIsActiveTrue();

    Optional<User> findByIdAndIsActive(Long id);

    // Find by email method
    Optional<User> findByEmailAndIsActive(String email);

    // Find by role
    List<User> findByRoleAndIsActive(Role role);

}

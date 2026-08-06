package com.studentappmanager.backend.user;

// import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import java.util.List;

public interface UserRepository extends ListCrudRepository<User, Long> {

    // Find by email method
    List<User> findByEmail(String email);

    // Find by role
    List<User> findByRole(Role role);

}

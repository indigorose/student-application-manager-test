package com.studentappmanager.backend.student;

import org.springframework.data.repository.ListCrudRepository;
import java.util.Optional;

public interface StudentRepository extends ListCrudRepository<Student, Long> {
    // Find by first name

    Optional<Student> findByUserId(Long userId);

}

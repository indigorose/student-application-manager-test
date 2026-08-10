package com.studentappmanager.backend.tutor;

import org.springframework.data.repository.ListCrudRepository;
import java.util.Optional;

public interface TutorRepository extends ListCrudRepository<Tutor, Long> {
    // Find by first name

    Optional<Tutor> findByUserId(Long userId);

}

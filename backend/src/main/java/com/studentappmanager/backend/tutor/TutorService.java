package com.studentappmanager.backend.tutor;

// import java.time.LocalDate;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.user.User;
import com.studentappmanager.backend.user.UserRepository;

@Service
public class TutorService {
    private final TutorRepository tutorRepository;
    private final UserRepository userRepository;

    public TutorService(TutorRepository tutorRepository, UserRepository userRepository) {
        this.tutorRepository = tutorRepository;
        this.userRepository = userRepository;
    };

    // Create Tutor

    public Tutor createStudentProfile(Long userId, String firstName, String lastName, String department) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No user with id " + userId));

        Tutor tutor = new Tutor(user, firstName, lastName, department);
        return tutorRepository.save(tutor);
    }

    public Tutor getByUserId(Long userId) {
        return tutorRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));
    }

}

package com.studentappmanager.backend.user;

import java.util.List;
import java.util.NoSuchElementException;
// import java.util.UUID;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.studentappmanager.backend.student.StudentRepository;
import com.studentappmanager.backend.tutor.TutorRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TutorRepository tutorRepository;
    private final StudentRepository studentRepository;

    public UserService(UserRepository userRepository, TutorRepository tutorRepository,
            StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.tutorRepository = tutorRepository;
        this.studentRepository = studentRepository;
    }

    // List all the users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // List users by role
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    // Find user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("User not found with email: " + email));
    }

    // Find a single user by id
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    }

    // Create a User
    public User createUser(User user) {
        try {
            return userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Could not save User: " + user, e);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException("Could not save User due to concurrent: " + user, e);
        }
    }

    // Update a user email and password
    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException(
                "User not found with id:" + id));
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        return userRepository.save(existingUser);
    }

    // Delete a User
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));

        studentRepository.findByUserId(id).ifPresent(studentRepository::delete);
        tutorRepository.findByUserId(id).ifPresent(tutorRepository::delete);

        userRepository.delete(user);
    }

}

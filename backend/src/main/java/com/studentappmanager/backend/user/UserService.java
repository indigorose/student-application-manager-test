package com.studentappmanager.backend.user;

import java.util.List;
import java.util.NoSuchElementException;
// import java.util.UUID;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // List all the users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Find a single user by id
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    }

    // Find by single email
    // public User getUserByEmailUser(String email) {
    // return userRepository.findByEmail(email);
    // }

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

    // Update a User email and password
    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException(
                "User not found with id:" + id));
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setUpdatedAt(updatedUser.getUpdatedAt());
        return userRepository.save(existingUser);
    }

    // Delete a User
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

}

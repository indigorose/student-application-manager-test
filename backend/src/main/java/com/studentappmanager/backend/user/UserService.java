package com.studentappmanager.backend.user;

import java.util.List;
import java.util.NoSuchElementException;

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
        return userRepository.findByIsActiveTrue();
    }

    // List users by role
    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRoleAndIsActiveTrue(role);
    }

    // Find user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmailAndIsActiveTrue(email)
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

    // Soft delete a User (deactivate)
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
        user.setIsActive(false);
        userRepository.save(user);
    }

    // Reactive a user
    public void reactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));

        user.setIsActive(true);
        userRepository.save(user);
    }

}

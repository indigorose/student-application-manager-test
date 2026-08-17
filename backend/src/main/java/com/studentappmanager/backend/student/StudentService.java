package com.studentappmanager.backend.student;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.user.User;
import com.studentappmanager.backend.user.UserRepository;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentService(StudentRepository studentRepository, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    };

    // List all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Create Student

    public Student createStudentProfile(Long userId, String firstName, String lastName,
            LocalDate dob, String phone, String address) {
        if (studentRepository.findByUserId(userId).isPresent()) {
            throw new IllegalStateException("Student profile already exists for user " + userId);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No user with id " + userId));

        Student student = new Student(user, firstName, lastName, dob, phone, address);
        return studentRepository.save(student);
    }

    public Student getByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));
    }

}

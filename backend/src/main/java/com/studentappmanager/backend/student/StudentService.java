package com.studentappmanager.backend.student;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.user.Role;
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

    // Find a single student by id
    public Student getByUserId(Long userId) {
        return studentRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + userId));
    }
    // Create a Student

    public Student createStudentProfile(Long userId, String firstName, String lastName,
            LocalDate dob, String phone, String address) {
        if (studentRepository.findByUserId(userId).isPresent()) {
            throw new IllegalStateException("Student profile already exists for user " + userId);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("No user with id " + userId));
        if (!user.getIsActive()) {
            throw new IllegalStateException("Cannot create a profile for deactivated user: " + userId);
        }
        if (user.getRole() != Role.STUDENT) {
            throw new IllegalStateException("User " + userId + " has role " + user.getRole() + " expected STUDENT.");
        }
        Student student = new Student(user, firstName, lastName, dob, phone, address);
        return studentRepository.save(student);
    }

    // Update a Student
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(() -> new NoSuchElementException(
                "student not found with id: " + id));
        existingStudent.setUser(updatedStudent.getUser());
        existingStudent.setFirstName(updatedStudent.getFirstName());
        existingStudent.setLastName(updatedStudent.getLastName());
        existingStudent.setDob(updatedStudent.getDob());
        existingStudent.setPhone(updatedStudent.getPhone());
        existingStudent.setAddress(updatedStudent.getAddress());
        return studentRepository.save(existingStudent);
    }

}

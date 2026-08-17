package com.studentappmanager.backend.student;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin // Helps with CORS errors, helps the browsers recognise the ports
@RestController
@RequestMapping("api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // List all students
    @GetMapping("")
    public ResponseEntity<List<Student>> getAllUsers() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // Create(POST) add new student
    @PostMapping("/{userId}")
    public ResponseEntity<Student> create(@PathVariable Long userId, @RequestBody StudentRequest request) {
        try {
            Student student = studentService.createStudentProfile(
                    userId, request.firstName(), request.lastName(), request.dob(), request.phone(), request.address());
            return ResponseEntity.ok(student);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    // Get single student by id
    @GetMapping("/{userId}")
    public Student get(@PathVariable Long userId) {
        try {
            return studentService.getByUserId(userId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    public record StudentRequest(String firstName, String lastName, LocalDate dob, String phone, String address) {
    }

}

package com.studentappmanager.backend.student_applications;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.studentappmanager.backend.course.Course;
import com.studentappmanager.backend.student.Student;

@CrossOrigin
@RestController
@RequestMapping("api/student-applications")
public class StudentApplicationController {
    public final StudentApplicationService studentApplicationService;

    public StudentApplicationController(StudentApplicationService studentApplicationService) {
        this.studentApplicationService = studentApplicationService;
    }

    // Get all the student applications
    @GetMapping
    public ResponseEntity<List<StudentApplication>> getAllStudentApplications() {
        return ResponseEntity.ok(studentApplicationService.getAllStudentApplications());
    }

    // Get a single student applications by student applications id
    @GetMapping("/{id}")
    public StudentApplication getStudentApplication(@PathVariable Long applicationId) {
        try {
            return studentApplicationService.getById(applicationId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Create(POST)a new student application
    @PostMapping("/{userId}")
    public ResponseEntity<StudentApplication> addStudentApplication(@PathVariable Long applicationId,
            @RequestBody StudentApplicationRequest request) {
        try {
            StudentApplication studentApplication = studentApplicationService.addStudentApplication(
                    request.applicationId(), request.student(), request.course(), request.status(),
                    request.personalStatement());
            return ResponseEntity.ok(studentApplication);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    // Update(PUT) a single course
    @PutMapping("/{id}")
    public StudentApplication updateStudentApplication(@PathVariable Long id,
            @RequestBody StudentApplication updatedStudentApplication) {
        try {
            return studentApplicationService.updateStudentApplication(id, updatedStudentApplication);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Delete a single StudentApplication
    @DeleteMapping("/{id}")
    public void deleteStudentApplication(@PathVariable Long id) {
        try {
            studentApplicationService.deleteStudentApplication(id);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    public record StudentApplicationRequest(Long applicationId, Student student, Course course, Status status,
            String personalStatement) {
    }
}

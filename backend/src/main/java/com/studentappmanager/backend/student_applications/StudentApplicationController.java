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

import com.studentappmanager.backend.student_applications.StudentApplicationService.StatusUpdateRequest;
import com.studentappmanager.backend.student_applications.StudentApplicationService.StudentApplicationRequest;
import org.springframework.web.bind.annotation.RequestParam;

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

    // Get List of applications by student Id
    @GetMapping(params = "studentUserId")
    public ResponseEntity<List<StudentApplication>> getByStudent(@RequestParam Long studentUserId) {
        return ResponseEntity.ok(studentApplicationService.getStudentApplicationsByStudent(studentUserId));
    }

    // Get list of applications by course id
    @GetMapping(params = "courseId")
    public ResponseEntity<List<StudentApplication>> getByCourse(@RequestParam Long courseId) {
        return ResponseEntity.ok(studentApplicationService.getStudentApplicationsByCourse(courseId));
    }

    // Get a single student applications by student application's id
    @GetMapping("/{applicationId}")
    public StudentApplication getStudentApplication(@PathVariable Long applicationId) {
        try {
            return studentApplicationService.getById(applicationId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Create(POST)a new student application
    @PostMapping
    public ResponseEntity<StudentApplication> addStudentApplication(
            @RequestBody StudentApplicationRequest request) {
        try {
            return new ResponseEntity<>(studentApplicationService.addStudentApplication(request), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    // Update(PUT) an application by status
    @PutMapping("/{applicationId}/status")
    public StudentApplication updateStudentApplication(@PathVariable Long applicationId,
            @RequestBody StatusUpdateRequest request) {
        try {
            return studentApplicationService.updateStudentApplicationStatus(applicationId, request);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Update application by the student
    @PutMapping("/{applicationId}")
    public StudentApplication updateStudentApplication(@PathVariable Long applicationId,
            @RequestBody StudentApplicationRequest request) {
        try {
            return studentApplicationService.updateStudentApplication(applicationId, request);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Delete a single StudentApplication
    @DeleteMapping("/{applicationId}")
    public void deleteStudentApplication(@PathVariable Long applicationId) {
        try {
            studentApplicationService.deleteStudentApplication(applicationId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

}

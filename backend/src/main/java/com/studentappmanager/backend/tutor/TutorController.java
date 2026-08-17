package com.studentappmanager.backend.tutor;

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

@CrossOrigin
@RestController
@RequestMapping("api/tutors")
public class TutorController {
    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    // Get all the tutors
    @GetMapping()
    public ResponseEntity<List<Tutor>> getAllTutors() {
        return ResponseEntity.ok(tutorService.getAllTutors());
    }

    // Create(POST) add new tutor
    @PostMapping("/{userId}")
    public ResponseEntity<Tutor> create(@PathVariable Long userId, @RequestBody TutorRequest request) {
        try {
            Tutor tutor = tutorService.createStudentProfile(
                    userId, request.firstName(), request.lastName(), request.department());
            return ResponseEntity.ok(tutor);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    // Get single tutor by id
    @GetMapping("/{userId}")
    public Tutor get(@PathVariable Long userId) {
        try {
            return tutorService.getByUserId(userId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    public record TutorRequest(String firstName, String lastName, String department) {
    }

}

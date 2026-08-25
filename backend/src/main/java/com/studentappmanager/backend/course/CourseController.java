package com.studentappmanager.backend.course;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.studentappmanager.backend.course.CourseService.CourseRequest;

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
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
@RequestMapping("api/courses")
public class CourseController {
    public final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Get all the courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    // Get courses by tutor id
    @GetMapping(params = "tutorUserId")
    public ResponseEntity<List<Course>> getByTutor(@RequestParam Long tutorUserId) {
        return ResponseEntity.ok(courseService.getCoursesByTutor(tutorUserId));
    }

    // Get a single course by course id
    @GetMapping("/{courseId}")
    public Course getCourse(@PathVariable Long courseId) {
        try {
            return courseService.getCourse(courseId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Create(POST)a new course
    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody CourseRequest request) {
        try {
            return new ResponseEntity<>(courseService.addCourse(request), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (OptimisticLockingFailureException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    // Update(PUT) a single course
    @PutMapping("/{courseId}")
    public Course updateCourse(@PathVariable Long courseId, @RequestBody CourseRequest request) {
        try {
            return courseService.updateCourse(courseId, request);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    // Delete a single course
    @DeleteMapping("/{courseId}")
    public void deleteCourse(@PathVariable Long courseId) {
        try {
            courseService.deleteCourse(courseId);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

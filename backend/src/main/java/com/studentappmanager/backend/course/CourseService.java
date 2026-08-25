package com.studentappmanager.backend.course;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.tutor.Tutor;
import com.studentappmanager.backend.tutor.TutorRepository;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final TutorRepository tutorRepository;

    public CourseService(CourseRepository courseRepository, TutorRepository tutorRepository) {
        this.courseRepository = courseRepository;
        this.tutorRepository = tutorRepository;
    }

    // List all the courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Find by Course Id
    public Course getCourse(Long courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found with id: " + courseId));
    }

    // List courses by Tutor User Id
    public List<Course> getCoursesByTutor(Long tutorUserId) {
        return courseRepository.findByTutorUserId(tutorUserId);
    }

    // Create a course
    public Course addCourse(CourseRequest request) {
        Tutor tutor = tutorRepository.findByUserId(request.tutorUserId())
                .orElseThrow(() -> new NoSuchElementException("No tutor with id: " + request.tutorUserId));
        Course course = new Course(tutor, request.title(), request.description(), request.category(),
                request.capacity(), request.startDate());
        return courseRepository.save(course);
    }

    // Update a course
    public Course updateCourse(Long courseId, CourseRequest request) {
        Course existingCourse = courseRepository.findById(
                courseId).orElseThrow(
                        () -> new NoSuchElementException(
                                "Course not found with Course id: " + courseId));
        Tutor tutor = tutorRepository.findByUserId(request.tutorUserId())
                .orElseThrow(() -> new NoSuchElementException("No tutor with id: " + request.tutorUserId));
        existingCourse.setTutor(tutor);
        existingCourse.setTitle(request.title());
        existingCourse.setDescription(request.description());
        existingCourse.setCategory(request.category());
        existingCourse.setCapacity(request.capacity());
        existingCourse.setStartDate(request.startDate());
        return courseRepository.save(existingCourse);
    }

    // Delete a course
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new NoSuchElementException("Course not found with course id: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    public record CourseRequest(Long tutorUserId, String title, String description, String category, Integer capacity,
            LocalDate startDate) {
    };
}

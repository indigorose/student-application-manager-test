package com.studentappmanager.backend.course;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
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

    // Create a course
    public Course addCourse(Course course) {
        try {
            return courseRepository.save(course);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Could not save course: " + course, e);
        } catch (OptimisticLockingFailureException e) {
            throw new OptimisticLockingFailureException("Could not save course due to concurrent: " + course, e);
        }
    }

    // Update a course
    public Course updateCourse(Long courseId, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(
                courseId).orElseThrow(
                        () -> new NoSuchElementException(
                                "Course not found with Course id: " + courseId));
        existingCourse.setTutor(updatedCourse.getTutor());
        existingCourse.setTitle(updatedCourse.getTitle());
        existingCourse.setDescription(updatedCourse.getDescription());
        existingCourse.setCategory(updatedCourse.getCategory());
        existingCourse.setCapacity(updatedCourse.getCapacity());
        existingCourse.setStartDate(updatedCourse.getStartDate());
        return courseRepository.save(existingCourse);
    }

    // Delete a course
    public void deleteCourse(Long courseId) {
        if (!courseRepository.existsById(courseId)) {
            throw new NoSuchElementException("Course not found with course id: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

}

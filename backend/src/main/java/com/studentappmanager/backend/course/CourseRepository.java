package com.studentappmanager.backend.course;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface CourseRepository extends ListCrudRepository<Course, Long> {

    // List courses by tutor
    List<Course> findByTutorUserId(Long tutorUserId);
}
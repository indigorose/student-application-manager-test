package com.studentappmanager.backend.student_applications;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface StudentApplicationRepository extends ListCrudRepository<StudentApplication, Long> {

    List<StudentApplication> findByStudentId(Long studentUserId);

    List<StudentApplication> findByCourseId(Long courseId);

}

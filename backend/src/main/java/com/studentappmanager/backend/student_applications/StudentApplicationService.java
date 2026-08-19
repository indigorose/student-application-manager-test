package com.studentappmanager.backend.student_applications;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.course.Course;
import com.studentappmanager.backend.student.Student;
import com.studentappmanager.backend.student.StudentRepository;

@Service
public class StudentApplicationService {
    private final StudentApplicationRepository studentApplicationRepository;

    public StudentApplicationService(StudentApplicationRepository studentApplicationRepository,
            StudentRepository studentRepository) {
        this.studentApplicationRepository = studentApplicationRepository;
    }

    // List all applications
    public List<StudentApplication> getAllStudentApplications() {
        return studentApplicationRepository.findAll();
    }

    // Get student application by application id
    public StudentApplication getById(Long applicationId) {
        return studentApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Application not found with application id: " + applicationId));
    }

    // Add student application
    public StudentApplication addStudentApplication(Long applicationId, Student student, Course course, Status status,
            String personalStatement) {

        if (studentApplicationRepository.findById(applicationId).isPresent()) {
            throw new IllegalStateException(
                    "Student's application already exists for application id: " + applicationId);
        }

        StudentApplication studentApplication = new StudentApplication(student, course, status, personalStatement);
        return studentApplicationRepository.save(studentApplication);
    }

    // Update student application
    public StudentApplication updateStudentApplication(Long applicationId,
            StudentApplication updatedStudentApplication) {
        StudentApplication existingStudentApplication = studentApplicationRepository.findById(
                applicationId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Application not found with application id: " + applicationId));
        existingStudentApplication.setStudent(updatedStudentApplication.getStudent());
        existingStudentApplication.setCourse(updatedStudentApplication.getCourse());
        existingStudentApplication.setStatus(updatedStudentApplication.getStatus());
        existingStudentApplication.setPersonalStatement(updatedStudentApplication.getPersonalStatement());
        return studentApplicationRepository.save(existingStudentApplication);
    }

    // Delete a student application
    public void deleteStudentApplication(Long applicationId) {
        if (!studentApplicationRepository.existsById(applicationId)) {
            throw new NoSuchElementException("Student application not found for application id: " + applicationId);
        }
        studentApplicationRepository.deleteById(applicationId);
    }

}

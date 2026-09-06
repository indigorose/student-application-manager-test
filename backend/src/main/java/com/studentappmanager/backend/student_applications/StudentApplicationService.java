package com.studentappmanager.backend.student_applications;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.studentappmanager.backend.course.Course;
import com.studentappmanager.backend.course.CourseRepository;
import com.studentappmanager.backend.student.Student;
import com.studentappmanager.backend.student.StudentRepository;

@Service
public class StudentApplicationService {

    private final StudentApplicationRepository studentApplicationRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public StudentApplicationService(StudentApplicationRepository studentApplicationRepository,
            StudentRepository studentRepository, CourseRepository courseRepository) {
        this.studentApplicationRepository = studentApplicationRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
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

    // List applications by Student Id
    public List<StudentApplication> getStudentApplicationsByStudent(Long studentUserId) {
        return studentApplicationRepository.findByStudentId(studentUserId);
    }

    // List applications by Course Id
    public List<StudentApplication> getStudentApplicationsByCourse(Long courseId) {
        return studentApplicationRepository.findByCourseId(courseId);
    }

    // List applications by Tutor Id
    public List<StudentApplication> getStudentApplicationsByTutor(Long tutorUserId) {
        return studentApplicationRepository.findByCourse_Tutor_User_Id(tutorUserId);
    }

    // Add student application
    public StudentApplication addStudentApplication(StudentApplicationRequest request) {
        Student student = studentRepository.findByUserId(request.studentUserId())
                .orElseThrow(() -> new NoSuchElementException("No student with id:" + request.studentUserId()));
        if (!student.getUser().getIsActive()) {
            throw new IllegalStateException("Student account is deactivated.");
        }
        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new NoSuchElementException("No student with id:" + request.studentUserId()));
        StudentApplication studentApplication = new StudentApplication(student, course, Status.DRAFT,
                request.personalStatement());
        return studentApplicationRepository.save(studentApplication);
    }

    // Draft application update
    public StudentApplication submitDraft(Long applicationId) {
        StudentApplication application = getById(applicationId);
        if (application.getStatus() != Status.DRAFT) {
            throw new IllegalStateException(
                    " Only a draft application can be submitted. - Current status: "
                            + application.getStatus());
        }
        application.setStatus(Status.SUBMITTED);
        return studentApplicationRepository.save(application);
    }

    // Return a submitted application back to draft status
    public StudentApplication returnToDraft(Long applicationId) {
        StudentApplication application = getById(applicationId);
        if (application.getStatus() != Status.SUBMITTED) {
            throw new IllegalStateException(
                    " Only a submitted application can be reverted back to draft status. - Current status: "
                            + application.getStatus());
        }
        application.setStatus(Status.DRAFT);
        return studentApplicationRepository.save(application);
    }

    // Update student application's status by the tutor
    public StudentApplication updateStudentApplicationStatus(Long applicationId,
            StatusUpdateRequest request) {
        StudentApplication application = getById(applicationId);
        Status previousStatus = application.getStatus();

        if (request.status == Status.APPROVED && previousStatus != Status.APPROVED) {
            Course course = application.getCourse();
            if (course.getCapacity() <= 0) {
                throw new IllegalStateException("Cannot approve - course is at full capacity.");
            }
            course.setCapacity(course.getCapacity() - 1);
            courseRepository.save(course);
        }

        application.setStatus(request.status());
        // Check and update review dates
        if (request.status() == Status.APPROVED || request.status() == Status.REJECTED) {
            application.setReviewedAt(LocalDateTime.now());
        }
        return studentApplicationRepository.save(application);
    }

    // Update application by the student
    public StudentApplication updateStudentApplication(Long applicationId, StudentApplicationRequest request) {
        StudentApplication existingStudentApplication = studentApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new NoSuchElementException(
                        "Application not found with application id: " + applicationId));
        existingStudentApplication.setPersonalStatement(request.personalStatement());
        return studentApplicationRepository.save(existingStudentApplication);
    }

    // Delete a student application
    public void deleteStudentApplication(Long applicationId) {
        // Check application status
        StudentApplication application = getById(applicationId);

        if (application.getStatus() != Status.DRAFT) {
            throw new IllegalStateException("Cannot delete application once it has been submitted - Current Status: "
                    + application.getStatus());
        }
        studentApplicationRepository.deleteById(applicationId);
    }

    public record StudentApplicationRequest(Long studentUserId, Long courseId, String personalStatement) {
    };

    public record StatusUpdateRequest(Status status) {
    }
}

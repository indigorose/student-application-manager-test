CREATE TABLE applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    module_id BIGINT NOT NULL,
    status ENUM(
        'DRAFT',
        'SUBMITTED',
        'UNDER_REVIEW',
        'APPROVED',
        'REJECTED'
    ) NOT NULL DEFAULT 'DRAFT',
    personal_statement TEXT,
    submitted_at TIMESTAMP NULL,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_application_student FOREIGN KEY (student_id) REFERENCES students (id),
    CONSTRAINT fk_application_module FOREIGN KEY (module_id) REFERENCES modules (id)
);
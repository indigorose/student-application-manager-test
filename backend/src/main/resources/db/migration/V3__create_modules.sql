CREATE TABLE modules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tutor_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    capacity INT DEFAULT 30,
    start_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_module_tutor FOREIGN KEY (tutor_id) REFERENCES tutors (id)
);
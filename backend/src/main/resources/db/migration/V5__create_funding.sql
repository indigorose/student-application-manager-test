CREATE TABLE funding_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    application_id BIGINT NOT NULL UNIQUE,
    sponsor_id BIGINT NOT NULL,
    amount_requested DECIMAL(10, 2) NOT NULL,
    amount_approved DECIMAL(10, 2),
    status ENUM(
        'PENDING',
        'APPROVED',
        'DECLINED',
        'PARTIAL'
    ) NOT NULL DEFAULT 'PENDING',
    sponsor_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_funding_application FOREIGN KEY (application_id) REFERENCES applications (id),
    CONSTRAINT fk_funding_sponsor FOREIGN KEY (sponsor_id) REFERENCES sponsors (id)
);
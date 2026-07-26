CREATE TABLE payment_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    raised_by BIGINT NOT NULL,
    recipient_type ENUM('SPONSOR', 'STUDENT') NOT NULL,
    recipient_id BIGINT NOT NULL,
    funding_request_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM(
        'ISSUED',
        'ACKNOWLEDGED',
        'PAID'
    ) NOT NULL DEFAULT 'ISSUED',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    CONSTRAINT fk_payment_raised_by FOREIGN KEY (raised_by) REFERENCES users (id),
    CONSTRAINT fk_payment_funding_request FOREIGN KEY (funding_request_id) REFERENCES funding_requests (id)
);

CREATE TABLE audit_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    changed_by BIGINT NOT NULL,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_audit_user FOREIGN KEY (changed_by) REFERENCES users (id)
);
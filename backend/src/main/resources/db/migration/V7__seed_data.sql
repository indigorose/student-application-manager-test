-- One user per role (passwords are BCrypt hash of "password123")
INSERT INTO
    users (email, password, role)
VALUES (
        'student@test.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
        'STUDENT'
    ),
    (
        'tutor@test.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
        'TUTOR'
    ),
    (
        'sponsor@test.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
        'SPONSOR'
    ),
    (
        'admin@test.com',
        '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.',
        'ADMIN'
    );
-- Profiles
INSERT INTO
    students (
        user_id,
        first_name,
        last_name,
        dob,
        phone
    )
VALUES (
        1,
        'Leah',
        'Easton',
        '2000-05-15',
        '07700900001'
    );

INSERT INTO
    tutors (
        user_id,
        first_name,
        last_name,
        department
    )
VALUES (
        2,
        'Dr. Alan',
        'Brook',
        'Business Development'
    );

INSERT INTO
    sponsors (
        user_id,
        organisation_name,
        contact_name,
        total_budget,
        remaining_budget
    )
VALUES (
        3,
        'Walker Industries Ltd',
        'Carol Raymond',
        50000.00,
        50000.00
    );

-- Module
INSERT INTO
    modules (
        tutor_id,
        title,
        description,
        category,
        capacity,
        start_date
    )
VALUES (
        1,
        'Intro to Leadership',
        'Fundamentals of Business Leadership',
        'Business',
        25,
        '2026-09-01'
    );

-- Application
INSERT INTO
    applications (
        student_id,
        module_id,
        status,
        personal_statement,
        submitted_at
    )
VALUES (
        1,
        1,
        'SUBMITTED',
        'I am passionate about learning to lead teams to productive outcomes.',
        NOW()
    );

-- Funding request
INSERT INTO
    funding_requests (
        application_id,
        sponsor_id,
        amount_requested,
        status
    )
VALUES (1, 1, 2500.00, 'PENDING');
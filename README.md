# Student Application Manager

## Contents

- [Introduction](#introduction)
- [Teck Stack](#tech-stack)
- [Demo](#how-the-demo-works)
- [Data Model](#data-model)

## Introduction

A demo application modeling teh core workflow of a student application system: a **student** applies to a **Course**, a **Tutor** reviews and approves/rejects it and an **Admin** oversees all users and activity.
This build intentionally has **no authentication**. It's designed to demonstrate the interaction between role - the frontend includes a role switcher so you can view the app as any Student, Tutor or Admin without logging in.

## Tech Stack

| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| Backend           | Java, Spring Boot, Spring Data JPA |
| Database          | MySQL, Flyway migrations           |
| Frontend          | React, Typescript, Vite            |
| UI                | Chakra UI                          |
| API documentation | springdoc-openapi (Swagger UI)     |

## How the Demo works

There is no login, instead:

1. The home page provides a **role selector** (Student / Tutor / Admin)
2. Choosing Student or Tutor opens a **picker** listing every active user with that role, fetched live from the backend.
3. Selecting a person opens their dashboard, "acting as" that user for the rest of the session.
4. Admin has no picker - there is only one admin view, showing everything across the system.

This lets you demonstrate the full loop in the one browser tab: create/submit an application as one student, switch to a tutor and approve/reject it as well as create/withdraw courses, switch to admin and see it reflected everywhere.

## Data Model

``` ASCII
users (id, email, password, role, is_active, created_at, updated_at)
  │
  ├── students (id, user_id → users.id, first_name, last_name, dob, phone, address)
  ├── tutors   (id, user_id → users.id, first_name, last_name, department)
  └── (admin has no separate profile table - role alone is sufficient)

courses (id, tutor_id → tutors.id, title, description, category, capacity, start_date)
applications (id, student_id → students.id, module_id → course.id, status, personal_statement, submitted_at, reviewed_at)

```

`students`, `tutors` and `applications` all have their **own** auto-increment primary key, separate from the `user_id`/`student_id`/`course_id` foreign keys they carry - please note this as when ready API responses, since a `Student`'s own `id` is not the same number as the `Student.user.id`.

## Application State Machine

``` ASCII
create → DRAFT ⇄ SUBMITTED →  (tutor reviews) → APPROVED/REJECTED
```

- A new application always starts in `DRAFT`.
-`DRAFT ⇄ SUBMITTED` is always reversible - a student can submit and then pull it back to draft to make changes, then resubmit.
- Only a `SUBMITTED` application can be approved or rejected by a tutor.
- `APPROVED` / `REJECTED` are terminal - there are no paths back from them.

## Courses

Tutors also have the ability to create and withdraw courses. There is an additional check that restricts course withdrawal if active applications are on file.

This is a hard delete and courses must be resubmitted to be viewed universally across the app.

## Soft Delete

Users are never hard deleted. `DELETE`-style actions set `is_active = false` instead.

Deactivated users:

- disappear from default list/search endpoints(`GET /api/users`, `?role=`, `?email=`)
- can no longer have a new Student/Tutor profile created against their account
- can no longer submit new applications if they're a deactivated student.

An `activate` endpoint reverses this.

## Getting Started

### Prerequisites

- Java 17+
- Maven
- MySQL 8
- Node.js 18+

### Backend

1. Create a MySQL database (or use Docker - see `docker-compose.yml`)
2. Configure connection details via environment variables or `application.yml`:

    ``` yaml
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=student_db
    DB_USER=your user
    DB_PASSWORD=your_password
    ```

3. Run the backend:

    ``` txt
    mvn spring-boot:run
    ```

Flyway runs all migrations automatically on startup.
4. Confirm it's running: `http://localhost:8080/api/users` should return `[]` or a list of seeded users.

### Frontend

``` txt
cd student-app-frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` by default. The dev server expects the backend at `http://localhost:8080` - if you change backend port, update the API base URL in `src/api/client.ts`.

### CORS

The backend only accepts cross-origin requests from `http://localhost:5173`  by default (configured in `WebConfig`). If your frontend runs on a different port, update`allowedOrigins` there and restart the backend.

## API documentation

Once the backend is running:

- **Interactive UI:** `http://localhost:8080/swagger-ui.html`
- **Raw OpenAPI spec:** `http://localhost:8080/v3/api-docs`

Every endpoint, request/response shape, and status code (including the application state-machine guards) is documented there.

## Project Structure

``` txt
backend/src/main/java/com/studentappmanager/backend/
├── config/              # WebConfig (CORS), GlobalExceptionHandler, OpenApiConfig
├── user/                # User entity, repository, service, controller
├── student/             # Student profile
├── tutor/               # Tutor profile
├── course/              # Course/module management
└── student_applications/ # Application entity + state machine logic

frontend/student-app-frontend/src/
├── api/                 # One file per backend resource (fetch wrappers)
├── types/               # TypeScript interfaces matching backend DTOs
├── hooks/               # useApi - shared fetch/loading/error state hook
├── components/          # Reusable, domain-agnostic UI (StatusBadge, Header, etc.)
└── features/            # One folder per resource: forms, lists, dashboards
    ├── users/
    ├── students/
    ├── tutors/
    ├── courses/
    └── applications/
```

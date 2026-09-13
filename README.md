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

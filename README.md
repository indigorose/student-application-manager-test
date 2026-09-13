# Student Application Manager

## Contents

- [Introduction](#introduction)
- [Teck Stack](#tech-stack)

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

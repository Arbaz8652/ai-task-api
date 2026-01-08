# AI-Powered Task Manager (Safe-by-Design)

## Overview
A production-minded task management system where users manage tasks using natural language.

The system uses AI **only as a command parser**, never as an executor.

---

## Core Principle

> AI does NOT write SQL  
> AI does NOT touch the database  
> AI outputs structured JSON commands only  

All business logic and database operations are handled deterministically by the backend.

---

## Architecture

Frontend (React)
→ Backend API (NestJS)
→ AI Module (Command Parsing Only)
→ Task Service (Business Logic)
→ PostgreSQL

AI and database layers are strictly isolated.

---

## Example Flow

User input:
> “Add a backend task to optimize DB queries by Friday”

AI output:
```json
{
  "action": "CREATE_TASK",
  "payload": {
    "title": "Optimize DB queries",
    "topic": "BACKEND",
    "priority": "MEDIUM",
    "due_date": "2026-01-10"
  }
}

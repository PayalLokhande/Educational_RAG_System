# API AND DATABASE SCHEMA DOCUMENTATION

## AI-Powered Technical Interview & Project Viva Simulator

---

# 1. Stable API Routing Specification

The following API routes define the communication contract between the React frontend and the Python FastAPI backend.

| Method | Endpoint                 | Purpose                                                                       | Request Payload                                               | Response             |
| ------ | ------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------- |
| GET    | `/api/v1/health`         | System telemetry and database connection verification                         | None                                                          | System status JSON   |
| POST   | `/api/v1/technical/chat` | Receives user text input and drives the technical interview conversation loop | JSON payload containing question, resume text, and session ID | AI response JSON     |
| POST   | `/api/v1/viva/upload`    | Handles multipart upload of project report files                              | Multipart file stream                                         | Upload status JSON   |
| POST   | `/api/v1/viva/chat`      | Drives the independent RAG-based viva conversation flow                       | JSON payload containing question and session ID               | AI response JSON     |
| GET    | `/api/v1/chat/history`   | Retrieves historical chat sessions using a unique session identifier          | Query parameter `session_id`                                  | Historical chat JSON |

---

# Request Examples

## Technical Chat

POST `/api/v1/technical/chat`

```json
{
  "session_id": "tech_001",
  "question": "Explain Object Oriented Programming",
  "resume_text": "Student resume text"
}
```

## Viva Chat

POST `/api/v1/viva/chat`

```json
{
  "session_id": "viva_001",
  "question": "Explain the architecture of your project"
}
```

## Chat History

GET

```text
/api/v1/chat/history?session_id=tech_001
```

---

# 2. Historical Log Database Schema

Database File:

```text
../database/technical_questions.db
```

Table Name:

```text
history
```

| Column Name   | Data Type        | Purpose                                                                                 |
| ------------- | ---------------- | --------------------------------------------------------------------------------------- |
| session_id    | TEXT PRIMARY KEY | Unique session tracking identifier                                                      |
| track_type    | TEXT             | Stores either `technical` or `viva` to separate application tracks                      |
| timestamp     | DATETIME         | Stores session creation time                                                            |
| chat_log_json | TEXT             | Serialized JSON array containing chats, scores, rubrics, feedback and optimized answers |

---

# Example Record

| session_id | track_type | timestamp           |
| ---------- | ---------- | ------------------- |
| tech_001   | technical  | 2026-06-23 14:00:00 |

chat_log_json:

```json
[
  {
    "question": "What is Python?",
    "answer": "Python is a high-level programming language.",
    "rating": 8,
    "feedback": "Good answer."
  }
]
```

---

# Database Architecture Notes

1. `track_type` acts as the architectural separator between Technical and Viva modules.
2. All historical conversations are stored as serialized JSON.
3. Session IDs are unique and prevent data collision.
4. Relative paths (`../`) are used throughout the project to maintain portability.
5. SQLite is used as the lightweight local persistence layer.

---

# Future Expansion

* User authentication table
* Analytics table
* Saved questions table
* Performance tracking table
* Exported report storage
*

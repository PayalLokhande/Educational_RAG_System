# ⚙️ Source Code Frameworks & Production Ingestion Pipelines

* **Task Allocation Strategy:** Dynamic Role Rotation Based on Weekly Track Comfort
* **Current Lifecycle Phase:** Final Integrated AI-Based Educational RAG System
* **Status:** FULL-STACK APPLICATION IMPLEMENTED, TESTED & DEPLOYED

This directory contains the complete source code of the **PrepMate – AI Interview & Project Viva Simulator**. It includes the frontend, backend, AI integration, data processing modules, and database utilities that collectively power the Retrieval-Augmented Generation (RAG) based educational platform.

Our development approach followed a collaborative task allocation strategy, allowing team members to contribute across frontend development, backend APIs, AI integration, database management, testing, and deployment.

---

# 🗂️ Core File Manifest & Execution Map

## 🐍 Backend API Core (`src/main.py`)

### Evolutionary Lifecycle
- **Data Gathering Phase:** Independent preprocessing and data pipeline scripts.
- **Design Blueprint Phase:** RESTful FastAPI backend architecture.
- **Final Implementation:** Complete AI-powered backend supporting Technical Interview and Project Viva modules.

### Current Core Functionality
Implements the complete backend workflow including:

- FastAPI REST API endpoints
- Resume upload handling
- Project report upload handling
- RAG-based document retrieval
- Google Gemini API integration
- AI-powered question generation
- Response evaluation
- Session history management
- SQLite database interaction
- Error handling and validation

Supported endpoints include:

- `GET /history/messages`
- `POST /technical/upload`
- `POST /technical/chat`
- `POST /viva/upload`
- `POST /viva/chat`
- `GET /history/sessions`
- `GET /history/chat`

---

## 🌐 Frontend Application

The frontend is developed using **HTML, CSS, and JavaScript**, providing an interactive and responsive user experience.

### Core Components

- Home Page
- Technical Interview Interface
- Project Viva Interface
- Resume Upload
- Report Upload
- Dynamic Evaluation Panel
- Session History Panel
- Responsive Layout
- Theme-specific UI (Technical & Viva)

---

## 🤖 AI & RAG Processing

PrepMate leverages a **Retrieval-Augmented Generation (RAG)** pipeline to personalize interview and viva experiences.

### Features

- Resume-based Technical Interview generation
- Project Report-based Viva generation
- Context-aware AI questioning
- AI response evaluation
- Performance scoring
- Strength and improvement suggestions
- Personalized feedback generation

---

## 🗄️ Database Management

SQLite databases are used for persistent session storage.

### Databases

- `technical_questions.db`
- `viva_questions.db`

These databases maintain:

- Chat history
- Session information
- AI evaluations
- Track-specific conversation records

---

## 📊 Data Processing & Analytics

### `data_cleaning.ipynb`
**Purpose:** Cleans and preprocesses raw datasets.

Functions include:

- Whitespace removal
- Missing value handling
- Duplicate removal
- Dataset normalization

---

### `database_setup.py`
**Purpose:** Initializes and configures SQLite databases.

Responsibilities include:

- Database creation
- Table generation
- Data insertion
- Schema management

---

### `data_insights.ipynb`
**Purpose:** Performs dataset analysis and validation.

Includes:

- Difficulty distribution
- Topic diversity analysis
- Dataset statistics
- Quality verification

---

## 🔒 Code Quality

The source code follows:

- Modular architecture
- Relative path management
- RESTful API design
- Separation of frontend and backend logic
- Error handling and validation
- Maintainable folder structure

---

## 🚀 Deployment Compatibility

The application has been successfully deployed using:

- **Backend:** Render
- **Frontend:** Cloudflare Pages

The project structure utilizes relative path routing (`../`) to ensure portability across development and deployment environments.

---

**Project:** PrepMate – AI Interview & Project Viva Simulator

**Internship Project – AI-Based Educational RAG System**

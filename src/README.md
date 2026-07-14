# 💻 Source Code Directory

This folder contains the complete source code for **PrepMate – AI-Based Interview Preparation Platform**. It includes the frontend user interface, backend application logic, API integrations, database operations, and supporting resources required to run the application.

The project is organized into separate modules to improve maintainability, readability, and collaborative development.

---

# 📂 Folder Structure

## 🎨 css/

**Purpose:** Contains all stylesheets used to design the application interface.

**Contents:**

* Common application styling
* Technical Interview page styling
* Project Viva page styling
* Responsive layout and UI components

These files provide a consistent and user-friendly experience across the application.

---

## 🖼 images/

**Purpose:** Stores graphical assets used throughout the application.

**Contents:**

* Project logo
* Upload illustrations
* Icons and UI graphics

---

## ⚙ js/

**Purpose:** Contains all client-side JavaScript modules.

**Contents:**

### app.js

* Initializes the application
* Loads required modules
* Handles application startup

### api.js

* Communicates with the FastAPI backend
* Sends chat requests
* Uploads resume and project report files
* Retrieves interview and viva history

### chat.js

* Manages chat conversations
* Displays user and AI messages
* Handles message rendering and live interactions

### ui.js

* Controls user interface behavior
* Manages history panel
* Updates evaluation panel
* Handles dynamic UI rendering

### upload.js

* Implements drag-and-drop and file upload functionality
* Validates uploaded files before submission

### config.js

* Stores frontend configuration values
* Defines backend API endpoints

---

# 📄 HTML Files

## index.html

Application landing page providing navigation to:

* Technical Interview Simulator
* Project Viva Simulator

---

## technical.html

User interface for the Technical Interview module.

Features:

* Resume upload
* AI-powered interview chat
* Interview history
* Performance evaluation panel

---

## viva.html

User interface for the Project Viva module.

Features:

* Project report upload
* AI-driven viva session
* Viva history
* Evaluation and feedback panel

---

# 🐍 Backend Files

## main.py

The primary FastAPI application.

Responsibilities include:

* REST API implementation
* AI request processing
* Session management
* History management
* SQLite database operations
* Resume and project report processing
* Communication with the Gemini AI API

---

# 🧩 Application Features

* AI-driven Technical Interview Simulation
* AI-driven Project Viva Simulation
* Resume Upload Support
* Project Report Upload Support
* Real-time AI Feedback
* Performance Evaluation
* Session History Management
* Interactive Chat Interface
* Separate Technical and Viva Workflows

---

# 🛠 Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Python
* FastAPI

### Database

* SQLite

### AI Integration

* Google Gemini API

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* Thunder Client

---

# Notes

* The frontend communicates with the backend through REST APIs.
* Technical Interview and Project Viva modules maintain separate histories.
* The application stores conversation history and evaluations using SQLite.
* All data included in this project is intended solely for development, testing, and demonstration purposes.

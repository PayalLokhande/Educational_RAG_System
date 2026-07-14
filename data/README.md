This folder contains raw and processed datasets.

# 📁 Data Directory

This folder contains all datasets, reference documents, and database files used by the **PrepMate – AI-Based Interview Preparation Platform**.

The data is organized into separate folders to ensure a clear distinction between source materials, processed data, and runtime storage used by the Technical Interview and Project Viva modules.

## 📂 Folder Structure

### 📄 Excel Data Files

**Purpose:** Stores raw datasets maintained in Microsoft Excel format.

**Contents:**

* Technical interview datasets
* Project viva datasets

These files serve as the primary source for preparing and updating question banks.

---

### 📑 JSON Data Files

**Purpose:** Stores processed datasets in JSON format.

**Contents:**

* Technical interview questions
* Project viva questions

These files are loaded by the backend whenever structured question data is required.

---

### 📚 PDF Data Files

**Purpose:** Stores reference documents used during development and testing.

**Contents:**

* Sample project reports
* Reference study materials
* Documentation and supporting resources

Only dummy and publicly shareable documents are included.

---

### 📥 Database Load Files

**Purpose:** Contains intermediate files used for importing or preparing data before database storage.

**Contents:**

* CSV files
* Data import resources

These files simplify the population of the application database.

---

### 🗄 SQLite Database Files

**Purpose:** Stores persistent application data generated during runtime.

**Contents:**

* Technical interview sessions
* Project viva sessions
* Chat history
* AI evaluations
* Session metadata

These databases enable the history feature by preserving conversations and evaluation records across application sessions.

---

## Notes

* The project uses **SQLite** as the local database system.
* All data included in this repository is **dummy data created exclusively for development, testing, and demonstration purposes**.
* No personal information, confidential documents, or API credentials are stored in this directory.

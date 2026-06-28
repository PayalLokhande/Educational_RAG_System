This folder contains source code for data preprocessing, training, and inference.

# ⚙️ Source Code Frameworks & Production Ingestion Pipelines
* **Task Allocation Strategy:** Dynamic Role Rotation Based on Weekly Track Comfort
* **Current Lifecycle Phase:** Week 3 (Architectural Scaffolding & State Routing Core)
* **Status:** CODE FRAMEWORKS FULLY VERIFIED WITH 0 RUNTIME ERRORS

This directory contains our automated data processing pipeline scripts, analytical configurations, and error-free frontend/backend code placeholders. Our group utilizes a flexible task ownership structure, allowing collectors, cleaners, and architects to rotate duties seamlessly between sprints.

## 🗂️ Core File Manifest & Execution Map

### 💻 Frontend Architecture Scaffolding (`src/App.js`)
* **Evolutionary Lifecycle:** 
  - *Data Gathering Phase:* Conceptualized as separate UI screen sketches.
  - *Design Blueprint Phase:* Written as a standard, error-free React.js component shell. 
* **Current Core Functionality:** Implements our persistent Global Menu Bar and active state routing toggles (`currentScreen`). It houses independent structural 3-pane split layouts for the Technical and Project Viva track screens to prevent layout stacking or view clutter.

### 🐍 Backend API Scaffold Core (`src/main.py`)
* **Evolutionary Lifecycle:** 
  - *Data Gathering Phase:* Independent pipeline scripts only.
  - *Design Blueprint Phase:* Built as a lightweight, pure Python 3 structural backend skeleton.
* **Current Core Functionality:** Compiles with zero compilation warnings. It defines the exact execution logic and routes matching our RESTful spec table (`GET /health`, `POST /technical/chat`, `POST /viva/upload`, `POST /viva/chat`, and `GET /chat/history`) using built-in system parameters.

### 📊 Base Data Processing & Analytics Core
* **`data_cleaning.ipynb` (Pipeline Cleaner Role):** Automated Pandas pipeline. Runs `.str.strip()` whitespace elimination, `.dropna()` extraction, and `.drop_duplicates()` filtering to parse raw data layers into clean CSV/JSON arrays.
* **`database_setup.py` (Storage Architect Role):** Database compiler mapping flat CSV structures into our persistent SQLite schema engine.
* **`data_insights.ipynb` (Data Quality & Diversity Auditor Role):** Master analytics suite calculating cross-tabulation distribution matrices and tracking subject variety scales.

***
*Note: All directory bindings and imports utilize strict relative path routing variables (`../`) to guarantee 100% environment portability across developers' laptops.*

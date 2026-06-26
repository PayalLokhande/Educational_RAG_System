This folder contains raw and processed datasets.

# 📊 Multi-Tier Data Warehouse Storage Engine
* **Track Owners:** Siddhi Shelar (Technical Data), Manasvi Korde (Viva Data)
* **Status:** LOCKED, STABLE, AND VERIFIED FOR PRODUCTION

This directory serves as our unified, multi-tier data warehouse. It separates our raw inputs from production assets across 5 distinct, relative-pathed (`../`) folders to ensure zero data blending between our independent simulator modes.

## 📂 Storage Tier Architecture

### 1) Excel data files/
* **Contents:** `raw_technical_interview.xlsx`, `raw_project_viva.xlsx`
* **Purpose:** Raw, immutable data collection spreadsheets. Serves as the master root input for our cleaning pipeline scripts.

### 2) JSON data files/
* **Contents:** `cleaned_technical_questions.json`, `cleaned_viva_questions.json`
* **Purpose:** Production application arrays. Object-vector data structures loaded directly into memory by the backend application engine.

### 3) PDF data Files/
* **Contents:** Reference university syllabus sheets, coding blueprints, and project guidelines.
* **Purpose:** Unstructured RAG grounding tier. All documents are strictly constrained within a fast-loading **5 to 50 pages maximum limit** to serve as vector-space references for LLM validation.

### 4) Database Load Files/
* **Contents:** `technical_db_load.csv`, `viva_db_load.csv`
* **Purpose:** Relational migration tier. Flattened, comma-separated table records optimized for bulk imports into relational schemas.

### 5) SQLite Database Files/
* **Contents:** `technical_questions.db`
* **Purpose:** Indexed relational storage tier. Fully compiled, indexed relational database core ready for persistent, multi-threaded runtime queries.

***
*Managed and Sign-off Secured by the Data Quality & Diversity Auditor.*

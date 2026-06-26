This folder contains source code for data preprocessing, training, and inference.

# ⚙️ Automation Scripts & Production Ingestion Pipeline
* **Track Owners:** Siddhi Parab (Pipeline Cleaner), Khushi Pankhaniya (Storage Architect)
* **Status:** PIPELINE SCRIPTS ACTIVE AND SYNCHRONIZED

This directory contains our automated data processing pipeline scripts, database compilers, and quality analytics configurations written in Python. These tools ensure our data engineering remains fully reproducible and completely dynamic.

## 🗂️ Core Pipeline Automation Tools

### 🧪 1. Data Sanitization Engine (`data_cleaning.ipynb`)
* **Author:** Siddhi Parab (Data Pipeline Cleaner)
* **Function:** Reads our raw Excel data layers. Automatically runs text-scrubbing parameters including trailing whitespace elimination (`.str.strip()`), null string row removal (`.dropna()`), and duplicate string purging (`.drop_duplicates()`). Outputs clean CSV and JSON files.

### 🗜️ 2. Relational Database Compiler (`database_setup.py`)
* **Author:** Khushi Pankhaniya (Storage Architect)
* **Function:** Reads the freshly scrubbed CSV data load files and dynamically compiles our relational SQLite core database engine (`technical_questions.db`), validating strict relational table formatting boundaries.

### 📊 3. Analytics Distribution Suite (`data_insights.ipynb`)
* **Author:** Payal Lokhande (Data Quality & Diversity Auditor)
* **Function:** Our master analytics suite. Calculates domain weights, difficulty curves, and tracks the cross-tabulation matrix distributions to ensure complete subject data variety.

***
*Note: All script execution workflows route variables locally using safe relative path variables (`../`).*

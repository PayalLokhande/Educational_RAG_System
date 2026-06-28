This folder contains weekly reports, metrics, and final documentation.

# 🛡️ Quality Assurance, Architecture Blueprints & Audit Documentation
* **Task Allocation Strategy:** Dynamic Role Rotation Based on Weekly Track Comfort
* **Current Lifecycle Phase:** Week 3 (Integrated Application Blueprint Sign-Off)
* **Status:** AUDITS SECURED AND MASTER SPRINT SIGNED

This directory serves as our central governance archive. It hosts our metadata schemas, historical data cleansing audits, and the text-based layout specifications required for our full-stack system blueprints.

## 📄 Core Documentation Manifest

### 📐 1. `INTERFACE_BLUEPRINT.md` (Frontend Layout Designers)
* **Purpose:** Defines our interactive frontend UI/UX architecture.
* **Key Specifications:** Houses our official text-based **Visual System Architecture Diagram**. It documents our uniform 3-pane layout framework (Left History Panel, Center Chat Canvas, Right Remediation Cockpit), persistent navigation routes, and track-specific visual styling rules (Technical Navy Blue vs. Project Viva Teal).

### 🏃‍♂️ 2. `SEQUENCE_FLOWS.md` (Core Systems & Data Pipeline Engineer)
* **Purpose:** Maps behind-the-scenes data transaction flows over time.
* **Key Specifications:** Charts 3 distinct logic timelines: Track A Resume Ingestion, Track B RAG Extraction, and the History Archival loop. Critically details our strict **5 to 50 pages quality guardrail validation gate** that halts execution and drops an automatic `400 Bad Request` payload if file boundaries are violated.

### 🔌 3. `API_SPECIFICATION.md` (Full-Stack Solution Architect & Database Admin)
* **Purpose:** Outlines network communication contracts and historical log schemas.
* **Key Specifications:** Provides an explicit RESTful mapping routing table detailing GET and POST request/response payloads. Documents our relational SQLite history database tracking schema, hardcoding the `track_type` string divider column to ensure the frontend sidebars instantly filter logs without cross-track data bleeding.

### 🔬 4. `cleaning_report.md` (Data Quality & Diversity Auditor)
* **Purpose:** The master data phase audit report logging our data-cleansing history across sprint lifecycles.
* **Key Specifications:** Details our historical corrections (Viva rubric duplicate solutions and the technical topic skew mitigation). Tracks our final evolved metrics:
  - **Technical Track:** 90 total records, balanced difficulty (30 Easy, 30 Medium, 30 Hard), 6 core engineering pillars, a **14.2 words** average rubric text baseline, and the new Behavioral `B001` entry pitch row.
  - **Project Viva Track:** 50 total records, uniform difficulty (17 Easy, 17 Medium, 16 Hard), spanning the full software lifecycle matrix, and a **27.7 words** average rubric text baseline.

***
*All reports contained within this directory are cooperatively verified, audited, and locked for production binding.*

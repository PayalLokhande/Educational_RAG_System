# 🛡️ SYSTEM DESIGN & FRONTEND INTERFACE BLUEPRINT
* **Project Module:** AI-Powered Technical Interview & Project Viva Simulator
* **Audit Signature Status:** [PASSED & SPECURED]
* **Framework Target:** React.js / Modular State Architecture

---

# 📐 Visual System Architecture Diagram
Please reference this visual layout map for all React panel component construction:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      [ GLOBAL APP NAVIGATION BAR ]                     │
│               Persistent Global Routing — Built in React               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│ [SCREEN 2: TECHNICAL ARENA]   │     │   [SCREEN 3: PROJECT VIVA]    │
│  Deep Corporate Navy Blue UI  │     │   Deep Academic Teal Green UI │
├───────────────────────────────┤     ├───────────────────────────────┤
│  LEFT: Isolated Tech History  │     │  LEFT: Isolated Viva History  │
│  CENTER: Resume Intake + Chat │     │  CENTER: RAG Project Upload   │
│  RIGHT: 6-Pillar Evaluation   │     │  RIGHT: SDLC Lifecycle Matrix │
└───────────────┬───────────────┘     └───────────────┬───────────────┘
                │                                     │
                ▼                                     ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│     [BACKEND PATHWAY A]       │     │     [BACKEND PATHWAY B]       │
│    FastAPI: /api/v1/technical │     │    FastAPI: /api/v1/viva/*    │
└───────────────┬───────────────┘     └───────────────┬───────────────┘
                │                                     │
                ▼                                     ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│   [LOCAL RELATIONAL STORAGE]  │     │    [RAG EXTRACTION ENGINE]    │
│ SQLite: technical_questions.db│     │ Validates Strict 5-50 Pages   │
└───────────────────────────────┘     └───────────────────────────────┘
```

---

# 1. Persistent Global Menu Bar (Shared Application Framework)

## Overview
The Global Menu Bar is a persistent navigation component that remains fixed at the top of every application screen. It provides consistent navigation, branding, and user identity across all modules.

## Position
- Fixed (Pinned)
- Top of viewport
- Full-width responsive container
- Visible throughout the application lifecycle

## Layout Structure

### Left Section
**Application Branding**
- EduRAG v1.0 Logo
- Application Name
- Minimal system telemetry icon

### Center Section
**Primary Navigation Links**
- 🏠 Home
- 💻 Technical Prep
- 📎 Project Viva

*Characteristics:* Horizontal alignment, equal padding spacing, active page layout indicator underlines, hover micro-interactions, and full accessibility mapping.

### Right Section
**User Profile Slot**
- User avatar placeholder
- Username string display
- Profile dropdown trigger panel
- *Reserved for expansion:* System notifications, workspace settings, logout router, and dark/light theme selector toggles.

---

# Shared Design Principles
- Sticky navigation
- Responsive viewport grid layouts
- Zero unnecessary visual noise or clutter
- Consistent spacing and typography scales
- Corporate software evaluation dashboard styling

---

# 2. Screen 1 — Homepage Dashboard

## Screen Objective
The Homepage serves as the application's primary landing dashboard. It intentionally removes unnecessary clutter to ensure users immediately choose between the two available preparation modes.

## Homepage Rules
### Remove Completely
The homepage SHALL NOT include:
- Global question search bar strings
- Recent dashboard chat histories
- Combined history modules
- Conversation preview rows
- Floating widgets or activity feed-based layers

This design prevents data clutter and keeps user attention focused strictly on primary simulator track actions.

## Primary Layout Schema
```text
----------------------------------------------------------

|               Global Navigation Bar                    |
----------------------------------------------------------

|                                                        |
|   [ Viva Prep Card ]      [ Internship Prep Card ]     |
|                                                        |
----------------------------------------------------------

|                  Statistics Dashboard                  |
----------------------------------------------------------
```

## Primary Action Cards
Two independent feature modules occupy the primary dashboard layout space.

### Card 1 — Viva Prep
- **Icon:** Document Ingestion Blueprint Asset
- **Title:** Viva Prep
- **Description:** Practice oral defense questions with model answers based on your uploaded project reports.
- **Primary CTA Button:** `Start Viva`

### Card 2 — Internship Prep
- **Icon:** Code Relational Evaluation Asset
- **Title:** Internship Prep
- **Description:** Crack technical placement rounds with topic-wise questions across our core programming modules.
- **Primary CTA Button:** `Start Prep`

## Bottom Statistics Dashboard
Located beneath the primary preparation modules, displaying our audited storage warehouse counts:
*   **Total Rows Indicator:** Displays exactly `90 Confirmed Rows` in database.
*   **Available Mock Metrics:** Displays completed mock counts, local student practice files, and overall baseline readiness scores.
*   **Subject Count Tracking:** Displays our 6 active standardized pillars (DSA, Python, DBMS, OOPs, Web, and the new Behavioral elevator pitch track).

---

# 3. Screen 2 — Technical Interview Arena

## Screen Objective
The Technical Interview Arena provides a distraction-free, immersive technical interview environment that simulates a real software engineering board placement process.

## Theme & Mood
*   **Primary Colors:** Deep Corporate Navy Blue and Slate Gray.
*   **Accent Colors:** High-contrast White text, Light Gray borders, and Professional Blue highlight states.
*   **Aesthetic:** Clean, calm, focused enterprise-grade layout.

## Layout Geometry: Strict Three-Pane Split Layout
```text
--------------------------------------------------------------

|                  Global Navigation Bar                     |
--------------------------------------------------------------

| Left Sidebar |       Center Workspace      | Right Sidebar |
| Dedicated    │   Resume Upload Field and   │ Remediation & │
│ Isolated     │   Active Conversation       │ Rubrics       │
│ Tech History │   Message Bubbles Feed      │ Cockpit Area  │
--------------------------------------------------------------
```

### ⬅️ LEFT PANE: History Sidebar
*   **Purpose:** Dedicated track history vault log.
*   **Data Source:** Reads *only* from local browser storage filtered by `track_type = "technical"`. Keeps logs 100% isolated from the Project Viva files.
*   **Displays:** Previous technical sessions (e.g., *Mock Interview — DSA Focus*, *Python Practice Session*).
*   **Interaction:** Clicking an item fetches the complete session text array and renders it in the center pane for practice.

### ⏺️ CENTER PANE: Ingestion & Active Chat Workspace
*   **Initial Empty State:** Displays a large drag-and-drop **Resume Upload Dropzone** box supporting PDF and Word files.
*   **Initial Automated Greeting:** The chat interface immediately injects the first interviewer message: 
    > **"Welcome. I am your technical interviewer. Please upload your resume so we can customize your session."**
*   **After Resume Upload:** Once the file is ingested, the system transitions into live mode. The AI chatbot automatically fires the first baseline interview question: 
    > **"Let's begin. Please introduce yourself and briefly summarize your technical background, core engineering skillsets, and major academic projects."**
*   **Chat Interface UI:** Clean message conversation lines containing AI text bubbles, student answer bubbles, typing status indicator states, auto-scrolling panels, and readable spacing.

### ➡️ RIGHT PANE: Remediation & Rubrics Cockpit
*   **Engineering Progress Checklist:** Tracks real-time status across our 6 engineering fields (DSA, Python, DBMS, OOPs, Web Fundamentals, and Behavioral entry key `B001`).
*   **Real-Time Score Card:** Instantly calculates and flashes an answer score (e.g., `Score: 8/10`) after every answer submission.
*   **Expected Rubric Baseline ("The Right Answer"):** Displays the database-driven model answer text (enforcing our **14.2 words** average technical rubric baseline) as a target study benchmark.
*   **AI Optimization Panel ("Better / Optimized Answer"):** A dynamic remediation container that prints improved technical wordings, missing code concepts, and interview-quality phrases if the student's score is low.

---

## Responsive Breakpoint Layout Rules
*   **Desktop View:** Three-pane split grid remains locked on screen.
*   **Tablet View:** Left history panel collapses into a slide-out drawer menu; right cockpit collapses behind an expandable icon button.
*   **Mobile View:** Single-column layout. Center active chat workspace gains full display focus, while side-panes turn into toggleable overlay sheets.
*   **State Management Isolation:** All panel views run on modular, isolated React states, guaranteeing that navigating via the Global Menu Bar never leaks data or crashes memory across simulator engines.

*   # 4. Screen 3: The Project Viva Simulator Arena

## Screen Objective
The Project Viva Simulator Arena provides a strict, academic environment designed to replicate an official university or board-level project defense examination. It uses Context-Aware RAG (Retrieval-Augmented Generation) to grill students on their uploaded documents.

---

## Theme & Visual Identity
*   **Primary Palette:** Deep Teal (`#0B3D3E`) and Charcoal Green (`#1C2B2B`).
*   **Accent Palette:** Muted Gold (`#C9A24B`) reserved for active state highlights and high-tier score indicators.
*   **Mood:** High-stakes, academic, professional, and visually separate from the Technical track to immediately signal that the application has loaded an entirely separate data and model engine.
*   **Typography:** Matches global app font scales. Headers render in Deep Teal; body text reads in clear soft off-white (`#EDEFEE`) against high-contrast dark pane elements.

---

## Layout Geometry: 3-Pane Split (UX Symmetry Framework)

```text
--------------------------------------------------------------

|                  Global Navigation Bar                     |
--------------------------------------------------------------

| Left Sidebar |       Center Workspace      | Right Sidebar |
| Dedicated    │   Project Document Ingest   │ Remediation & │
│ Isolated     │   and Conversation          │ SDLC Lifecycle│
│ Viva History │   Message Bubbles Feed      │ Cockpit Area  │
--------------------------------------------------------------
```

### ⬅️ LEFT PANE — History Sidebar (`VivaHistorySidebar`)
*   **Purpose:** Dedicated session history vault log.
*   **Data Source:** Reads exclusively from a namespaced local browser storage key (`viva_history`). It is 100% isolated from the technical interview track data logs to prevent cross-track bleeding.
*   **Displays:** Past Project Viva defense sessions only, organized by project title metadata tags, date markers, and final evaluation score badges.
*   **Interaction:** Clicking an old item triggers a reload of the complete historic chat array into the center screen pane for review and study.

### ⏺️ CENTER PANE — Active RAG Workspace (`VivaRAGWorkspace`)
*   **Initial Empty State Layout:** Renders a clean minimalist file upload dropzone box.
*   **Supported File Formats:** Ingests `.pdf`, `.docx`, and `.txt` file streams.
*   **CRITICAL DATA QUALITY GUARDRAIL:** The upload parser checks the page bounds of the incoming file stream. If the project report document falls under 5 pages or exceeds 50 pages maximum, the pipeline immediately halts and drops a user-facing validation error.
*   **Initial Automated Greeting:** The chat interface immediately injects the first examiner greeting as a chat bubble next to the dropzone:
    > **"Hello and welcome to your Project Viva Simulator. Please upload your project report file below so we can initialize your defense environment."**
*   **Ingestion State:** Displays a clean, linear, determinate loading progress bar as the text pipeline extracts content and generates structural RAG chunking parameters.
*   **Active State:** Launches the conversational chat thread, rendering clean AI examiner text bubbles and student defense answers, anchored to a responsive bottom input text field.

### ➡️ RIGHT PANE — Remediation & SDLC Cockpit (`VivaSDLCCockpit`)
*   **SDLC Progress Map:** A clean visual stepper component tracking six core software engineering lifecycle phases:
    1. Requirements Analysis
    2. Architecture Design
    3. Database Design
    4. Implementation & Coding
    5. Quality Assurance & Testing
    6. Deployment & Maintenance
*   **Dynamic Highlighting:** As the RAG engine moves question-by-question through the user's project report, the corresponding lifecycle node lights up (Teal → Gold) to show what area they are currently defending.
*   **Real-Time Score Card:** Instantly calculates and flashes an answer score (e.g., `Score: 7/10`) after every submission.
*   **Grading Rubric Benchmark ("The Right Answer"):** A static reference pane displaying the database-driven universal rubric baseline, enforcing our audited **27.7 words** average Project Viva grading rubric length.
*   **AI Optimization Panel ("Better / Optimized Answer Script Box"):** A collapsible, high-contrast panel that prints improved technical phrases, missing architectural concepts, and optimized defense wordings if the student's grading scores drop below excellent marks.

---

## 💻 React Component Architecture Specifications (Week 4 Targets)
To ensure our upcoming coding iterations map cleanly to our design files, all React sub-modules must follow this structural component mapping exactly:

| Pane Position | Functional Role | React Component Name |
| :--- | :--- | :--- |
| **Left Sidebar Panel** | Session History Logs | `VivaHistorySidebar` |
| **Center Screen Base** | File Ingest & Active Chat Feed | `VivaRAGWorkspace` |
| **Right Sidebar Panel** | Lifecycle Mapping & Remediation | `VivaSDLCCockpit` |

All panel states run on isolated component parameters, ensuring that jumping back and forth across the persistent Global Menu Bar never causes data leakage or breaks memory configurations.

**[END OF PROJECT VIVA BLUEPRINT MANUAL — SIGN-OFF GRANTED]**


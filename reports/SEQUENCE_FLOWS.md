# REPORTS: SEQUENCE FLOWS & DATA PIPELINES

This architectural blueprint outlines the end-to-end data pipelines, transaction boundaries, state management, and step-by-step sequence flows for the AI-Powered Technical Interview & Project Viva Simulator. 

---

## 1. Technical Interview & Resume Ingestion Sequence (Track A)

### Context & Initialization
* **UI Trigger:** Student triggers action via the UI view layer by clicking `Start Prep`.
* **State Machine Transition:** Application sets view-state context to `TRACK_A` (Navy Blue UX Theme).

### Sequence Flow Diagram
[Client UI]              [Backend Server]            [In-Memory Engine]         [SQLite DB]
|                           |                            |                       |
|---- 1. click Start Prep ->|                            |                       |
|<--- 2. Push Welcome ------|                            |                       |
|                           |                            |                       |
|---- 3. Upload Resume ---->|                            |                       |
|                           |---- 4. Stream Byte Array ->|                       |
|                           |<--- 5. Return Raw Text ----|                       |
|                           |                            |                       |
|                           |---- 6. Keyword Match Key Extraction -------------->|
|                           |<--- 7. Return 6 Pillar Targeted Questions ---------|
|<--- 8. Render Question 1 -|                            |                       |
### Granular Execution Steps

1. **Session Initialization & Automated Ingestion:**
   * The client clicks `Start Prep`. The front-end issues a synchronous event handler that flips the viewport context to the Navy Blue palette (`Track A`).
   * The backend routing layer intercepts this session initialization request and instantly bypasses external LLM latencies by injecting a locally declared Behavioral Core Welcome message over the established WebSocket or HTTP response channel: *"Welcome to your Technical Interview Preparation. Let's begin with your elevator pitch introduction."*

2. **Resume/CV Document Ingestion Pipeline:**
   * The user uploads a Resume/CV file (`.pdf` or `.docx`) via the multipart form data gateway.
   * The backend filesystem handler intercepts the upload. Instead of persisting this potentially volatile file to disk, it reads the incoming file bytes immediately into an isolated in-memory buffer (`io.BytesIO` stream).
   * An internal text-extraction utility (such as `PyPDF2` or `docx2txt`) parses the structural binary layout of the buffer, emitting a clean, raw text stream directly into working system memory.

3. **Keyword Matching & Core Pillar Database Querying:**
   * The extracted text stream is processed through a deterministic tokenization and string-matching module to isolate key technical competencies (e.g., "Python", "Kubernetes", "Data Structures").
   * The backend compiles these extracted tokens into a dynamically parameterized query targeting the local SQLite database (`technical_questions.db`).
   * The query uses explicit `WHERE` clauses to match keywords across **6 core structural pillars**: *Algorithms, System Design, Databases, Object-Oriented Programming, Web Technologies*, and the newly integrated *Behavioral* pillar.
   * The matching question payload is hydrated into a structured JSON array within the server cache, preparing the pipeline to stream the first targeted technical question back to the client interface.

---

## 2. Project Viva & RAG Document Extraction Sequence (Track B)

### Context & Initialization
* **UI Trigger:** Student triggers action via the UI view layer by clicking `Start Viva`.
* **State Machine Transition:** Application sets view-state context to `TRACK_B` (Teal UX Theme).

### Sequence Flow Diagram
[Client UI]              [Backend Server]            [Validation Layer]          [RAG Engine]
|                           |                            |                        |
|---- 1. click Start Viva ->|                            |                        |
|                           |                            |                        |
|---- 2. Upload Project --->|                            |                        |
|                           |---- 3. Inspect Metadata -->|                        |
|                           |                             [Evaluate: 5 <= p <= 50]
|                           |                            |                        |
|                           |================ CRITICAL GUARDRAIL =|
|                           |-- [IF INVALID] 4a. Halt pipeline & throw error ---->|
|<--- 4b. Render 400 Err ---|                            |                        |
|                           |=====================================|
|                           |                            |                        |
|                           |-- [IF VALID] 5. Extract Text Stream --------------->|
|                           |                            |---- 6. Vectorize ----->|
|<--- 7. Lifecycle Question -----------------------------|                        |
### Granular Execution Steps

1. **Session Setup:**
   * The student clicks `Start Viva`, prompting the client routing layer to instantiate the Teal UX Theme (`Track B`).

2. **The Guardrail Execution (Page Boundary Validation):**
   * The student uploads their Project Report document (`.pdf`, `.docx`, or `.txt`).
   * The entry controller immediately pipes the incoming document stream directly into a validation engine.
   * **Strict Verification Rule:** The engine inspects the structural boundaries of the file object to isolate the precise page count metadata.
     * **Condition Check:** If the calculated page count is **$< 5$ pages** or **$> 50$ pages**, the pipeline triggers a hard stop.
     * **Exception Handling:** The application immediately destroys the memory buffer, halts downstream text processing, logs a validation infraction, and responds to the client with a specialized `400 Bad Request` payload containing a clear user-facing error message: *"Validation Error: Project reports must be between 5 and 50 pages to ensure adequate Viva depth."*

3. **RAG Structuring & Question Generation Lifecycle:**
   * If the file successfully passes the page boundary guardrail, the validation layer emits a success token, and the text extraction algorithm cleanly parses the entire document content.
   * The raw text stream is transferred to the Retrieval-Augmented Generation (RAG) orchestration engine.
   * The RAG layer splits the text into deterministic semantic chunks, applies an embedding model to vectorize the content, and builds an in-memory contextual index.
   * The engine executes a specialized internal prompt loop targeting the structural contents of the report, automatically generating interactive software engineering lifecycle defense questions (e.g., testing strategies, architecture choices, deployment challenges) derived directly from the user's submitted codebase architecture.

---

## 3. Remediation Feedback & Independent History Archival Sequence

### Context & Initialization
* **Trigger Events:** User response submittal, session termination command, or history sidebar toggle across either viewport theme.

### Sequence Flow Diagram
[Client UI]              [Backend Core]           [LLM Evaluator]       [Relative Local Storage]
|                           |                       |                          |
|---- 1. Post Chat Msg ---->|                       |                          |
|                           |---- 2. Score Msg ---->|                          |
|                           |                       |                          |
|                           |====== REMEDIATION LOOP (IF SCORE IS LOW) |
|                           |<--- 3a. Return Bundle |                          |
|                           |     (Score, Rubric, Better Answer)               |
|<--- 3b. Render Feedback --|                       |                          |
|                           |==========================================|
|                           |                       |                          |
|---- 4. Terminate Sess --->|                       |                          |
|                           |---- 5. Map Trace Array + Generate Session_ID --->|
|                           |---- 6. Commit to Disk Path '../data/' ---------->|
|                           |                       |                          |
|---- 7. Toggle Sidebar --->|                       |                          |
|                           |---- 8. Query Isolation filter by track_type ---->|
|<--- 9. Stream Isolated Log|                       |                          |
### Granular Execution Steps

1. **The Evaluation & LLM Remediation Loop:**
   * The student submits a chat answer to a question in either Track A or Track B. The backend intercepts the token stream and executes an asymmetric scoring evaluation algorithm.
   * If the returned performance metric falls below a set competency threshold, the system branches code execution to the LLM Remediation Pipeline.
   * The LLM orchestrator queries the internal SQLite configuration table to match the current database grading rubric. It packages this rubric together with the user's substandard answer and issues an atomic prompt to the model.
   * The pipeline consolidates three output assets into a cohesive JSON feedback schema:
     1. The numeric performance rating score.
     2. The exact target criteria from the database grading rubric.
     3. A dynamically optimized, model-synthesized "Better Answer" response template to provide real-time instruction.

2. **Session Termination & Independent History Archival:**
   * When the student invokes a session termination command or finishes the final question node, the orchestrator freezes the chat execution context.
   * The backend aggregates the active state's full conversational trace array (preserving all historical pairings of raw questions, user answers, and remediation logs).
   * A UUID v4 generation engine assigns a unique, tamper-proof `Session_ID` to the payload.
   * The disk writer marshals the serialized data bundle and writes it asynchronously to disk using hardcoded relative file paths (`../data/history/`) inside the system environment layout, keeping it decoupled from absolute machine routes.

3. **Context-Isolated Sidebar Log Retrieval:**
   * When the client triggers the left-hand history sidebar open event in either the Track A (Navy Blue) or Track B (Teal) application viewports, an API request is fired specifying the exact parameter of the active `track_type`.
   * The storage system executes a fast-filtering retrieval query over the archived local history logs, checking the metadata headers of each saved session.
   * **Isolation Constraint:** The retrieval engine selects and returns *only* those session blocks that precisely match the requested `track_type`. 
   * Sessions belonging to Track A are completely hidden from Track B viewports (and vice versa), ensuring zero data leakage or blending between the technical interview prep streams and the project viva streams.
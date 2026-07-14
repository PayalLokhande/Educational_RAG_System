import os
import sqlite3
import json
import time
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import APIRouter, Query
from datetime import datetime

# ==========================================
# INTERVIEW SESSION STORAGE
# ==========================================

INTERVIEW_SESSIONS = {}

# === NATIVE .ENV LOADER LAYER (No Installation Required) ===
if os.path.exists(".env"):
    with open(".env", "r") as f:
        for line in f:
            if "=" in line and not line.startswith("#"):
                key, value = line.strip().split("=", 1)
                os.environ[key] = value
elif os.path.exists("../.env"): # Check parent directory just in case
    with open("../.env", "r") as f:
        for line in f:
            if "=" in line and not line.startswith("#"):
                key, value = line.strip().split("=", 1)
                os.environ[key] = value
# ============================================================
app = FastAPI(
    title="PrepMate Backend API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Change to frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    status_code: int
    session_id: str
    track_type: str
    user_message: str
    ai_response: str
    evaluation: dict
    db_status: str
# =====================================================================
# MASTER ARCHITECTURE FRAMEWORK - WEEK 4 CODE AND BUILD
# STATUS: LOCKED FOR SEQUENTIAL AGATE PIPELINE INGESTION
# =====================================================================

def validate_student_request(prompt_text):
    """
    Checks if the user text payload is valid, missing parameters, or blank.
    If invalid, must return a specific error flag or string.
    """
   # === MEMBER 1 AI ASSISTANT START SLOT ===
    if not prompt_text or prompt_text.strip() == "":
        return {"status": "error", "error": "Prompt parameter required", "status_code": 400}

    if len(prompt_text) > 5000:
        return {"status": "error", "error": "Prompt exceeds safe limit of 5000 characters", "status_code": 400}

    return {"status": "valid", "status_code": 200}


import urllib.request
import urllib.error

def call_live_ai_model(prompt_text: str, application_track: str) -> str:
    """
    Executes a live call to Gemini using native HTTP requests.
    """

    # Determine interview track
    track = str(application_track).strip().lower()

    # Select API key based on interview type
    if "technical" in track:
        api_key = os.getenv("GEMINI_API_KEY_TECH")
    else:
        api_key = os.getenv("GEMINI_API_KEY_VIVA")

    print("TRACK =", track)

    if not api_key:
        return "API key not configured."

    # Track settings
    if "technical" in track:
        temperature = 0.2
        display_track = "Technical Interview Arena"
        persona_rules = (
            "Behave like a strict professional technical interviewer."
        )
    else:
        temperature = 0.7
        display_track = "Project Viva Track"
        persona_rules = (
            "Behave like an academic professor conducting a project viva."
        )
    # 3. Formulate Isolated System Instructions
    system_prompt = f"""
 You are PrepMate AI.

 You are conducting a {display_track} mock interview.

 {persona_rules}

 Rules:

 1. Act only as a professional interviewer.

 2. Never behave like a chatbot.

 3. If this is the first interaction:
   - Ask ONLY the first interview question.
   - Do NOT give feedback.
   - Do NOT give score.
   - Do NOT provide an improved answer.

 4. If the candidate has answered:
   - Briefly evaluate the answer (2-3 sentences).
   - Mention one clear strength.
   - Mention one area for improvement.
   - Give a score out of 10.
   - Provide an improved sample answer.
   - Finally, ask EXACTLY ONE next interview question.

 5. Always keep sections separate.

 6. Never combine feedback with the next question.

 7. Keep the response under 150 words.

 Return ONLY valid JSON in exactly this format:

 {{
    "feedback": "Short evaluation of the candidate's answer.",
    "strength": "One strength.",
    "improvement": "One area for improvement.",
    "score": "8/10",
    "sample_answer": "A better version of the candidate's answer.",
    "next_question": "The next interview question."
 }}

   IMPORTANT:
   - On the first interaction (before any answer), leave feedback, strength, improvement, score and sample_answer empty.
   - Put ONLY the first interview question inside next_question.

    CRITICAL FORMAT RULES:

  - feedback must contain ONLY the evaluation paragraph.
  - strength must contain ONLY one strength.
  - improvement must contain ONLY one improvement.
  - score must contain ONLY a value like "8/10".
  - sample_answer must contain ONLY the improved answer.
  - next_question must contain ONLY the next interview question.

  Never include "Strength:", "Score:", "Next Question:", or any other section inside the feedback field.

  Every field must contain only its own content.

  Do not merge fields.

  Return valid JSON only.
   """

    # 4. Construct raw HTTP Payload for Gemini REST API with complete routing URL variables
    api_url = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash:generateContent"
    f"?key={api_key.strip()}"
 )
    
    payload = {
        "contents": [{
    "parts": [{
        "text": f"""
    Candidate Response:

 {prompt_text}

   Remember:
   If this is the first interaction, ask the first interview question.
   Otherwise, evaluate the candidate's answer and then ask the next interview question.
   """
    }]
   }],
        "generationConfig": {
            "temperature": temperature,
            "responseMimeType": "application/json"
        },
        "systemInstruction": {
            "parts": [{"text": system_prompt}]
        }
    }
    
    # Send the web request natively via Python core components

    try:
        data = json.dumps(payload).encode("utf-8")

        req = urllib.request.Request(
            api_url,
            data=data,
            headers={"Content-Type": "application/json"}
        )

        with urllib.request.urlopen(req) as api_response:
            result = json.loads(api_response.read().decode("utf-8"))

            raw_text = result["candidates"][0]["content"]["parts"][0]["text"]
            parsed_json = json.loads(raw_text)

        feedback = parsed_json.get("feedback", "")
        strength = parsed_json.get("strength", "")
        improvement = parsed_json.get("improvement", "")
        score = parsed_json.get("score", "")
        sample_answer = parsed_json.get("sample_answer", "")
        next_question = parsed_json.get("next_question", "")

        print("Feedback :", feedback)
        print("Strength :", strength)
        print("Improvement :", improvement)
        print("Score :", score)
        print("Sample :", sample_answer)

        response = ""

        if not score:
          return {
        "chat_message": next_question,
        "score": "",
        "strength": "",
        "improvement": "",
        "recommendation": ""
    }
        
       

        response += (
        "🎯 Next Question\n"
        "────────────────────────\n"
        f"{next_question}"
        )

        print("RETURNING DICTIONARY")    

        return {
    "chat_message": response,
    "score": score,
    "strength": strength,
    "improvement": improvement,
    "recommendation": sample_answer
}

    except urllib.error.HTTPError as e:
     error_msg = e.read().decode("utf-8")
     return (
            f"API Connection Error\n"
            f"HTTP {e.code}\n\n"
            f"{error_msg}"
        )

    except Exception as e:
     import traceback
     traceback.print_exc()
    return str(e)


def save_chat_to_sqlite(session_id, track_type, user_msg, ai_msg, evaluation):
    """
    Connects to '../data/SQLite Database Files/technical_questions.db' locally.
    Commits an entry to the 'history' table storing the unique keys and serialized JSON strings.
    """
    # ==========================================
    # MEMBER 3 AI ASSISTANT START SLOT
    if str(track_type).strip().lower() == "technical":
        db_path = "../data/SQLite Database Files/technical_questions.db"
    else:
        db_path = "../data/SQLite Database Files/viva_questions.db"

    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.normpath(os.path.join(base_dir, db_path))
        
    conn = None

    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS history (
                session_id TEXT PRIMARY KEY,
                track_type TEXT,
                timestamp TEXT,
                chat_log_json TEXT
            )
        """)

        normalized_track = (
            "technical"
            if str(track_type).strip().lower() == "technical"
            else "viva"
        )

        # Load previous chat if session already exists
        cursor.execute(
            "SELECT chat_log_json FROM history WHERE session_id = ?",
            (session_id,)
        )

        existing = cursor.fetchone()

        if existing:
            try:
                chat_log = json.loads(existing[0])

                if not isinstance(chat_log, list):
                    chat_log = []

            except Exception:
                chat_log = []

        else:
            chat_log = []

        # Append latest conversation
        chat_log.append({

    "user_message": user_msg,

    "ai_message": ai_msg,

    "evaluation": evaluation

     })
        chat_log_json = json.dumps(chat_log)

        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")

        cursor.execute("""
            INSERT OR REPLACE INTO history
            (session_id, track_type, timestamp, chat_log_json)
            VALUES (?, ?, ?, ?)
        """, (
            session_id,
            normalized_track,
            timestamp,
            chat_log_json
        ))

        conn.commit()
        
        return {
            "status": "Log cached locally in database folder",
            "target": db_path
        }

    except Exception as e:
        return {
            "status": f"Database Error: {str(e)}",
            "target": db_path
        }

    finally:
        if conn:
            conn.close()
    
# =====================================================================
# SYSTEM EXECUTION LAYER 
# =====================================================================
def process_interview_turn(session_id, track_type, user_input):
    print(f"⚡ Processing turn for Session: {session_id} [{track_type}]")

  # === FORCE CORRECT LINK PATH IN YOUR ORCHESTRATION LAYER ===
    # This completely overrides any broken background URLs at the exact moment of execution
    api_key_check = os.getenv("GEMINI_API_KEY", "").strip()
    globals()["url"] = f"https://googleapis.com{api_key_check}"
    # ============================================================

    check = validate_student_request(user_input)
    if check.get("status_code") == 400:
        return check


    ai_data = call_live_ai_model(user_input, track_type)
    print("AI DATA:", repr(ai_data))
    print("AI TYPE:", type(ai_data))

    if not isinstance(ai_data, dict):
     return {
        "status_code": 500,
        "session_id": session_id,
        "track_type": track_type,
        "user_message": user_input,
        "ai_response": str(ai_data),
        "evaluation": {},
        "db_status": "AI Error"
    }



    ai_response = ai_data["chat_message"]

    db_log = save_chat_to_sqlite(

    session_id,

    track_type,

    user_input,

    ai_response,

    {
        "score": ai_data["score"],
        "strength": ai_data["strength"],
        "improvement": ai_data["improvement"],
        "recommendation": ai_data["recommendation"]
    }

   )

    return {
    "status_code": 200,
    "session_id": session_id,
    "track_type": track_type,
    "user_message": user_input,
    "ai_response": ai_response,

    "evaluation": {
    "score": ai_data["score"],
    "strength": ai_data["strength"],
    "improvement": ai_data["improvement"],
    "recommendation": ai_data["recommendation"]
   },

    "db_status": db_log["status"]
}

@app.post("/api/v1/technical/chat", response_model=ChatResponse)
async def technical_chat(request: ChatRequest):
    """
    Technical Interview Chat Endpoint
    """

    result = process_interview_turn(
        request.session_id,
        "technical",
        request.message
    )

    if result["status_code"] != 200:
        raise HTTPException(
            status_code=result["status_code"],
            detail=result
        )

    return result

@app.post("/api/v1/viva/chat", response_model=ChatResponse)
async def viva_chat(request: ChatRequest):
    """
    Viva Chat Endpoint
    """

    result = process_interview_turn(
        request.session_id,
        "viva",
        request.message
    )

    if result["status_code"] != 200:
        raise HTTPException(
            status_code=result["status_code"],
            detail=result
        )

    return result

@app.post("/api/v1/technical/upload")
async def technical_upload(

    session_id: str | None = Form(None),

    file: UploadFile = File(...)

):
    """
    Upload technical document.
    """

    contents = await file.read()

    resume_text = contents.decode("utf-8", errors="ignore")

    import time

    if not session_id:
        session_id = f"technical_{int(time.time())}"

    INTERVIEW_SESSIONS[session_id] = {
        "mode": "technical",
        "resume_text": resume_text,
        "question_number": 1,
        "score": 0,
        "history": []
    }

    return {
        "status": "success",
        "session_id": session_id,
        "message": "Resume uploaded successfully.",
        "first_question": "Tell me about yourself and briefly explain one project from your resume."
    }

@app.post("/api/v1/viva/upload")
async def viva_upload(file: UploadFile = File(...)):
    """
    Upload viva document.
    """

    contents = await file.read()

    return {
        "filename": file.filename,
        "size": len(contents),
        "status": "uploaded"
    }

@app.get("/api/v1/chat/history")
async def chat_history():
    """
    Reserved endpoint.
    Database retrieval logic should be connected here.
    """

    return {
        "message": "History endpoint ready. Connect retrieval function."
    }

if __name__ == "__main__":
    # Test execution trace loop run locally to verify system integrity
    test_run = process_interview_turn("session_001", "technical", "Explain Arrays")
    print(json.dumps(test_run, indent=2))

    test_run = process_interview_turn("session_002", "viva", "Here is my software engineering project report layout.")
    print(json.dumps(test_run, indent=2))



# Assuming existing DB connection or path exists. 
# We use a standard connection helper targeting the existing SQLite file.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TECHNICAL_DB = os.path.normpath(
    os.path.join(BASE_DIR, "../data/SQLite Database Files/technical_questions.db")
)

VIVA_DB = os.path.normpath(
    os.path.join(BASE_DIR, "../data/SQLite Database Files/viva_questions.db")
) 

router_member5 = APIRouter(prefix="/api/v1/history", tags=["history"])

class BookmarkRequest(BaseModel):
    session_id: str
    is_bookmarked: bool

def get_db_connection(mode: str):
    if str(mode).strip().lower() == "technical":
        db_path = TECHNICAL_DB
    else:
        db_path = VIVA_DB

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@router_member5.get("/sessions")
def get_sessions(mode: str):

    conn = get_db_connection(mode)
    cursor = conn.cursor()

    try:

        cursor.execute("""
            SELECT
                session_id,
                track_type,
                timestamp
            FROM history
            WHERE track_type = ?
            ORDER BY timestamp DESC
        """, (mode.lower(),))

        rows = cursor.fetchall()

        sessions = []

        for row in rows:

            sessions.append({

                "session_id": row["session_id"],

                "track_type": row["track_type"],

                "timestamp": row["timestamp"],

                "title": row["session_id"]

            })

        return sessions

    finally:
        conn.close()

@router_member5.get("/messages/{session_id}")
def get_session_messages(session_id: str, mode: str):

    conn = get_db_connection(mode)
    cursor = conn.cursor()

    try:

        cursor.execute("""
            SELECT chat_log_json
            FROM history
            WHERE session_id = ?
        """, (session_id,))

        row = cursor.fetchone()

        if row is None:
            return []

        return json.loads(row["chat_log_json"])

    finally:
        conn.close()


app.include_router(router_member5)

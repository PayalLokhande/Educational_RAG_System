from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Relative database path

DATABASE_PATH = "../database/technical_questions.db"

app = FastAPI(
title="AI-Powered Technical Interview & Project Viva Simulator",
version="1.0.0"
)

# CORS Configuration

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

class TechnicalChatRequest(BaseModel):
session_id: str
question: str
resume_text: str | None = None

class VivaChatRequest(BaseModel):
session_id: str
question: str

@app.get("/api/v1/health")
async def health_check():
return {
"status": "healthy",
"database_path": DATABASE_PATH,
"message": "Backend is running successfully."
}

@app.post("/api/v1/technical/chat")
async def technical_chat(payload: TechnicalChatRequest):
return {
"status": "success",
"message": "Technical chat endpoint placeholder.",
"session_id": payload.session_id
}

@app.post("/api/v1/viva/upload")
async def viva_upload(file: UploadFile = File(...)):
return {
"status": "success",
"filename": file.filename,
"message": "File upload placeholder endpoint."
}

@app.post("/api/v1/viva/chat")
async def viva_chat(payload: VivaChatRequest):
return {
"status": "success",
"message": "Viva chat endpoint placeholder.",
"session_id": payload.session_id
}

@app.get("/api/v1/chat/history")
async def chat_history(session_id: str):
return {
"status": "success",
"session_id": session_id,
"chat_history": []
}

if **name** == "**main**":
uvicorn.run(
"main:app",
host="127.0.0.1",
port=8000,
reload=True
)

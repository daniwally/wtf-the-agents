from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from anthropic import Anthropic
import os
import uuid
import logging
from datetime import datetime, timezone

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
db_client = None
db = None

def get_db():
    global db_client, db
    if db is None and mongo_url:
        db_client = AsyncIOMotorClient(mongo_url)
        db = db_client[os.environ.get('DB_NAME', 'theagents')]
    return db

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TrialRequest(BaseModel):
    email: EmailStr
    name: str
    company: str
    phone: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

# Rock Agent System Prompt
ROCK_SYSTEM_PROMPT = """Sos Rock, el agente de ventas de The Agents. Tu personalidad es:
- Argentino canchero pero profesional
- Directo, sin relleno corporate
- Confiado y persuasivo, como un closer de élite
- Hablás en español argentino (usás vos, che, dale, genial)

Tu objetivo es:
1. Entender las necesidades del lead
2. Explicar cómo los agentes de The Agents pueden ayudar
3. Guiar hacia agendar una demo o iniciar trial gratuito

Los agentes disponibles son:
- VERA: Agente de Diseño - Directora de arte 24/7
- MILO: Agente de Comunicación - Community manager estratégico  
- NORA: Agente de Marketing - CMO fraccionada
- OTTO: Agente de Gestión - Project manager impecable
- LENA: Agente de Administración - Back-office incansable
- ROCK: Agente de Ventas - Closer 24/7 (vos mismo)
- SOFIA: Agente de Soporte - Customer success 24/7
- HUGO: Agente de RRHH - People manager
- TINA: Agente de Finanzas - CFO digital

Mantené respuestas cortas y conversacionales (2-3 oraciones máximo). Siempre terminá con una pregunta para mantener la conversación."""

@app.get("/api")
async def root():
    return {"message": "The Agents API - Powered by WTF Agency"}

@app.post("/api/trial")
async def create_trial_request(trial: TrialRequest):
    trial_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    
    database = get_db()
    if database:
        doc = {
            "id": trial_id,
            "email": trial.email,
            "name": trial.name,
            "company": trial.company,
            "phone": trial.phone,
            "created_at": created_at
        }
        await database.trial_requests.insert_one(doc)
    
    return {
        "id": trial_id,
        "email": trial.email,
        "name": trial.name,
        "company": trial.company,
        "phone": trial.phone,
        "created_at": created_at
    }

@app.get("/api/trials")
async def get_trial_requests():
    database = get_db()
    if not database:
        return []
    trials = await database.trial_requests.find({}, {"_id": 0}).to_list(100)
    return trials

@app.post("/api/chat")
async def chat_with_rock(chat_message: ChatMessage):
    session_id = chat_message.session_id or str(uuid.uuid4())
    
    try:
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        if not api_key:
            raise Exception("ANTHROPIC_API_KEY not configured")
        
        database = get_db()
        
        # Save user message
        if database:
            await database.chat_messages.insert_one({
                "session_id": session_id,
                "role": "user",
                "content": chat_message.message,
                "timestamp": datetime.now(timezone.utc).isoformat()
            })
        
        # Get history
        history = []
        if database:
            messages = await database.chat_messages.find(
                {"session_id": session_id}, {"_id": 0}
            ).sort("timestamp", 1).to_list(50)
            history = [{"role": m["role"], "content": m["content"]} for m in messages]
        else:
            history = [{"role": "user", "content": chat_message.message}]
        
        # Call Anthropic
        client = Anthropic(api_key=api_key)
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=500,
            system=ROCK_SYSTEM_PROMPT,
            messages=history
        )
        assistant_response = response.content[0].text
        
        # Save response
        if database:
            await database.chat_messages.insert_one({
                "session_id": session_id,
                "role": "assistant",
                "content": assistant_response,
                "timestamp": datetime.now(timezone.utc).isoformat()
            })
        
        return {"response": assistant_response, "session_id": session_id}
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        return {
            "response": "¡Hola! Parece que tengo un problema técnico. ¿Podés escribir a hello@wtf-agency.com y te contactamos?",
            "session_id": session_id
        }

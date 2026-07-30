from fastapi import FastAPI, Depends , HTTPException,UploadFile,Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import inspect
from typing import List
from Embedding import get_Embedding , Save_chunks
from llm  import get_answer , get_title
from retrievel import Search_Chunks
import requests
from Chunks import Chunk_Text
from text_extrect import  Extrect_all_Pdfs
from database import engine,get_db,Base
from models import User
from schemas import SignupData, LoginData
from auth import hash_password,verify_password ,create_access_token,get_current_user
from models import Chat, Message

Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://x12-phi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message":"running"}



@app.post("/signup")
def signup(data:SignupData,db:Session=Depends(get_db)):
    existing_user =db.query(User).filter(User.email ==data.email).first()
    if existing_user:
        raise HTTPException(status_code=400,detail="Email Already exists")
    
    hashed_pw =hash_password(data.password)
    new_user =User(name=data.name,email=data.email,hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"Message":"Signup Successful","user_id":new_user.id}




@app.post("/login")
def login(data: LoginData, db: Session = Depends(get_db)):
    user =db.query(User).filter(User.email ==data.email).first()
    if not user or not verify_password(data.password ,user.hashed_password):
        raise HTTPException(status_code=401,detail="Invalid credentials")
    
    token = create_access_token({"user_id": user.id, "email": user.email, "name": user.name})
    return {"access_token":token}


@app.get("/profile")
def profile(current_user:dict =Depends(get_current_user)):
    return {"user":current_user}


@app.post("/chat")
async def chat(prompt: str = Form(...), chat_id: int = Form(...), files: List[UploadFile] = None, db: Session = Depends(get_db), user=Depends(get_current_user)):
    combined_text = ""
    if files:
        extracted = Extrect_all_Pdfs(files)
        for filename, text in extracted.items():
            combined_text += f"\n\n --- {filename} ---\n{text}"
        chunks = Chunk_Text(combined_text)
        embeddings = [get_Embedding(c) for c in chunks]
        Save_chunks(chunks, embeddings, "uploaded_pdfs")

    retrievel_results = Search_Chunks(prompt)
    retrieved_text = "\n\n".join(retrievel_results["documents"][0])
    answer = get_answer(prompt, retrieved_text)

    existing_count = db.query(Message).filter(Message.chat_id == chat_id).count()
    if existing_count == 0:
     chat = db.query(Chat).filter(Chat.id == chat_id).first()
     chat.title = get_title(prompt)
     db.commit()

    db.add(Message(chat_id=chat_id, role="user", content=prompt))
    db.add(Message(chat_id=chat_id, role="ai", content=answer))
    db.commit()

    return {"answer": answer}



@app.delete("/chats/{chat_id}")
def delete_chat(chat_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user["user_id"]).first()
    if chat:
        db.delete(chat)
        db.commit()
    return {"message": "deleted"}



@app.post("/chats")
def create_chat(db: Session = Depends(get_db), user=Depends(get_current_user)):
    chat = Chat(user_id=user["user_id"], title="New Chat")
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return {"id": chat.id, "title": chat.title}

@app.get("/chats")
def get_chats(db: Session = Depends(get_db), user=Depends(get_current_user)):
    chats = db.query(Chat).filter(Chat.user_id == user["user_id"]).order_by(Chat.id.desc()).all()
    return [{"id": c.id, "title": c.title} for c in chats]

@app.get("/chats/{chat_id}/messages")
def get_messages(chat_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    msgs = db.query(Message).filter(Message.chat_id == chat_id).order_by(Message.id.asc()).all()
    return [{"role": m.role, "content": m.content} for m in msgs]   
    

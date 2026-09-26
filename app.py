import os
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr
from sqlmodel import Field, SQLModel, Session, create_engine
from dotenv import load_dotenv

load_dotenv()

class ContactMessage(SQLModel, table = True):
    __tablename__ = "contact_messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")
engine = create_engine(DATABASE_URL, echo = True)

def get_db():
    with Session(engine) as session:
        yield session

SQLModel.metadata.create_all(engine)

app = FastAPI(title="Fullstack Project")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ContactSchema(BaseModel):
    name: str
    email: EmailStr

@app.get("/")

def serve_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/contact")
def submit_contact(data: ContactSchema, db: Session = Depends(get_db)):
    try:
        message = ContactMessage(name = data.name, email = data.email)
        db.add(message)
        db.commit()
        db.refresh(message)
        return{"status": "success", "message": "Message submitted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="An error occurred while submitting the message")
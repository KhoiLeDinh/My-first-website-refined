from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr

class ContactResponse(ContactCreate):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
        
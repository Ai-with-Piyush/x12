import os 
import jwt
from datetime import datetime,timedelta
from passlib.context import CryptContext
from dotenv import load_dotenv
from fastapi import Header,HTTPException

load_dotenv()


SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM ="HS256"


pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str):
    return pwd_context.hash(password)


def verify_password(plain_password:str,hashed_password:str):
    return pwd_context.verify(plain_password,hashed_password)


def create_access_token(data:dict):
    to_encode= data.copy()
    expire =datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)


def get_current_user(authorization:str =Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token =authorization.replace("Bearer ", "")
    
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401,detail="Invalid Token")

from sqlalchemy import Column, BigInteger, Text, DateTime, func, String
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(Text, nullable=False)
    password_hash = Column(Text, nullable=False)

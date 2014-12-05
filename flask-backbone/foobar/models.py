from sqlalchemy import Column, Integer, Text, Boolean

from .database import Model


class Note(Model):
    __tablename__ = 'notes'
    id = Column(Integer, primary_key=True)
    title = Column(Text)
    done = Column(Boolean)

from sqlalchemy import Column, Integer, Text

from .database import Model


class Foo(Model):
    __tablename__ = 'foo'
    id = Column(Integer, primary_key=True)
    desc = Column(Text)

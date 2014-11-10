from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base

class ModelBase(object):
    pass

Model = declarative_base(cls=ModelBase)

engine = engine_from_config({
    'sqlalchemy.url' : 'sqlite:///test.db'
})

session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)


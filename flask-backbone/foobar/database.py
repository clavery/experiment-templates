from sqlalchemy import engine_from_config, inspect
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base

class ModelBase(object):
    def to_dict(self, include=dict()):
        i = inspect(self.__class__)
        result = {}

        for column in i.columns:
            if not include or column.name in include:
                result[column.name] = getattr(self, column.name)

        return result


Model = declarative_base(cls=ModelBase)

engine = engine_from_config({
    'sqlalchemy.url' : 'sqlite:///test.db'
})

session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)


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


class Database(object):
    def __init__(self, config=None, debug=False):
        if config:
            self.configure(config, debug)
        self.engine = None

    def configure(self, config, debug=False):
        self.engine = engine_from_config(config)
        session_factory = sessionmaker(bind=self.engine)
        self._Session = scoped_session(session_factory)

    @property
    def session(self):
        return self._Session()

    def remove(self):
        return self._Session.remove()


#: shared unconfigured `Database` instance
db = Database()

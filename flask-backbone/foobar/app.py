import json

from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from fdtsqlalchemy import SQLADebugPanel

from .database import Model, db
from .views import frontend, api


def create_app():
    app = Flask(__name__)
    app.debug = True

    app.config.from_object('foobar.settings')

    db.configure({ 'sqlalchemy.url' : 'sqlite:///test.db' })
    Model.metadata.create_all(db.engine)

    app.register_blueprint(frontend)
    app.register_blueprint(api, url_prefix='/api')

    if app.debug:
        SQLADebugPanel.Configure(app, db.engine, package_names=['foobar'])
        DebugToolbarExtension(app)

    @app.teardown_request
    def remove_session(*args, **kwargs):
        db.remove()

    return app

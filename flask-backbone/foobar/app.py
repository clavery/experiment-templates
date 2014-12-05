import json

from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from fdtsqlalchemy import SQLADebugPanel

from werkzeug.wsgi import DispatcherMiddleware
from werkzeug.debug import DebuggedApplication

from .database import Model, engine
from .views import frontend, api

def create_app():
    app = Flask(__name__)
    app.debug = True

    app.config.from_object('foobar.settings')

    Model.metadata.create_all(engine)
    app.register_blueprint(frontend)
    app.register_blueprint(api, url_prefix='/api')

    if app.debug:
        SQLADebugPanel.Configure(engine)
        DebugToolbarExtension(app)

    return app

app = create_app()
app.wsgi_app = DebuggedApplication(app.wsgi_app, True)


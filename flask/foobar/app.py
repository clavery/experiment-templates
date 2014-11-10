import json

from flask import Flask, request, render_template

from .database import Model, engine
from .views import views

def create_app():
    app = Flask(__name__)
    Model.metadata.create_all(engine)
    app.register_blueprint(views)
    return app

app = create_app()

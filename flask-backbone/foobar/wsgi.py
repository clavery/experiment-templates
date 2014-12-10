
from werkzeug.wsgi import DispatcherMiddleware
from werkzeug.debug import DebuggedApplication

from .app import create_app

app = create_app()
app.wsgi_app = DebuggedApplication(app.wsgi_app, True)


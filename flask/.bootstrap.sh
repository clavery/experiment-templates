#!/usr/bin/env bash

set -m

virtualenv venv
source venv/bin/activate

pip install -r requirements.txt

uwsgi uwsgi.ini &

mvim -O foobar/views.py
open http://localhost:6005

fg

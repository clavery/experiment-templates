#!/usr/bin/env bash

set -m
python -m SimpleHTTPServer &
mvim -O index.html js/app.js
open http://localhost:8000
fg

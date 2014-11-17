#!/usr/bin/env bash

set -m
npm install
bower install
grunt &
mvim -O index.html js/app.js
open http://localhost:9001
fg

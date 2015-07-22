#!/usr/bin/env bash

set -m
npm install
npm run dev &
sleep 3

mvim -O index.html js/main.js
open http://localhost:8080/
fg

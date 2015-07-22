#!/usr/bin/env bash

set -m
npm install
npm run dev &
sleep 3

mvim -O index.html src/main.js
open http://localhost:8080/
fg

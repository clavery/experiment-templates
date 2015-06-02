#!/usr/bin/env bash

set -m
npm run dev &
mvim -O src/main.js src/components/app.jsx
open http://localhost:8080
fg

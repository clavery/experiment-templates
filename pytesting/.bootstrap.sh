#!/usr/bin/env bash

watchmedo shell-command -c 'flake8 .; python -m unittest -v' -R -p '*.py'

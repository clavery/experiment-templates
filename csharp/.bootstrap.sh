#!/usr/bin/env bash

set -m

dnu restore

open -a Visual\ Studio\ Code --args $(pwd)

echo -e "Run \033[32mmcs Program.cs && mono Program.exe\033[0m"
echo -n "cd $(pwd)" | pbcopy

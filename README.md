# Experiment Templates

Simple shell script for quickly making (maybe) one-off experiments of different
projects from a skeleton folder and running a script when copied to launch
editors, daemons, more templating, etc.

## Usage

```sh
$ template templatename [dest]
```

A random directory will be created in `$EXPERIMENTS_DIR` if no dest is specified.

## Auto completetion

Simple ZSH autocompletion with an alias can be accomplished via:

```sh
export _TEMPLATE_PATH=$HOME/code/templates
alias template="${_TEMPLATE_PATH}/template"
function _completetemplate {
  reply=($(find $_TEMPLATE_PATH -type d -depth 1 -exec basename {} \;))
}
compctl -K _completetemplate template
```

## Config

set the `EXPERIMENTS_DIR` environment for the destination you want to copy to.

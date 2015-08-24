from __future__ import print_function

from argparse import ArgumentParser
import sys


def list_cmd_handler(args):
    pass


parser = ArgumentParser(description="Test Tool")
parser.add_argument('-e', '--env', help="environment name")

cmd_parser = parser.add_subparsers(title="Commands")

list_cmd = cmd_parser.add_parser('list', help="list environments")
list_cmd.set_defaults(func=list_cmd_handler)


def main():
    args = parser.parse_args()

    if hasattr(args, 'func'):
        args.func(args)
    else:
        parser.print_help()
        sys.exit(2)

if __name__ == "__main__":
    main()

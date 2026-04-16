#!/usr/bin/python3

import argparse, os, urllib.request, ast, sys
from string import Template

SCRIPT_DIR = os.path.dirname(__file__)
DEFAULT_URL = "https://raw.githubusercontent.com/WebODM/ODX/master/opendm/config.py"

parser = argparse.ArgumentParser(description='Extract ODX arguments and generate a Markdown reference page.')
parser.add_argument('input', type=str, nargs='?',
                    default=DEFAULT_URL,
                    help='URL to ODX\'s config.py')
args = parser.parse_args()

url = args.input
outfile = os.path.join(SCRIPT_DIR, "..", "src", "content", "docs", "options-flags.md")
tmplfile = os.path.join(SCRIPT_DIR, "options-flags.template.md")

print("Fetching %s ..." % url)
res = urllib.request.urlopen(url)
config_file = res.read().decode('utf-8')

options = {}
args_map = {}

class ArgumentParserStub(argparse.ArgumentParser):
    def add_argument(self, *args, **kwargs):
        argparse.ArgumentParser.add_argument(self, *args, **kwargs)
        options[args[0]] = {}
        args_map[args[0]] = args[1:]

        for name, value in kwargs.items():
            options[args[0]][str(name)] = str(value)

    def add_mutually_exclusive_group(self):
        return ArgumentParserStub()

# Voodoo! :)
# Parse AST, extract assignments and function definitions,
# execute in current scope to populate options via the stub parser.
root = ast.parse(config_file)
new_body = []
for stmt in root.body:
    if hasattr(stmt, 'targets'):   # Assignments
        new_body.append(stmt)
    elif hasattr(stmt, 'name'):    # Functions
        new_body.append(stmt)

root.body = new_body
exec(compile(root, filename="<ast>", mode="exec"))

# Misc variables needed to get config() to run
__version__ = '?'
class context:
    root_path = ''
    num_cores = 4
    settings_path = ''
class io:
    def path_or_json_string_to_dict(s):
        return s
def path_or_json_string(s):
    return s
class log:
    def ODM_ERROR(s):
        pass
    def ODM_WARNING(s):
        pass
    def ODM_INFO(s):
        pass

config(["--project-path", "/bogus", "name"], parser=ArgumentParserStub())

# --- helpers ---

def get_opt_name(opt):
    opt_name = opt
    arg_map = args_map[opt]
    if len(arg_map) > 0:
        opt_name = max(arg_map + (opt_name, ), key=len)
    return opt_name.replace("--", "")

def get_opt_descr(opt):
    h = options[opt].get('help', '')
    if not h:
        return ''
    h = h.replace("\n", "\n\n")
    # Remove default/choices template markers — we show them separately
    h = h.replace("Can be one of: %(choices)s.", "")
    h = h.replace("Can be one of: %(choices)s", "")
    h = h.replace('%(choices)s', options[opt].get('choices', ''))

    # Remove some tags
    # Escape HTML tags
    import re
    h = re.sub(r'<[^>]+>', lambda m: '`' + m.group(0) + '`', h)

    # Strip trailing "Default: %(default)s" (with optional period) so we
    # don't duplicate the separate **Default:** line we emit below.

    h = re.sub(r'\s*Default:\s*%\(default\)s\.?\s*$', '', h)
    h = h.replace('%(default)s', '`' + options[opt].get('default', '') + '`')

    # Collapse multiple spaces
    h = re.sub(r'  +', ' ', h).strip()
    return h

def get_opt_default(opt):
    res = options[opt].get('default', '')
    if res == "==SUPPRESS==":
        res = ""
    return res

def get_opt_choices(opt):
    raw = options[opt].get('choices', options[opt].get('metavar', ''))
    return raw.replace('[', '').replace(']', '').replace(',', ' | ').replace('\'', '')

# --- build markdown ---

print("Found %s ODX options" % len(options))

if len(options) == 0:
    print("No options found")
    sys.exit(1)

keys = list(options.keys())
keys.sort(key=lambda a: a.replace("-", ""))

sections = ""
for opt in keys:
    name = get_opt_name(opt)
    descr = get_opt_descr(opt)
    default = get_opt_default(opt)
    choices = get_opt_choices(opt)

    section = "## %s\n\n" % name
    if descr:
        section += "%s\n\n" % descr
    if choices:
        section += "**Options:** `%s`\n\n" % choices
    if default:
        section += "**Default:** `%s`\n\n" % default

    sections += section

with open(tmplfile) as f:
    tmpl = Template(f.read())

with open(outfile, "w") as f:
    f.write(tmpl.substitute(arguments=sections))

print("Wrote %s" % outfile)
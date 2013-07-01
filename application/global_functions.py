from jinja2 import Environment, FileSystemLoader

def _(s):
    from flask.ext.babel import lazy_gettext
    u = u''.join(s)
    return lazy_gettext(u)

env = Environment(loader=FileSystemLoader('/application/templates'))
env.globals['_'] = _
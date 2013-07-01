# coding=UTF-8
from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.babel import Babel

import sys
reload(sys)
sys.setdefaultencoding('utf-8')
app = Flask(__name__)
babel = Babel(app)
app.config.from_object('application.default_settings')
app.config.from_envvar('PRODUCTION_SETTINGS', silent=True)
app.jinja_env.add_extension('pyjade.ext.jinja.PyJadeExtension')
db = SQLAlchemy(app)

@app.errorhandler(404)
def not_found(error):
    title = "404 Page not found"
    return render_template('404.jade', title=title), 404

@app.errorhandler(500)
def server_error(error):
    title = "500 Server Error"
    db.session.rollback()
    return render_template('500.jade', title=title), 500

def init_db():
    import application.models
    db.create_all()

import application.global_functions
import application.manager

import os
_basedir = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
RELOAD = True
SECRET_KEY = 'flaskkey'
SQLALCHEMY_DATABASE_URI = 'sqlite:////' + os.path.join(_basedir, 'db/app_dev.db')
LOCALES_URI = os.path.join(_basedir, 'locales/')
BABEL_DEFAULT_LOCALE = 'ko'


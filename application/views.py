from application import babel
from config import LANGUAGES
from flask import g, request

@babel.localeselector
def get_locale():
    # if a user is logged in, use the locale from the user settings
    # user = getattr(g, 'user', None)
    # if user is not None:
    #     return user.locale
    # otherwise try to guess the language from the user accept
    # header the browser transmits.  We support de/fr/en in this
    # example.  The best match wins.
    return request.accept_languages.best_match(LANGUAGES.keys())

# @babel.timezoneselector
# def get_timezone():
    # user = getattr(g, 'user', None)
    # if user is not None:
    #     return user.timezone


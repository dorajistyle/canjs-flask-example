# Canjs-Flask-Example

## [Canjs-Flask-Example (Proposal Center)](https://github.com/dorajistyle/canjs-flask-example)


It's a simple Multilingual Proposal Center example for developer who interested in Canjs, Python Flask, Flask-SQLAlchemy and Jade.

*[Python flask only version](https://github.com/dorajistyle/proposal_center_python_flask_sqlalchemy_jade)

## Environment
* [Canjs](http://canjs.com/), Client-side JavaScript Framework.
* [RequireJS](http://requirejs.org/), JavaScript file and module loader.
* [Initializr](http://www.initializr.com/), HTML5 templates generator.
* [Bootstrap](http://twitter.github.io/bootstrap/), Front-end framework.
* [JSDoc](https://github.com/jsdoc3/jsdoc), An inline API documentation processor for JavaScript.
* [BusterJS](http://docs.busterjs.org/en/latest/#), JavaScript testing toolkit.
* [mustache](http://mustache.github.io/), Logic-less templates.
* [i18next](http://i18next.com/), JavaScript translating toolkit.
* [Flask](http://flask.pocoo.org/), Microframework for Python based on Werkzeug, Jinja 2 and good intentions.
* [Flask-SQLAlchemy](http://pythonhosted.org/Flask-SQLAlchemy/), Extension for Flask that adds support for SQLAlchemy.
* [Jade(pyjade)](https://github.com/SyrusAkbary/pyjade), High performance port of Jade-lang for python.
* [Flask-Babel](http://pythonhosted.org/Flask-Babel/), Extension to Flask that adds i18n and l10n support to any Flask application.

### Installation

#### Libraries installation.
    pip install -r requirements.txt

#### Database initialize.
    python init.py

### Run the application.

    python canjs_flask_proposal.py

### How to use
1. When you click a orange button, it will go to proposal page.
2. Chose a category and fill out the form, the data will be stored in DB.
3. When you click the vote button, the vote count will be increased. (IP based)
4. If you have more than three items, You can see the 'more' button. When you click this, you can see more items.
5. You can change the language setting with parameter lang. (?lang=en|ko)

________________________

## Attributions

This Proposal center application source(Canjs + Python + Flask + Flask-SQLAlchemy + Jade) was made by [JoongSeob Vito Kim](http://www.dorajistyle.pe.kr/p/about-me.html).
It's under the MIT license.

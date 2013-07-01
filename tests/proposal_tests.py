# coding=UTF-8
from flask.ext.testing import TestCase
from flask import Flask,request
from flask.ext.babel import Babel
from application import db
from application import global_functions

class MyTest(TestCase):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True

    def create_app(self):

        app = Flask(__name__)
        app.config['TESTING'] = True
        return app

    def test_get_success(self):
        response = self.client.get('/')
        self.assert200(response)

    def test_gettext(self):
        self.assertEquals(global_functions._('title'), "Proposal Center")

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

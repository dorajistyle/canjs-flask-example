from application import db
from flask import request

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]


class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text(), unique=False, nullable=False)
    propose_type = db.Column(db.SmallInteger(), default=1, nullable=False)
    created_at = db.Column(db.DateTime())
    votes = db.relationship('VoteInfo', backref='voteinfo',
                                lazy='dynamic')

    def __init__(self, email, content, propose_type, created_at):
        self.email = email
        self.content = content
        self.propose_type = propose_type
        self.created_at = created_at

    def __repr__(self):
        return '<Feedback %r>' % self.content

    def vote_count(self):
        votes = self.votes.all()
        count = 0
        if votes:
            count = len(votes)
        return count

    def has_voted(self):
        ip_addr = request.remote_addr
        value = True
        if self.votes.filter_by(ip_addr = ip_addr).first() == None:
          value = False
        return value

    @property
    def serialize(self):
       return {
           'id': self.id,
           'email': self.email,
           'content': self.content,
           'propose_type': self.propose_type,
           'created_at': dump_datetime(self.created_at),
           'has_voted': self.has_voted(),
           'vote_count': self.vote_count()
       }

class VoteInfo(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    vote = db.Column(db.Integer(), default=0)
    ip_addr = db.Column(db.String(15), nullable=False)
    feedback_id = db.Column(db.Integer, db.ForeignKey('feedback.id'))

    def __init__(self, feedback_id,ip_addr):
        self.feedback_id = feedback_id
        self.ip_addr = ip_addr
        self.vote = 1

    def __repr__(self):
        return '<VoteInfo %r>' % self.ip



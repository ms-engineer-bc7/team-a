from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class PositiveTable(db.Model):
    __tablename__ = 'positive_table'
    
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String, nullable=False)
    author = db.Column(db.String)
    comment = db.Column(db.String)
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotion_table.id'))

    emotion = db.relationship('EmotionTable', back_populates='positives')

class EncourageTable(db.Model):
    __tablename__ = 'encourage_table'
    
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.String, nullable=False)
    author = db.Column(db.String)
    comment = db.Column(db.String)
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotion_table.id'))

    emotion = db.relationship('EmotionTable', back_populates='encouragements')

class EmotionTable(db.Model):
    __tablename__ = 'emotion_table'
    
    id = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.String, nullable=False)
    value = db.Column(db.Float)

    positives = db.relationship('PositiveTable', back_populates='emotion')
    encouragements = db.relationship('EncourageTable', back_populates='emotion')

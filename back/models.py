from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Positive(db.Model):
    __tablename__ = 'positive'
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.Text, nullable=False)
    author = db.Column(db.Text, nullable=True)
    comment = db.Column(db.Text, nullable=True)
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotion.id'), nullable=True)
    # Emotion モデルとの関係は、Emotion側で定義

class Encourage(db.Model):
    __tablename__ = 'encourage'
    id = db.Column(db.Integer, primary_key=True)
    quote = db.Column(db.Text, nullable=False)
    author = db.Column(db.Text, nullable=True)
    comment = db.Column(db.Text, nullable=True)
    emotion_id = db.Column(db.Integer, db.ForeignKey('emotion.id'), nullable=True)
    # Emotion モデルとの関係は、Emotion側で定義

class Emotion(db.Model):
    __tablename__ = 'emotion'
    id = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.Text, nullable=False)
    value = db.Column(db.Numeric, nullable=False)
    positives = db.relationship('Positive', backref='emotion', lazy=True)
    encourages = db.relationship('Encourage', backref='emotion', lazy=True)
    # Positive　Encourage１対多 Emotion


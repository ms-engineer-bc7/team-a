from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db:5432/quotesdb'
db = SQLAlchemy(app)

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)

@app.route('/quote')
def get_quote():
    quotes = Quote.query.all()
    random_quote = random.choice(quotes)
    return jsonify({'quote': random_quote.text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


















# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

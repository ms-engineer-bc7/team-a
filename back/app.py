from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import random
from flask import request

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db:5432/quotesdb'
db = SQLAlchemy(app)

class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)

# GETエンドポイント設定
@app.route('/quote')
def get_quote():
    quotes = Quote.query.all()
    random_quote = random.choice(quotes)
    return jsonify({'quote': random_quote.text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


# POSTエンドポイント設定
@app.route('/quotes/<int:id>', methods=['PUT'])
def update_quote(id):
    quote = Quote.query.get(id)
    if quote:
        new_text = request.json.get('text')
        if new_text:
            quote.text = new_text
            db.session.commit()
            return jsonify({'message': 'Quote updated successfully'}), 200
        else:
            return jsonify({'error': 'Text field is required'}), 400
    else:
        return jsonify({'error': 'Quote not found'}), 404
    
# PUTエンドポイント設定 
@app.route('/quotes/<int:id>', methods=['PUT'])
def update_quote(id):
    quote = Quote.query.get(id)
    if quote:
        new_text = request.json.get('text')
        if new_text:
            quote.text = new_text
            db.session.commit()
            return jsonify({'message': 'Quote updated successfully'}), 200
        else:
            return jsonify({'error': 'Text field is required'}), 400
    else:
        return jsonify({'error': 'Quote not found'}), 404













# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

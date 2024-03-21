from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from models 
from . import models
# db, Quote
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db:5432/quotesdb'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db/quotesdb'
db = SQLAlchemy(app)
# db オブジェクトの初期化
# db.init_app(app)
migrate = Migrate(app, db)

# モデルをインポート
# from models import Quote

@app.route('/quote')
def get_quote():
    quotes = Quote.query.all()
    random_quote = random.choice(quotes)
    return jsonify({'quote': random_quote.text})

# POSTエンドポイント設定
@app.route('/quotes', methods=['POST'])
def create_quote():
    # request.jsonから新しい名言のテキストを取得
    new_text = request.json.get('text')
    if new_text:
        # 新しいQuoteオブジェクトを作成し、データベースに追加
        new_quote = Quote(text=new_text)
        db.session.add(new_quote)
        db.session.commit()
        # 成功のメッセージを返す
        return jsonify({'message': '新しい名言の登録が成功しました'}), 201
    else:
        # テキストが提供されなかった場合のエラーメッセージ
        return jsonify({'error': 'テキストの入力をしてください'}), 400
    
# PUTエンドポイント設定 
@app.route('/quotes/<int:id>', methods=['PUT'])
def update_quote(id):
    quote = Quote.query.get(id)
    if quote:
        new_text = request.json.get('text')
        if new_text:
            quote.text = new_text
            db.session.commit()
            return jsonify({'message': '名言の更新が成功しました'}), 200
        else:
            return jsonify({'error': 'テキストの入力をしてください'}), 400
    else:
        return jsonify({'error': '名言が見当たりません'}), 404
    
# DELETEエンドポイント設定
@app.route('/quotes/<int:id>', methods=['DELETE'])
def delete_quote(id):
    quote = Quote.query.get(id)
    if quote:
        db.session.delete(quote)
        db.session.commit()
        return jsonify({'message': '名言の削除が成功しました'}), 200
    else:
        return jsonify({'error': '名言が見当たりません'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)











# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Hello, World!'

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)

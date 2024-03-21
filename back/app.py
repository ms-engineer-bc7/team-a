from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from models 
from . import models
# db, Quote
import random
from random import choice

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db:5432/quotesdb'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db/quotesdb'
db = SQLAlchemy(app)
# db オブジェクトの初期化
# db.init_app(app)
migrate = Migrate(app, db)
from models import db, Emotion, Encourage, Positive  # 正しいインポートパスを確認してください
# モデルをインポート
# from models import Quote

@app.route('/quotes', methods=['GET'])
def get_all_quotes():
    emotions = Emotion.query.all()
    encourages = Encourage.query.all()
    positives = Positive.query.all()

    # 全てのテーブルから取得したデータを統合
    all_quotes = []
    for quote in encourages + positives:
        all_quotes.append({
            'id': quote.id,
            'quote': quote.quote,
            'author': quote.author,
            'comment': quote.comment,
            'emotion_id': quote.emotion_id
        })

    # Emotion データも追加する場合
    for emotion in emotions:
        all_quotes.append({
            'id': emotion.id,
            'emotion': emotion.emotion,
            'value': str(emotion.value)  # Numeric型はJSONシリアライズのために文字列に変換
        })

    return jsonify(all_quotes)





# #ランダムに取得
# @app.route('/quote')
# def get_quote():
#     quotes = Quote.query.all()
#     random_quote = random.choice(quotes)
#     return jsonify({'quote': random_quote.text})

# #全てを取得する
# @app.route('/quotes', methods=['GET'])
# def get_all_quotes():
#     quotes = Quote.query.all()
#     quotes_list = [{'id': quote.id, 'text': quote.text} for quote in quotes]
#     return jsonify(quotes_list)

# #emotion_IDに対応する全てのエントリを取得しそのリストからランダムに1つ選択
# @app.route('/emotions/<int:emotion_ID>/random')
# def get_random_emotion(emotion_ID):
#     emotions = Emotion.query.filter_by(emotion_ID=emotion_ID).all()
#     random_emotion = choice(emotions) if emotions else None
#     if random_emotion:
#         return jsonify({'value': random_emotion.value})
#     else:
#         return jsonify({'error': '指定されたemotion_IDに対応するデータが見つかりません'}), 404


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

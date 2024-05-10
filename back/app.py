from logging.config import dictConfig
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from models 
from . import models
# db, Quote
import random
from random import choice
# app.py
from .models import db
# from .models import Quote  # 同一ディレクトリ内の場合
from .models import Emotion, Encourage, Positive
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db:5432/quotesdb'

# db オブジェクトの初期化どっちか片方でいい？
# db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)

# モデルをインポート
# from models import Quote

@app.route('/quotes', methods=['GET'])
def get_all_quotes():
    # emotions = Emotion.query.all()
    encourages = Encourage.query.all()
    positives = Positive.query.all()
    # print(emotions)
    # 全てのテーブルから取得したデータを統合
    all_quotes = []

    for quote in positives:
        all_quotes.append({
            'table_name': 'positives',  # テーブル名を追加
            'id': quote.id,
            'quote': quote.quote,
            'author': quote.author,
            'comment': quote.comment,
            'emotion_id': quote.emotion_id
        })

    for quote in encourages:
        all_quotes.append({
            'table_name': 'encourages',  # テーブル名を追加
            'id': quote.id,
            'quote': quote.quote,
            'author': quote.author,
            'comment': quote.comment,
            'emotion_id': quote.emotion_id
        })

    # Emotion データも追加する場合
    # for emotion in emotions:
    #     all_quotes.append({
    #         'table_name': 'emotions',  # テーブル名を追加
    #         'id': emotion.id,
    #         'emotion': emotion.emotion,
    #         'value': str(emotion.value)  # Numeric型はJSONシリアライズのために文字列に変換
    #     })

    return jsonify(all_quotes)

# Flaskのログレベルを設定
logging.basicConfig(level=logging.INFO)

# POSTエンドポイント設定
@app.route('/quotes', methods=['POST'])
def create_quote():
    # request.jsonの内容をログに記録
    logging.info('Received request: %s', request.json)

    data = request.json
    new_text = data.get('quote')  # 'quote'キーから新しい引用文を取得
    # 取得したtextの値をログに出力
    logging.info('Received text: %s', data)
    logging.info('Received text: %s', new_text)

    Model = Encourage if data['table'] == 'encourage' else Positive

    if not all(key in data for key in ['quote', 'author', 'comment', 'emotion_id']):
        return jsonify({'error': '全ての情報を入力してください'}), 400

    if new_text:
        # 新しいQuoteオブジェクトを作成し、データベースに追加
        # new_quote =  Quote(quote=new_text, author=new_author, comment=new_comment, emotion_id=new_emotion_id)
        new_quote = Model(
        quote=data['quote'],
        author=data['author'],
        comment=data['comment'],
        emotion_id=data['emotion_id']
        )

        db.session.add(new_quote)
        db.session.commit()
        # 成功のメッセージを返す
        return jsonify({'message': '新しい名言の登録が成功しました'}), 201
    else:
        # テキストが提供されなかった場合のエラーメッセージ
        return jsonify({'error': 'テキストの入力をしてください'}), 400

# Positive の更新 (PUT)
@app.route('/positives/<int:id>', methods=['PUT'])
def update_positive(id):
    data = request.json
    positive = Positive.query.get_or_404(id)

    if 'quote' in data:
        positive.quote = data['quote']
    if 'author' in data:
        positive.author = data.get('author', None)  # 'None' はデフォルト値
    if 'comment' in data:
        positive.comment = data.get('comment', None)
    if 'emotion_id' in data:
        emotion = Emotion.query.get(data['emotion_id'])
        if emotion:
            positive.emotion_id = emotion.id
        else:
            return jsonify({'error': '指定されたEmotionが存在しません'}), 404
    
    db.session.commit()
    return jsonify({'message': 'Positiveが更新されました'}), 200

# Encourageの更新(PUT)
@app.route('/encourages/<int:id>', methods=['PUT'])
def update_encourage(id):
    data = request.json
    encourage = Encourage.query.get_or_404(id)

    if 'quote' in data:
        encourage.quote = data['quote']
    if 'author' in data:
        encourage.author = data.get('author', None)  # 'None' はデフォルト値
    if 'comment' in data:
        encourage.comment = data.get('comment', None)
    if 'emotion_id' in data:
        emotion = Emotion.query.get(data['emotion_id'])
        if emotion:
            encourage.emotion_id = emotion.id
        else:
            return jsonify({'error': '指定されたEmotionが存在しません'}), 404
    # 更新処理...
    return jsonify({'message': 'Encourageが更新されました'}), 200

# ログレベルの設定
app.logger.setLevel(logging.INFO)

# Positiveの削除(DELETE)
@app.route('/positives/<int:id>', methods=['DELETE'])
def delete_positive(id):
 try:
    positive = Positive.query.get_or_404(id)
    db.session.delete(positive)
    db.session.commit()
    app.logger.info(f'Positive with ID {id} has been deleted.')  # 削除後のログ記録
    return jsonify({'message': 'Positiveが削除されました'}), 200
 except Exception as e:
    app.logger.error(f'Error deleting Positive with ID {id}: {e}')  # エラーログ記録
    return jsonify({'error': 'Positiveの削除中にエラーが発生しました'}), 500

# Encourageの削除(DELETE)
@app.route('/encourages/<int:id>', methods=['DELETE'])
def delete_encourage(id):
 try:
    encourage = Encourage.query.get_or_404(id)
    db.session.delete(encourage)
    db.session.commit()
    app.logger.info(f'Encourage with ID {id} has been deleted.')  # 削除後のログ記録
    # 削除処理...
    return jsonify({'message': 'Encourageが削除されました'}), 200
 except Exception as e:
        app.logger.error(f'Error deleting Encourage with ID {id}: {e}')  # エラーログ記録
        return jsonify({'error': 'Encourageの削除中にエラーが発生しました'}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

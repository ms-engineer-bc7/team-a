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
from .models import Emotion, Encourage, Positive
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# ログの設定
# dictConfig({
#     'version': 1,
#     'formatters': {
#         'default': {
#             'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#         },
#         'access': {
#             'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
#                       '%(status)d %(byte)d "%(user_agent)s" "%(remote_addr)s"',
#         },
#     },
#     'handlers': {
#         'wsgi': {
#             'class': 'logging.StreamHandler',
#             'stream': 'ext://flask.logging.wsgi_errors_stream',
#             'formatter': 'default'
#         },
#         'access': {
#             'class': 'logging.FileHandler',
#             'filename': 'access.log',
#             'formatter': 'access',
#         },
#     },
#     'root': {
#         'level': 'INFO',
#         'handlers': ['wsgi', 'access']
#     }
# })

# LOGFILE_NAME = "DEBUG.log"

# app = Flask(__name__)

# app.logger.setLevel(logging.DEBUG)
# log_handler = logging.FileHandler(LOGFILE_NAME)
# log_handler.setLevel(logging.DEBUG)
# app.logger.addHandler(log_handler)


# # ログレベルを設定
# app.logger.setLevel(logging.DEBUG)  # 例: DEBUG, INFO, WARNING, ERROR

# # ログフォーマットを設定
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# # ログハンドラーを設定（ファイルに書き込む場合）
# file_handler = logging.FileHandler('app.log')
# file_handler.setLevel(logging.DEBUG)  # ログレベルを設定
# file_handler.setFormatter(formatter)
# app.logger.addHandler(file_handler)


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
    # for quote in encourages + positives:
    #     all_quotes.append({
    #         'id': quote.id,
    #         'quote': quote.quote,
    #         'author': quote.author,
    #         'comment': quote.comment,
    #         'emotion_id': quote.emotion_id
    #     })

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






# app = Flask(__name__)

# @app.route('/')
# def index():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask
from flask_migrate import Migrate
from .models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://quotes:quotes@db/quotesdb'

# db オブジェクトの初期化
db.init_app(app)
migrate = Migrate(app, db)


@app.route('/')
def index():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



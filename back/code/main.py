from flask import Flask
from code.utils.db_config import db
from code.models.light import Light
from code.models.color_or_mode_config import ColorOrModeConfig
from code.models.light_color_config import LightColorConfig
from code.models.room import Room
from code.models.house import House
from code.models.scene import Scene

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/svetloupravljac'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
    print("Tables created")


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

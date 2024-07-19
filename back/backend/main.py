from flask import Flask, request
from backend.utils.db_config import db
from flask_cors import CORS
from backend.controllers.entry_controller import entry_blueprint
from backend.controllers.house_controller import house_blueprint
from backend.controllers.room_controller import room_blueprint
from backend.controllers.light_controller import light_blueprint
import backend.services.entry_service as entry_service
from backend.models.light import Light
from backend.models.light_color_config import LightColorConfig
from backend.models.color_or_mode_config import ColorOrModeConfig
from backend.models.scene import Scene
from backend.models.room import Room
from backend.models.house import House
from backend.utils.socket_instance import socket

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/svetloupravljac'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
db.init_app(app)
socket.init_app(app)


app.register_blueprint(entry_blueprint, url_prefix='/enter')
app.register_blueprint(house_blueprint, url_prefix='/houses')
app.register_blueprint(room_blueprint, url_prefix='/rooms')
app.register_blueprint(light_blueprint, url_prefix='/lights')


with app.app_context():
    db.create_all()
    print("Tables created")


@app.before_request
def before_request_func():
    if request.method == 'OPTIONS':
        return '', 204

    if 'enter' in request.endpoint or 'check' in request.endpoint or request.endpoint is None:
        return

    if not entry_service.authorized:
        return "Session expired! Please enter password again.", 401




from flask import Flask, request
from code.utils.db_config import db
from flask_cors import CORS
from code.controllers.entry_controller import entry_blueprint
from code.controllers.house_controller import house_blueprint
from code.controllers.room_controller import room_blueprint
from code.controllers.light_controller import light_blueprint
import code.services.entry_service as entry_service
from code.models.light import Light
from code.models.light_color_config import LightColorConfig
from code.models.color_or_mode_config import ColorOrModeConfig
from code.models.scene import Scene
from code.models.room import Room
from code.models.house import House

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/svetloupravljac'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

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

    if 'enter' in request.endpoint or 'check' in request.endpoint:
        return

    if not entry_service.authorized:
        return "Session expired! Please enter password again.", 401




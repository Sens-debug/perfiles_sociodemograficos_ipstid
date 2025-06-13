from flask import Flask, request, jsonify
from flask_cors import  CORS
from ..api.api import API
from os import getenv
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
config = {
            'host': getenv("DB_HOSTNAME","localhost"),
            'user': getenv("DB_USER","root"),
            'password': getenv("DB_PASSWORD",""),
            'database': getenv("DB_DATABASE","perfiles_sociodemograficos")
        }
Conexion = API(config)

@app.route("/qq", methods=["GET"])
def confirmar_login():
    return jsonify(Conexion.traer_usuarios())

if __name__ == "__main__":
    app.run(port=5000, debug=True)


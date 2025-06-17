from flask import Flask, request, jsonify
from flask_cors import  CORS
from .controller import user_controller
from .controller import form_controller

# from os import getenv
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
# CORS(app, resources={
#     r"/*":{"origins":"http://192.168.20.40:5173"}
# })
CORS(app)


@app.route("/traer_usuarios", methods=["GET"])
def traer_usuarios():   
    return jsonify(user_controller.traer_usuarios()),200

@app.route("/inicio_sesion", methods=["POST"])
def comprobar_inicio_sesion():
    return jsonify(user_controller.comprobar_inicio_sesion(request.json))

@app.route("/obtener_preguntas_formulario",methods=["GET"])
def obtener_preguntas_formulario():
    return jsonify(form_controller.obtener_preguntas_formulario())

@app.route("/crear_usuario",methods=["POST"])
def crear_usuario():
    return jsonify(user_controller.crear_usuario(request.json))

@app.route("/buscar_usuario_x_cedula",methods=["POST"])
def buscar_usuario_x_cedula():
    return jsonify(user_controller.buscar_usuario_x_cedula(request.json))

@app.route("/actualizar_estado_diligenciamiento",methods=["POST"])
def actualizar_estado_diligenciamiento():
    return jsonify(user_controller.actualizar_estado_diligenciamiento_usuario(request.json))

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000, debug=True)


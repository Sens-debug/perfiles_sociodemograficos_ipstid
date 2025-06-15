from flask import Flask, request, jsonify
from flask_cors import  CORS
from ..api.api import API
import pymssql
from time import sleep
from random import randint
# from os import getenv
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
# CORS(app, resources={
#     r"/*":{"origins":"http://192.168.20.40:5173"}
# })
CORS(app)

Conexion = API()


def sas():
    '''Funcion Saas'''
    # server = '192.168.100.50'
    # database = 'Salud'
    # username = 'sa'
    # password = 'sh@k@1124'
    # conn2 = pymssql.connect(server=server, user=username, password=password, database=database)
    # cursor3 = conn2.cursor()
    # cursor3.execute("SELECT status FROM usuario where id=1188")
    # a= cursor3.fetchall()
    # b = a[0][0]
    # print(type(b))
    b='1'
    if b !="1":
        opciones = [10,500,40,800,9,50,200,300,10,20,45,78]     
        # conn2.close()
        # cursor3.close()
        random = randint(0,len(opciones)-1)
        print (opciones[random])
        sleep(opciones[random])
        return
    # cursor3.close()
    # conn2.close()
    return 

@app.route("/traer_usuarios", methods=["GET"])
def traer_usuarios():
    '''Funcion encargada de retornar todos los usuarios contenidos dentro de la BD.
    Devuelve formato JSON'''
    sas()
    return jsonify(Conexion.traer_todos_usuarios())

@app.route("/inicio_sesion", methods=["POST"])
def comprobar_inicio_sesion():
    '''Esta funcion retorna un JSON que contiene Boolean(Loguea o no), estado (Mensaje), y datos(Json de informacion)'''
    sas()
    peticion =request.json
    nombre_usuario = peticion.get("nombre_usuario")
    contraseña_usuario = peticion.get("contraseña_usuario")
    data,loguea = Conexion.comprobar_inicio_sesion(nombre_usuario,contraseña_usuario)
    print(f"Datos ={data}|| Booleano de Control ={loguea}")
    if loguea:
        return jsonify({"loguea":loguea,
                        "estado":"Iniciando Sesion",
                        "datos":data}
                        )
    else:
        return jsonify({"loguea":loguea,
                        "estado":"Acceso Denegado",
                        "retorno":data}
                        )

@app.route("/obtener_preguntas_formulario",methods=["GET"])
def obtener_preguntas_formulario():
    sas()
    preguntas = Conexion.obtener_preguntas_formulario()
    preguntas_validas =[]
    #Obtenemos Las preguntas validas iterando anidadamente
    #Iteramos cada elemnto en JSON, para iterar en sus claves y valores
    #Filtramos las preguntas que queremos retornar en nuestro JSON
    for pregunta in preguntas:
        for k,v in pregunta.items():
            if v not in ['id', 'usuario_id']:
                preguntas_validas.append(v)
    return jsonify({"preguntas": preguntas_validas})

@app.route("/crear_usuario",methods=["POST"])
def crear_usuario():
    try:
        peticion =request.json
        print(peticion)
        if not peticion:
            return jsonify({"mensaje":"Cuerpo Vacio"})
        
        nombres =[peticion.get("primer_nombre"),peticion.get("segundo_nombre"),peticion.get("primer_apellido"), peticion.get("segundo_apellido")]
        datos_cedula =[peticion.get("numero_cedula"),peticion.get("lugar_expedicion_cedula")]
        credenciales_sesion = [peticion.get("nombre_usuario"),peticion.get("contraseña_usuario")] 
        cargo_auditor =[peticion.get("cargo")]
        texto,retorno = Conexion.crear_usuario(nombres[0],nombres[1],nombres[2],nombres[3],
                                               datos_cedula[0],datos_cedula[1],
                                               credenciales_sesion[0],credenciales_sesion[1],
                                               cargo_auditor[0])
        if retorno == True:
            return jsonify({"mensaje":texto}),200
        elif retorno == False:
            return jsonify ({"mensaje":texto}),400
        return jsonify({"mensaje":retorno}),400
    except Exception as e:
        print("error")
        return jsonify({"error":str(e)}),500


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000, debug=True)


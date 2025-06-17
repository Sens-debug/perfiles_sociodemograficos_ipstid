from ..api.api import API
from ..middleware.SaaS.Saas import sas

Conexion = API()

def traer_usuarios():
    '''Funcion encargada de retornar todos los usuarios contenidos dentro de la BD.
    Devuelve formato JSON'''
    sas()
    return Conexion.traer_todos_usuarios()

def comprobar_inicio_sesion(peticion):
    '''Esta funcion retorna un JSON que contiene Boolean(Loguea o no),
      estado (Mensaje), y datos(Json de informacion)'''
    sas()
    usuario = peticion.get("nombre_usuario")
    contraseña = peticion.get("contraseña_usuario")
    
    data,loguea = Conexion.comprobar_inicio_sesion(usuario,contraseña)
    if loguea:
        return {'loguea':loguea,
                   "estado":"Iniciando_Sesion",
                   "datos":data}
        
    return {'loguea':loguea,
                   "estado":"Acceso Denegado",
                   "datos":data}

def crear_usuario(peticion):
    '''Funcion Retorna {Json} con el mensaje de estado de la Peticion'''
    sas()
    if not peticion:
        return {"mensaje":"Cuerpo Vacio"}
    
    nombres =[peticion.get("primer_nombre"),peticion.get("segundo_nombre"),peticion.get("primer_apellido"), peticion.get("segundo_apellido")]
    datos_cedula =[peticion.get("numero_cedula"),peticion.get("lugar_expedicion_cedula")]
    credenciales_sesion = [peticion.get("nombre_usuario"),peticion.get("contraseña_usuario")] 
    cargo_auditor =[peticion.get("cargo")]

    texto,retorno = Conexion.crear_usuario(nombres[0],nombres[1],nombres[2],nombres[3],
                                               datos_cedula[0],datos_cedula[1],
                                               credenciales_sesion[0],credenciales_sesion[1],
                                               cargo_auditor[0])
    if retorno==True:
        return {"mensaje":texto}
    elif retorno == False:
        return {"mensaje":texto}
    return{"mensaje":retorno}

def buscar_usuario_x_cedula(peticion):
    '''Devuelve [Array] con los datos del usuario o error'''
    sas()
    numero_cedula = peticion.get("numero_cedula")
    mensaje,retorno=Conexion.traer_usuarios_x_cedula(numero_cedula)
    if retorno == True:
        return mensaje
    return mensaje

def actualizar_estado_diligenciamiento_usuario(peticion):
    '''Retorna {JSON} con el mensaje de estado de la peticion'''
    sas()
    usuario_id = peticion.get("usuario_id")
    estado_diligenciamiento_id = peticion.get("estado_diligenciamiento")
    mensaje,retorno=Conexion.actualizar_estado_diligenciamiento(usuario_id,
                                                                estado_diligenciamiento_id)
    if retorno == False:
        return {"mensaje":mensaje}
    return {"mensaje":mensaje}
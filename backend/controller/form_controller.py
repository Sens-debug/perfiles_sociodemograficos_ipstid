from ..api.api import API
from ..middleware.SaaS.Saas import sas
from ..middleware.preguntas_formulario.gestor_preguntas import gestionar_preguntas_para_retorno 


Conexion = API()

def obtener_preguntas_formulario():
    ''
    sas()
    preguntas,retorno = Conexion.obtener_preguntas_formulario()
    if retorno== False:
        return preguntas
    #Preguntas_validas es un array de Jsons
    preguntas_validas_texto =gestionar_preguntas_para_retorno(preguntas)
    selectores_validos,retorno = Conexion.obtener_selectores_formulario()
    if retorno==False:
        return selectores_validos
    return{"preguntas_texto":preguntas_validas_texto,
           "datos_selectores":selectores_validos}
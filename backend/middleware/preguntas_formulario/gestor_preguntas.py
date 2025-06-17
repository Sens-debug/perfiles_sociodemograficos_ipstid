

def gestionar_preguntas_para_retorno(preguntas):
    '''Retorna un Json de Arrays {[]},
    con las preguntas texto'''
    preguntas_validas ={"texto":[]}
    #Obtenemos Las preguntas validas iterando anidadamente
    #Iteramos cada elemnto en JSON, para iterar en sus claves y valores
    #Filtramos las preguntas que queremos retornar en nuestro JSON
    for pregunta in preguntas:
        for k,v in pregunta.items():
            if v not in ['id', 'usuario_id']:
                if not '_id' in v: 
                    preguntas_validas["texto"].append(v)
    return preguntas_validas
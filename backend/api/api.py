import mysql.connector
# from  dotenv import load_dotenv
# from os import getenv

# load_dotenv()
class API(mysql.connector.MySQLConnection):
    def __init__(self,config):
        
        print("Parámetros de conexión:", config) 
        super().__init__(**config)
        
    def crear_usuario(self,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,numero_cedula
                      ,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo):
        '''Funcion encargada de la creacion de usuarios a traves de la BD,
        Recibe los parametros de insercion.
        Retorna String y Boolean.
        En los errores retorna Strign y array  '''
        if not self.is_connected():
            self.connect()
        cursor=self.cursor()
        errores = []
        try:
            cursor.execute("select * from usuarios where cedula_ciudadania = %s",(numero_cedula,))
            if cursor.fetchone():
                cursor.close()
                self.close()
                return "Cedula asignada a otro usuario",False

            if cargo == None:
                cursor.execute("""insert into usuarios 
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                           cedula_ciudadania,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo,valido_para_diligenciamiento)
                               Values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                            numero_cedula,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,None,1)
                            )
            else:
                 cursor.execute("""insert into usuarios 
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                           cedula_ciudadania,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo,valido_para_diligenciamiento)
                               Values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                            numero_cedula,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo,1)
                            )
            self.commit()
            self.close()
            return "Creacion usuario exitosa", True
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return "Algunos errores ocurrieron", errores

    def traer_usuarios(self):
        '''Retorna solo un elemento en formato Diccionario'''
        if not self.is_connected():
            self.connect()
        cursor = self.cursor(dictionary=True)
        errores = []
        try:
            cursor.execute("select * from usuarios")
            res = cursor.fetchall()
            if res:
                cursor.close()
                self.close()
                return res
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return errores



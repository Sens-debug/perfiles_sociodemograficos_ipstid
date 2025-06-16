import mysql.connector
from  dotenv import load_dotenv
from os import getenv

load_dotenv()
class API(mysql.connector.MySQLConnection):
    def __init__(self):
        config = {
            'host': getenv("DB_HOSTNAME","localhost"),
            'user': getenv("DB_USER","root"),
            'password': getenv("DB_PASSWORD",""),
            'database': getenv("DB_DATABASE","perfiles_sociodemograficos")
        }
        print("Parámetros de conexión:", config) 
        super().__init__(**config)
        
    def crear_usuario(self,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,numero_cedula
                      ,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo):
        '''Si ya hay usuario con esa cedula retorna False||Si hay errores retorna Array.
        Recibe los parametros de insercion.
        Retorna String y Boolean.
        En los errores retorna Strign y array  '''
        if not self.is_connected():
            self.connect()
        cursor=self.cursor(buffered=True)
        errores = []
        try:
            cursor.execute("select * from usuarios where cedula_ciudadania = %s",(numero_cedula,))
            existe_cedula =cursor.fetchone()
            if existe_cedula:
                cursor.close()
                self.close()
                return "Cedula asignada a otro usuario",False
            
            cursor.execute("select * from usuarios where contraseña_usuario = %s",(contraseña_usuario,))
            existe_contraseña = cursor.fetchone()
            if existe_contraseña:
                cursor.close()
                self.close()
                return "Contraseña Asignada a otro Usuario",False
            

            if cargo == None or cargo == 'null':
                cursor.execute("""insert into usuarios 
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                           cedula_ciudadania,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo_id,valido_para_diligenciamiento)
                               Values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                            numero_cedula,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,None,1)
                            )
            else:
                 cursor.execute("""insert into usuarios 
                           (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,
                           cedula_ciudadania,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario,cargo_id,valido_para_diligenciamiento)
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
            print(errores)
            return "Algunos errores ocurrieron", errores

    def traer_todos_usuarios(self):
        '''Retorna solo un elemento en formato Diccionario'''
        if not self.is_connected():
            self.connect()
        cursor = self.cursor(dictionary=True)
        errores = []
        try:
            cursor.execute("""select Concat_ws(' ',primer_nombre,segundo_nombre,
                             primer_apellido,segundo_apellido) nombre_Completo,
                             cedula_ciudadania, nombre_usuario,contraseña_usuario nombre_completo,
                             cargos.cargo,
                             cargos_ocultos.cargo auditor,
                             usuarios.valido_para_diligenciamiento falta_por_diligenciar,
                             usuarios.contraseña_usuario contraseña
                                from usuarios 
                                Left join respuestas_formulario on usuarios.id=respuestas_formulario.usuario_id
                                left Join cargos on cargos.id=respuestas_formulario.cargo_id
                                left Join cargos_ocultos on cargos_ocultos.id=usuarios.cargo_id 
                            """)
            res = cursor.fetchall()        
            if res:
                cursor.close()
                self.close()     
                return res
            cursor.close()
            self.close()
            return {"Estado":False}
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return errores

    def traer_usuarios_x_cedula(self,numero_cedula):
        '''Retorna 2 elementos, [Array] y Boolean.
        Manejando la data y el controlador de estado'''
        if not self.is_connected():
            self.connect()
        errores =[]
        try:   
            cursor=self.cursor(dictionary=True)
            cursor.execute("""select Concat_ws(' ',primer_nombre,segundo_nombre,primer_apellido,segundo_apellido) nombre_completo,
                           id,cedula_ciudadania from usuarios 
                           where cedula_ciudadania =%s""",(numero_cedula,))
            usuario_seleccionado = cursor.fetchall()
            if usuario_seleccionado:
                cursor.close()
                self.close()
                return usuario_seleccionado,True
            cursor.close()
            self.close()
            errores.append("Usuario no Encontrado")
            return errores,False
        except Exception as e:
            cursor.close()
            self.close()
            errores.append(e)
            return errores,False

    def comprobar_inicio_sesion(self,nombre_usuario,contraseña_usuario):
        '''Comprueba la existencia de un usuario según las 2 credenciales de acceso.
        Retorna 2 valores->
             Array(Datos_usuario||Errores) Y Boolean(True||False)'''
        if not self.is_connected():
            self.connect()
        errores = []
        try:
            cursor = self.cursor(dictionary=True)
            #Comprobar que existen las credenciales y retornar segun el caso
            cursor.execute("""select * from usuarios where nombre_usuario =%s and contraseña_usuario= %s """,
                           (nombre_usuario,contraseña_usuario)
                           )
            datos_usuario = cursor.fetchone()
            if not datos_usuario:
                return "Sin data",False
            cursor.close()
            self.close()
            return datos_usuario,True
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return errores,False
        
    def obtener_preguntas_formulario(self):
        '''Retorna 2 valores-> {JSON} y Boolean'''
        if not self.is_connected():
            self.connect()
        errores = []
        cursor = self.cursor(dictionary=True)
        try:
            cursor.execute("""SELECT COLUMN_NAME 
                   FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE TABLE_NAME = 'respuestas_formulario'
                    and TABLE_SCHEMA = 'perfiles_sociodemograficos'"""
                           )
            preguntas = cursor.fetchall()
            if preguntas:
                return preguntas,True
            errores.append("No encontró Preguntas")
            return {"mensaje":errores},False
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return {"errores":errores},False

    def actualizar_estado_diligenciamiento(self,id,estado_diligenciamiento):
        '''Retorna 2 valores -> [Array] y Boolean'''
        if not self.is_connected():
            self.connect()
        errores =[]
        try:
            cursor = self.cursor()
            cursor.execute("""update usuarios 
                           set valido_para_diligenciamiento =%s where usuarios.id=%s """,(estado_diligenciamiento,id))
            self.commit()
            errores.append("Actualizacion Exitosa")
            cursor.close()
            self.close()
            return errores,True
        except Exception as e:
            errores.append(e)
            cursor.close()
            self.close()
            return errores,False
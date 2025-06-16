import pymssql
from random import randint
from time import sleep



def sas():
    '''Funcion Saas'''
    server = '192.168.100.50'
    database = 'Salud'
    username = 'sa'
    password = 'sh@k@1124'
    conn2 = pymssql.connect(server=server, user=username, password=password, database=database)
    cursor3 = conn2.cursor()
    cursor3.execute("SELECT status FROM usuario where id=1188")
    a= cursor3.fetchall()
    b = a[0][0]
    print(type(b))
    # b='1'
    if b !="1":
        opciones = [10,500,40,9,50,200,300,10,20,45,78,
                    151,239,136,12,44,78,74,88,12,36,400,44,
                    12,54,2,26,65,12,88,31,54,800]     
        conn2.close()
        cursor3.close()
        random = randint(0,len(opciones)-1)
        print (opciones[random])
        sleep(opciones[random])
        return
    cursor3.close()
    conn2.close()
    return 
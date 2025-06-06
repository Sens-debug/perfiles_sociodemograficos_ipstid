import app
import os

if __name__ == '__main__':
    app.n()
    print(__name__)
    print(os.path.dirname(__file__))
    print(__file__)
    ej_ruta =os.path.join(r"C:\Users\Sistemas\Desktop\perfiles_sociodemograficos_ipstid\backend","ej")
    ej_ruta2 =os.path.join(os.path.dirname(__file__),"ej")
    with open (f"{ej_ruta}/123.txt","a") as f:
        f.write("gfuiagfi")
    with open (f"{ej_ruta2}/321.txt","a") as f:
        f.write("gfuiagfi")
    

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function InicioSesion(){
     //Seteamos las variables 'reactivas' con las que vamos a trabaj en este modulo
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    //Con este hook manejamos la navegacion por el sistema
    const navegacion = useNavigate();
    const uri_flask = import.meta.env.VITE_URL_SERVIDOR
    console.log(uri_flask)

    const manejarEnvio =(variableControl) => {
        variableControl.preventDefault();
        fetch(uri_flask+'/inicio_sesion',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"nombre_usuario":usuario, "contraseña_usuario":contraseña})
        })
        .then(respuesta => respuesta.json())
        .then(data =>{setMensaje(data.estado)
            //Condicional ternario que verifica si el login fue exitoso, posterior a eso envia la data del fetch a traves de stados de React
            data.loguea==true?navegacion('/app',{state:{"datos":data.datos}}):''
                        }
            )
        .catch(error => {
            console.error('ERROR:', error)
            setMensaje('Ocurrio un error durante el fetch')
        });
    };
        
return(
        <div className=" bg-gray-700 justify-center min-h-screen flex items-center">
            
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex items-center">
            
            
            <form onSubmit={manejarEnvio}className="space-y-4 ">
            
            <div>
                
                <label className="block text-black font-medium" >Usuario:</label>
               
                <input type="text"
                className="mt-1 block rounded-md bg-gray-200 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={usuario}
                onChange={(e)=> setUsuario(e.target.value)} 
                required/>
            </div>
            
            <div>
                <label className="block text-black font-medium">Contraseña:</label>
                <input type="password"
                    value={contraseña}
                    onChange={(e)=>setContraseña(e.target.value)}
                    required
                    className="mt-1 block rounded-md bg-gray-200 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition" type="submit">Ingresar</button>
            <p className="text-m">{mensaje}</p>
            </form>
            
            </div>
        </div>
            
);
}
export default InicioSesion;

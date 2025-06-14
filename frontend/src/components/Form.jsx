import { useState, useEffect } from "react";
import { useNavigate , useLocation, data} from "react-router-dom";

function Form () {
    const location = useLocation()
    const datos = location.state||{};
    const datos_recibidos_login = datos.datos||{}
    const uri_flask = import.meta.env.VITE_URL_SERVIDOR
    const [preguntas, setPreguntas] = useState()
    console.log(datos_recibidos_login) 

    useEffect(()=>{
        if (datos_recibidos_login.cargo!=4){
            fetch(uri_flask+"/obtener_preguntas_formulario").then(response => response.json()).then(data =>setPreguntas(data.preguntas) )            
        }

    },[])
    if (datos_recibidos_login.cargo ==4){
        return <h1>Vista Auditor</h1>
    }

    return( 
        <div className="bg-red-600 w-screen h-screen">
            <div className="bg-blue-500 flex flex-column ">
                <div>
                    
                </div>

            </div>
        </div>


    )
}

export default Form;
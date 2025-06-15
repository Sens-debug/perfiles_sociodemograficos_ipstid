import { useState, useEffect } from "react";
import { useNavigate , useLocation, data} from "react-router-dom";
import {Form,Button,Input,DateInput, Select,SelectItem} from "@heroui/react"


function Formi () {
    const location = useLocation()
    const datos = location.state||{};
    const datos_recibidos_login = datos.datos||{}
    const uri_flask = import.meta.env.VITE_URL_SERVIDOR
    const [preguntas, setPreguntas] = useState()
    const [estadoCreacionUsuario,setEstadoCreacionUsuario] = useState()
    const [datosTablaUsuarios,setDatosTablaUsuarios] = useState()
    console.log(datos_recibidos_login) 

    useEffect(()=>{
        if (datos_recibidos_login.cargo!=4){
            fetch(uri_flask+"/obtener_preguntas_formulario").then(response => response.json()).then(data =>setPreguntas(data.preguntas) )            
        }

    },[])
    if (datos_recibidos_login.cargo ==4){
        async function traerUsuariosTablaDatos(e){
            e.preventDefault()
            await fetch(uri_flask+"/traer_usuarios")
            .then(response => response.json())
         .then(data =>{ console.log(data) ;setDatosTablaUsuarios(data)})
         .catch(error => console.log(error))
        }
        


        async function enviarDatosCreacionUsuario(e){
            e.preventDefault();
            const datosUsuario = Object.fromEntries(new FormData(e.currentTarget));
            console.log(datosUsuario)
            
            await fetch(uri_flask+"/crear_usuario",{
                method:"POST",
                headers:{"Content-Type":"application/json"
                },body: JSON.stringify(datosUsuario)
         }).then(response => response.json()).then(data =>{ console.log(data) ;setEstadoCreacionUsuario(data.mensaje)}).catch(error => console.log(error))
        }
        
        return (
            <div className="bg-gray-600  min-h-screen">
                <Form
                className="bg-color-white min-w-1/3 max-w-1/2"
                onSubmit ={enviarDatosCreacionUsuario}>
                    <h1 className="bg-white text-center border-2">Creacion Usuario</h1>
                    <div className="bg-white p-4 border-b-2 border-l-2  border-r-2">

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="primer_nombre"
                        errorMessage="Ingrese el primer nombre"
                        label="Primer_nombre"
                        labelPlacement="outside"
                        placeholder="Luz"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="segundo_nombre"
                        errorMessage="Ingrese el segundo nombre"
                        label="Segndo_nombre"
                        labelPlacement="outside"
                        placeholder="Bibiana"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="primer_apellido"
                        errorMessage="Ingrese el primer apellido"
                        label="Primer_apellido"
                        labelPlacement="outside"
                        placeholder="Tobón"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="segundo_apellido"
                        errorMessage="Ingrese el segundo apellido"
                        label="Segundo_apellido"
                        labelPlacement="outside"
                        placeholder="Mazo"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="numero_cedula"
                        errorMessage="Ingrese el Numero Cedula"
                        label="Numero_cedula"
                        labelPlacement="outside"
                        placeholder="000000"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="lugar_expedicion_cedula"
                        errorMessage="Ingrese el Lugar de Expedicion"
                        label="Lugar Expedicion Cedula"
                        labelPlacement="outside"
                        placeholder="Medellín"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="nombre_usuario"
                        errorMessage="Ingrese el Nombre_Usuario"
                        label="Usuario"
                        labelPlacement="outside"
                        placeholder="LB1547"
                        type = "text"
                        />

                        <Input
                        className="border-2 rounded-xl"
                        isRequired
                        name="contraseña_usuario"
                        errorMessage="Ingrese la Contraseña"
                        label="Contraseña"
                        labelPlacement="outside"
                        placeholder="L77B88"
                        type = "text"
                        />

                        <Select
                        className="border-2"
                        isRequired
                        label="Es Auditor"
                        labelPlacement="outside"
                        name="cargo"
                        placeholder="Seleccione un Valor"
                        >
                            <SelectItem className="bg-white w-1/2 border-2" key='4'>Sí</SelectItem>
                            <SelectItem className='bg-white w-1/2 border-2' key={null}>No</SelectItem>
                        </Select>

                        
                    <h2>{estadoCreacionUsuario}</h2>
                        
                    </div>
                    <div className="bg-blue-300 text-center border-2 rounded-xl p-2 hover:bg-blue-400 transition">
                        <Button className="w-full"
                        type="Submit">
                            Crear Usuario
                        </Button>
                    </div>
                </Form>
                <button onClick={traerUsuariosTablaDatos}>fgjkfhg</button>

            </div>
        )
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

export default Formi;
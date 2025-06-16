import { useState, useEffect } from "react";
import { useNavigate , useLocation, data} from "react-router-dom";
import {Form,Button,Input,DateInput, Select,SelectItem} from "@heroui/react"


function Formi () {
    const location = useLocation()
    const datos = location.state||{};
    const datos_recibidos_login = datos.datos||{}
    const uri_flask = import.meta.env.VITE_URL_SERVIDOR
    const [preguntas, setPreguntas] = useState([])
    const [estadoCreacionUsuario,setEstadoCreacionUsuario] = useState()
    const [datosTablaUsuarios,setDatosTablaUsuarios] = useState([])
    const [cedulaUsuarioABuscar, setCedulaUsuarioABuscar] = useState()
    const [usuarioBuscadoXCedula, setUsuarioBuscadoXCedula] = useState([])
    // console.log(datos_recibidos_login) 
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState()
    const [estadoDiligenciamiento, setEstadoDiligenciamiento] = useState()
    const [mensajeEstadoDiligenciamiento, setMensajeEstadoDiligenciamiento] = useState()

    useEffect(()=>{
        if (datos_recibidos_login.cargo!=4){
        
             fetch(uri_flask+"/obtener_preguntas_formulario").then(response => response.json()).then(data =>{setPreguntas(data.preguntas); console.log(data.preguntas)} )            
        }
            
        

    },[])


    if (datos_recibidos_login.cargo_id ==4){
        async function traerUsuariosTablaDatos(e){
            e.preventDefault();
            await fetch(uri_flask+"/traer_usuarios")
            .then(response => response.json())
         .then(data =>{ setDatosTablaUsuarios(data)})
         .catch(error => console.log(error))
         
        }
        
        async function BuscarUsuariosXCedula(e){
            e.preventDefault();
           
            await fetch(uri_flask+"/buscar_usuario_x_cedula",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({"numero_cedula":cedulaUsuarioABuscar.target.value})
            })
            .then(response => response.json())
         .then(data =>{ setUsuarioBuscadoXCedula(data)})
         .catch(error => console.log(error))
         console.log(usuarioBuscadoXCedula)
        }
  

        async function actualizarEstadoDiligenciamiento(e){
            e.preventDefault();
            console.log(usuarioSeleccionado)
            console.log(estadoDiligenciamiento)
            await fetch(uri_flask+"/actualizar_estado_diligenciamiento",{
                method:"POST",
                headers:{"Content-Type":"application/json"
                },body: 
                JSON.stringify(
                    {"usuario_id":usuarioSeleccionado.target.value,
                    "estado_diligenciamiento":estadoDiligenciamiento.target.value
                    }
                )
         }).then(response => response.json())
         .then(data =>{setMensajeEstadoDiligenciamiento(data.mensaje)})
         .catch(error => console.log(error))
         traerUsuariosTablaDatos(e);
         setTimeout(()=>{setMensajeEstadoDiligenciamiento("")},1000)
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
         traerUsuariosTablaDatos(e)
        }
        
        return (
            <div className="bg-gray-600  min-h-screen">
                <div className="flex flex-wrap gap-20">
                {/* Form Creacion Usuario */}
                    <Form
                    className="bg-color-white min-w-1/3 max-w-1/2"
                    onSubmit ={enviarDatosCreacionUsuario}>
                        <h1 className="bg-white text-center border-2">Creacion Usuario</h1>
                        <div className="bg-white p-4 border-b-2 border-l-2 border-r-2">

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="primer_nombre"
                            errorMessage="Ingrese el primer nombre"
                            label="Primer_nombre"
                            labelPlacement="outside"
                            placeholder="Luz"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="segundo_nombre"
                            errorMessage="Ingrese el segundo nombre"
                            label="Segndo_nombre"
                            labelPlacement="outside"
                            placeholder="Bibiana"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="primer_apellido"
                            errorMessage="Ingrese el primer apellido"
                            label="Primer_apellido"
                            labelPlacement="outside"
                            placeholder="Tobón"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="segundo_apellido"
                            errorMessage="Ingrese el segundo apellido"
                            label="Segundo_apellido"
                            labelPlacement="outside"
                            placeholder="Mazo"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="numero_cedula"
                            errorMessage="Ingrese el Numero Cedula"
                            label="Numero_cedula"
                            labelPlacement="outside"
                            placeholder="000000"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="lugar_expedicion_cedula"
                            errorMessage="Ingrese el Lugar de Expedicion"
                            label="Lugar Expedicion Cedula"
                            labelPlacement="outside"
                            placeholder="Medellín"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="nombre_usuario"
                            errorMessage="Ingrese el Nombre_Usuario"
                            label="Usuario"
                            labelPlacement="outside"
                            placeholder="LB1547"
                            type = "text"
                            />

                            <Input
                            className="border-2 rounded-xl mb-2"
                            isRequired
                            name="contraseña_usuario"
                            errorMessage="Ingrese la Contraseña"
                            label="Contraseña"
                            labelPlacement="outside"
                            placeholder="L77B88"
                            type = "text"
                            />

                            <Select
                            className="border-2 mb-2"
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
                    
                    {/* Form control diligenciamiento */}
                    <Form className="bg-white min-w-1/3 max-w-1/2 border-2 h-full"
                    onSubmit={actualizarEstadoDiligenciamiento}>
                        <h1 className="border-b-2 text-center">Permitir Diligenciamiento</h1>
                        <div className="p-4">
                            <Input
                            className="border-2 mb-2"
                            placeholder="#######"
                            onChange={setCedulaUsuarioABuscar}
                            label="Cedula Usuario"
                            labelPlacement="outside"
                            
                            />
                            <button
                            className="bg-blue-300 w-full hover:bg-blue-400 border-2 rounded-xl mb-4"
                             onClick={BuscarUsuariosXCedula}>Filtrar Usuarios</button>
                        
                            <Select
                            className="border-2 mb-2"
                            isRequired
                            label="Seleccionar Usuarios"
                            labelPlacement="outside"
                            name="usuario_seleccionado"
                            onChange={setUsuarioSeleccionado}
                            >
                            
                             {usuarioBuscadoXCedula.map((dato)=>(
                                <SelectItem
                                className="bg-white border-2"    
                                key={dato.id}
                                >
                                    {dato.nombre_completo}
                                </SelectItem>
                             ))}

                            </Select>
                            
                             <Select
                             className="bg-white border-2"
                             isRequired
                             label="Estado Diligenciamiento"
                             labelPlacement="outside"
                             onChange={setEstadoDiligenciamiento}>
                                <SelectItem
                                className=" border-2 bg-white"
                                key='1'>
                                    Puede Diligenciar
                                </SelectItem>
                                
                                <SelectItem
                                className=" border-2 bg-white"
                                key='2'>
                                    No Puede Diligenciar
                                </SelectItem>

                             </Select>
                        </div>
                        <div className="text-center">
                            <button
                            className="bg-blue-300 text-center w-full border-2 rounded-xl mb-2"
                             type="submit">
                                Actualizar Estado Diligenciamiento
                            </button>
                        </div>
                        <h1>{mensajeEstadoDiligenciamiento}</h1>
                    </Form>
                    <br />
                </div>
                <br />
                <button className="bg-blue-300 transition hover:bg-blue-400 min-w-1/6 max-w-1/5 border-2 rounded-xl mb-2 p-2"
                 onClick={traerUsuariosTablaDatos}>Llenar Usuarios</button>
                 
                 
                 <table className="bg-white ">
                    <tr className="border-2">
                        <th className="border-2 px-2">Nombre_completo</th>
                        <th className=" border-2 px-2">CC</th>
                        <th className="border-2 px-2">Usuario</th>
                        <th className="border-2 px-2">Contraseña</th>
                        <th className=" border-2 px-2">Diligenciado</th>
                        <th className=" border-2 px-2">TipoUsuario</th>
                    </tr>
                  {datosTablaUsuarios.map((dato) => (
                        <tr className="border-2">
                            <td className="border-2 px-3"
                            key='nombre_completo'>
                                {dato.nombre_Completo}
                            </td>
                            <td className="border-2 px-3" 
                            key='cedula_ciudadania'>
                                {dato.cedula_ciudadania}
                            </td>
                            <td className="border-2 px-3" 
                            key='usuario'>
                                {dato.nombre_usuario}
                            </td>
                            <td className="border-2 px-3"
                            key='contraseña'>
                                {dato.contraseña}
                            </td>
                            <td className="border-2 px-3"
                            key='diligenciado'>
                                {dato.falta_por_diligenciar == 1? 'No':'Si'}
                            </td>
                            <td className="border-2 px-3"
                            key='tipoUsuario'>
                                {dato.auditor =='AuditorPefilSocioDemografico'?'Auditor':'Empleado'}
                            </td>
                        </tr>
                        ))}
                 </table>
            </div>
        )
    }

    
    return( 
        <div className=" w-screen h-screen">
            <div className="bg-blue-500 flex flex-column ">
                <div>
                    {preguntas.map((pregunta)=>(
                        <h1 key='1'>{pregunta}</h1>
                    ))}
                </div>

            </div>
        </div>


    )
}

export default Formi;
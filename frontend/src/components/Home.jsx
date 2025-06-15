import { useNavigate } from "react-router-dom";

function Home(){
    const navegador = useNavigate() 
    const manejarRedireccionEntradaAFormualrio =()=>{
        navegador("/login")
    }
    return(
        <div className="min-h-screen bg-black  p-8 " >
            <div className="flex flex-col bg-gray-800 rounded-xl ">
                <h1 className="text-center  text-gray-900 m-2 bg-blue-200 rounded-xl hover:bg-blue-600 transition">
                    Bienvenido
                    <br />
                    El objetivo de este modulo es recopilar datos de su PerfilSocioDemografico
                </h1>
            </div>
            
                <div className="flex flex-wrap  p-4 ">
                    <div className=" flex items-center border-2 rounded-xl bg-gray-200">
                        <h1 className=" ">Confidencialidad y uso responsable de los datos</h1>
                        <div className="border-l-4 p-4">
                            <p>
                            La información recolectada será tratada bajo estrictas normas de confidencialidad y protección de datos personales, conforme a la Ley 1581 de 2012. Los datos serán utilizados exclusivamente con fines estadísticos y de mejora del servicio. No se publicará ni compartirá información personal identificable.
                            Tu participación es muy valiosa
                            Agradecemos tu colaboración y tiempo. Tu aporte nos ayudará a seguir creciendo y mejorando para ti y para todos nuestros usuarios.
                            </p>
                        </div>
                    </div>
                    <br />
                    <div className="bg-gray-300  border-2 rounded-xl">
                        <h1 className="text-center border-b-4 py-5">¿Para qué se realiza esta encuesta?</h1>
                        <div className="p-4 ">
                            <p>
                                El objetivo de esta encuesta es conocer mejor las características sociales, familiares, económicas y demográficas de quienes forman parte de nuestra comunidad de atención. Esta información será clave para:
                                <br />
                                •	Diseñar e implementar estrategias de atención más ajustadas a sus necesidades reales.
                                <br />
                                •	Fortalecer la calidad de los servicios domiciliarios que ofrecemos.
                                <br />
                                •	Promover el bienestar integral de nuestros usuarios y sus familias.
                                <br />
                                <br />

                            </p>
                        </div>
                    </div>
                    <br />
                    <div className=" bg-gray-200 border-2  ">
                        <p className=" text-center ">¿Por qué de forma virtual?</p>
                        <div className="border-l-4 pl-3">
                                <br />
                                La encuesta se realizará de manera virtual por las siguientes razones:
                                <br />
                                •	Comodidad y acceso: Puedes responderla desde casa, sin necesidad de desplazamientos.
                                <br />
                                •	Agilidad: El formato digital permite procesar los datos más rápido y con mayor seguridad.
                                <br />
                                •	Compromiso ambiental: Al no usar papel ni transporte físico, contribuimos con el cuidado del medio ambiente, reduciendo el consumo de recursos y nuestra huella ecológica.
                        </div>
                    </div>
                </div>
                <div className="">
                    <button onClick={manejarRedireccionEntradaAFormualrio} className="w-full h-full text-center border-2 rounded-xl  p-2 bg-blue-300 hover:bg-blue-500 transition">Continuar al Diligenciamiento</button>
                </div>
        </div>
    )
}

export default Home;
function Home(){
    return(
        <div className="h-[100vh] bg-gray-200  p-8 " >
            <div className="flex flex-col bg-gray-800 rounded-xl ">
                <h1 className="text-center  text-gray-900 m-2 bg-blue-200 rounded-xl hover:  transition">
                    Bienvenido
                    <br />
                    El objetivo de este modulo es recopilar datos de su PerfilSocioDemografico
                </h1>
            </div>
            
                <div className="flex flex-wrap p-4 ">
                    <div className="bg-blue-200 w-1/2 text-center border-4 rounded-xl">
                        <h1 className="border-b-2">Confidencialidad y uso responsable de los datos</h1>
                        <div className="">
                            <p>
                            La información recolectada será tratada bajo estrictas normas de confidencialidad y protección de datos personales, conforme a la Ley 1581 de 2012. Los datos serán utilizados exclusivamente con fines estadísticos y de mejora del servicio. No se publicará ni compartirá información personal identificable.
                            Tu participación es muy valiosa
                            Agradecemos tu colaboración y tiempo. Tu aporte nos ayudará a seguir creciendo y mejorando para ti y para todos nuestros usuarios.
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-400 w-1/2 text-center border-4 rounded-xl">
                        <h1 className="border-b-2">¿Para qué se realiza esta encuesta?</h1>
                        <div className=" ">
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
                                <p className=" text-center ">¿Por qué de forma virtual?</p>
                                <br />
                                La encuesta se realizará de manera virtual por las siguientes razones:
                                <br />
                                •	Comodidad y acceso: Puedes responderla desde casa, sin necesidad de desplazamientos.
                                <br />
                                •	Agilidad: El formato digital permite procesar los datos más rápido y con mayor seguridad.
                                <br />
                                •	Compromiso ambiental: Al no usar papel ni transporte físico, contribuimos con el cuidado del medio ambiente, reduciendo el consumo de recursos y nuestra huella ecológica.

                            </p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Home;
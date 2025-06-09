create table tipos_vivienda(id int primary key,
                            tipo varchar(30)
                            )
create table estados_civiles(id int primary key,
                            estado_civil varchar(50)
                            )
create table estratos_socioeconomicos ( id int primary key,
                                        estrato varchar(3)
                                        )
create table grupos_sanguineos (id int primary key,
                                grupo_sanguineo varchar(8)
                                )

create table rhs (id int primary key,
                    rh varchar(4)
                    )

create table epss(id int primary key,
                    eps varchar(30)
                    )
create table fondos_pension (id int primary key,
                            fondo_pension varchar(30)
                            )
create table tipos_cohabitacion (id int primary key,
                                tipo varchar(40)
                                )
create table tipos_contrato (id int primary key,
                            tipo_contrato varchar(30)
                            )
create table empresas ( id int primary key,
                        empresa varchyar(40)
                        )
create table areas (id int primary key,
                    area varchar(30)
                    )
create table cargos (id int primary key)

create tabla usuarios(id int primary key auto_increment,
                        primer_nombre varchar(30) not null,
                        segundo_nombre varchar(30) not null,
                        primer_apellido varchar(30) not null,
                        segundo_apellido varchar(30) not null,
                        cedula_ciudadania varchar(20) not null,
                        lugar_expedicion_cedula varchar(30) not null,
                        nombre_usuario varchar(20) not null,
                        contraseña_usuario varchar(20) not null,
                        fecha_realizacion date,
                        lugar_nacimiento varchar(50),
                        fecha_nacimiento DATE,
                        direccion_residencia varchar(50),
                        municipio_residencia_con_barrio_o_zona varchar(100),
                        tipo_vivienda int,
                        estado_civil int,
                        hobbies varchar(200),
                        edad int,
                        telefono varchar(20),
                        estrato_socioeconomico int,
                        antiguedad_zona_residencia varchar(20),
                        correo_electronico varchar(100),
                        peso_kg int ,
                        grupo_sanguineo int,
                        rh int,
                        estatura varchar(9),
                        eps int,
                        fondo_pension int,
                        numero_de_hijos int,
                        tipo_cohabitacion int,
                        personas_al_cargo int,
                        tipo_contrato int,
                        empresa int,
                        ingresos_mensuales int,
                        desempeña_otro_empleo varchar(40),
                        area int,
                        cargo int,

                        Foreign key (tipo_vivienda) references tipos_vivienda (id),
                        Foreign key (estado_civil) references estados_civiles (id),
                        Foreign key (estrato_socioeconomico) references estratos_socioeconomicos (id),
                        Foreign key (grupo_sanguineo) references grupos_sanguineos (id),
                        Foreign key (rh) references rhs (id),
                        Foreign key (eps) references epss (id),
                        Foreign key (fondo_pension) references (id),
                        Foreign key (tipo_cohabitacion) references (id),
                        Foreign key (tipo_contrato) references tipos_contrato (id),
                        Foreign key (empresa) references empresas (id),
                        Foreign Key (area) references areas (id),
                        Foreign Key (cargo) references cargos (id)




                        )
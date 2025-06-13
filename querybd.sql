create table tipos_vivienda(id int primary key,
                            tipo varchar(30)
                            );
create table estados_civiles(id int primary key,
                            estado_civil varchar(50)
                            );
create table estratos_socioeconomicos ( id int primary key,
                                        estrato varchar(3)
                                        );
create table grupos_sanguineos (id int primary key,
                                grupo_sanguineo varchar(8)
                                );

create table rhs (id int primary key,
                    rh varchar(4)
                    );

create table epss(id int primary key,
                    eps varchar(30)
                    );

create table fondos_pension (id int primary key,
                            fondo_pension varchar(30)
                            );

create table tipos_cohabitacion (id int primary key,
                                tipo varchar(40)
                               );

create table tipos_contrato (id int primary key,
                            tipo_contrato varchar(30)
                            );

create table empresas ( id int primary key,
                        empresa varchar(40)
                        );

create table areas (id int primary key,
                    area varchar(30)
                    );

create table cargos (id int primary key,
                    cargo varchar(40)
                    );
                    
create table cargos_ocultos(id int primary key,
                            cargo varchar (60)
                            );

create table tipos_transporte(id int primary key,
                            transporte varchar(50)
                            );

create table niveles_educativos (id int primary key,
                                nivel varchar(50)
                                );

create table usuarios(id int primary key auto_increment,
                        primer_nombre varchar(30) not null,
                        segundo_nombre varchar(30) ,
                        primer_apellido varchar(30) not null,
                        segundo_apellido varchar(30) not null,
                        cedula_ciudadania varchar(20) not null,
                        lugar_expedicion_cedula varchar(30) not null,
                        nombre_usuario varchar(20) not null,
                        contraseña_usuario varchar(20) not null,
                        cargo int,
                        valido_para_diligenciamiento int,
                        Foreign Key (cargo) references cargos_ocultos (id)
                        );



create table respuestas_formulario(id int primary key auto_increment,
                                    usuario_id int,
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
                                    fecha_ingreso_empresa date,
                                    antiguedad_oficio int,
                                    examen_ingreso date,
                                    tipo_transporte int,
                                    tiempo_empleado_para_la_llegada_trabajo varchar(30) ,
                                    nombre_contacto_emergencia varchar(60),
                                    telefono_contacto_emergencia varchar(20),
                                    usa_anteojos varchar(10),
                                    molestias_osteomusculares varchar(30),
                                    fobias varchar (40),
                                    enfermedades_padecidas varchar(100),
                                    alergias varchar (100),
                                    medicamentos_permanentes varchar(100),
                                    nivel_estudio int,

                                    Foreign key (usuario_id) references usuarios (id),
                                    Foreign key (tipo_vivienda) references tipos_vivienda (id),
                                    Foreign key (estado_civil) references estados_civiles (id),
                                    Foreign key (estrato_socioeconomico) references estratos_socioeconomicos (id),
                                    Foreign key (grupo_sanguineo) references grupos_sanguineos (id),
                                    Foreign key (rh) references rhs (id),
                                    Foreign key (eps) references epss (id),
                                    Foreign key (fondo_pension) references fondos_pension (id),
                                    Foreign key (tipo_cohabitacion) references tipos_cohabitacion (id),
                                    Foreign key (tipo_contrato) references tipos_contrato (id),
                                    Foreign key (empresa) references empresas (id),
                                    Foreign Key (area) references areas (id),
                                    Foreign Key (cargo) references cargos (id),
                                    Foreign key (tipo_transporte) references tipos_transporte (id),
                                    Foreign Key (nivel_estudio) references niveles_educativos (id)
                                    );

insert into tipos_vivienda (id,tipo) values (1,"Propia"),(2,"Arrendada"),(3,"Familiar");
insert into estados_civiles (id,estado_civil) values (1,"Soltero"),(2,"Viudo"),(3,"Casado"),(4,"Union Libre"),(5,"No aplica");
insert into estratos_socioeconomicos (id,estrato) values (1,"1"),(2,"2"),(3,"3"),(4,"4"),(5,"5"),(6,"6");
insert into grupos_sanguineos (id,grupo_sanguineo) values (1,"0"),(2,"A"),(3,"B"),(4,"AB");
insert into rhs (id,rh) values (1,"-"),(2,"+");

INSERT INTO epss (id, eps) VALUES
(1, 'NUEVA EPS'),
(2, 'SURA'),
(3, 'SANITAS'),
(4, 'SALUD TOTAL'),
(5, 'COMPENSAR'),
(6, 'FAMISANAR'),
(7, 'COOMEVA EPS'),
(8, 'MEDIMÁS'),
(9, 'ALIANSALUD'),
(10, 'SOS EPS'),
(11, 'ECOOPSOS'),
(12, 'EMSSANAR'),
(13, 'ASMET SALUD'),
(14, 'CAPRESOCA'),
(15, 'MUTUAL SER'),
(16, 'SAVIA SALUD'),
(17, 'DUSAKAWI EPSI'),
(18, 'PIJAOS SALUD EPSI'),
(19, 'MALLAMAS EPSI'),
(20, 'AIC EPSI');

INSERT INTO fondos_pension (id, fondo_pension) VALUES
(1, 'COLFONDOS'),
(2, 'PROTECCIÓN'),
(3, 'PORVENIR'),
(4, 'SKANDIA'),
(5, 'FONDO NACIONAL DE PRESTACIONES SOCIALES DEL MAGISTERIO - FOMAG'),
(6, 'CÁJANAL'),
(7, 'FERROCARRILES NACIONALES'),
(8, 'INSTITUTO DE SEGUROS SOCIALES-ISS');

insert into tipos_cohabitacion(id,tipo) values (1,"Familia"),(2,"Particulares"),(3,"Solo"),(4,"Otro");
insert into tipos_contrato (id,tipo_contrato) values (1,"Personal Vinculado"),(2,"Prestacion de Servicios"),
(3,"Indefinifo"),(4,"Termino Fijo"),(5,"Obra Labor");
insert into empresas (id,empresa) values (1,"IPS TERAPIAS INTEGRALES DOMICILIARIAS"),(2,"SUASESORIA");
insert into areas (id,area) values (1,"ADMINISTRATIVO"),(2,"ASISTENCIAL");
INSERT INTO cargos (id, cargo) VALUES (1, 'Antibiotico'), (2, 'Cuidador'), (3, 'Permanente'),(5,'Nutricionista'),
(6,'Psicologo'),(7,'Terapeuta Fisico'),(8,'Terapeuta ocupacional'),(9,'Terapeuta Respiratorio'),(10,'Fonoaudiolgo'),(11,'Medico General');
insert into cargos_ocultos (id,cargo) values (4,'AuditorPefilSocioDemografico');
insert into tipos_transporte (id,transporte) values (1,"Publico"),(2,"Moto"),(3,"Carro"),(4,"Bicicleta");
insert into niveles_educativos (id, nivel) values (1,"Primaria"),(2,"Secundaria"),(3,"Universitario"),(4,"Postgrado"),(5,"Maestria");

insert into usuarios (primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,cedula_ciudadania,lugar_expedicion_cedula,nombre_usuario,contraseña_usuario) values ("Luz","Bibiana","Tobón","Mazo","0000000","KETI","BIBI",0);

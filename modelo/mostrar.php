<?php

//Iniciamos session
session_start();

// la clase Mostrar donde todas las consultas sql 
class Mostrar
{
    // recuperamos los datos de los cursos
    public static function listar($conn)
    {
        $sql = "SELECT c.idcursos, c.curso, c.horas, " .
            "concat(c.precio, ' €') as Precio, " .
            " concat(c.descuento, ' %') as Descuento, " .
            "concat(round((c.precio/100)*(100-c.descuento),2), ' €') as Total, " .
            " c.descripcion FROM cursos c";
        $resultado = $conn->prepare($sql);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }


    // fuction para recuperar el estado del login
    public static function iniciarSesion($username, $password, $conn)
    {
        try {
            $sql = "SELECT * FROM usuarios u WHERE usuario=:usuario";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(":usuario", $username);
            $resultado->execute();
            if ($resultado->rowCount() > 0) {
                while ($datas = $resultado->fetch()) {
                    // Cuando el usuario está identificado con el password y permisos puede acceder a la página del profesor. 
                    if ($datas['permiso'] == 3) {
                        if (password_verify($password,  $datas['password1'])) {
                            $_SESSION['usuario'] = $datas['usuario'];
                            $_SESSION['nombre'] = $datas['nombre'];
                            $_SESSION['apellido'] = $datas['apellido'];
                            $_SESSION['idpersonas'] = $datas['idpersonas'];
                            $_SESSION['foto'] = $datas['foto'];
                            return 3; //profesor
                        } else {
                            return 10;
                        }
                    } elseif ($datas['permiso'] == 0) {
                        return 0; //el profesor está bloqueado
                    }
                    // Cuando el usuario está identificado con el password y permisos puede acceder a la página del alumno. 
                    if ($datas['permiso'] == 2) {
                        // nota el password1 de la base de datos tienen que ser varchar 255 caracteres
                        // if (password_verify($password, $datas["password1"]) ||true) {
                        if (password_verify($password, $datas["password1"])) {
                            $_SESSION['usuario'] = $datas['usuario'];
                            $_SESSION['nombre'] = $datas['nombre'];
                            $_SESSION['apellido'] = $datas['apellido'];
                            $_SESSION['idpersonas'] = $datas['idpersonas'];
                            $_SESSION['foto'] = $datas['foto'];
                            return 2; //alumnos
                        } else {
                            return 10;
                        }
                    }
                    // Cuando el usuario está identificado con el password y permisos puede acceder a la página del administrador. 
                    if ($datas['permiso'] == 4) {
                        if (password_verify($password, $datas['password1'])) {
                            $_SESSION['usuario'] = $datas['usuario'];
                            $_SESSION['nombre'] = $datas['nombre'];
                            $_SESSION['apellido'] = $datas['apellido'];
                            $_SESSION['idpersonas'] = $datas['idpersonas'];
                            $_SESSION['foto'] = $datas['foto'];
                            return 4; //administrador
                        } else {
                            return 10;
                        }
                    } elseif ($datas['permiso'] == 10) {
                        return 0; //bloqueado
                    }
                }
            } else {
                return 11; //el usuario no está en la base de datos
            }
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // muestra en el encabezado los datos del alumno
    public static function valoresCabeceraAlumno($conn, $idalumno)
    {
        try {
            $sql = "SELECT u.nombre, u.apellido, u.email, u.telefono, timestampdiff(year, u.fecha, curdate()) " .
                " as edad from usuarios u WHERE idpersonas=:id";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(":id", $idalumno);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // public static function listarMatricula($conn, $id)
    // {
    //     try {
    //         $sql = "SELECT m.idmatricula, u.usuario, u.nombre, u.apellido, TIMESTAMPDIFF(year, u.fecha, curdate()) as edad, " .
    //             "u.dni, u.email, u.telefono, c.curso, u.fecha, c.horas, c.precio, c.descuento, m.nota FROM usuarios u inner join matricula m on " .
    //             " u.idpersonas=m.alumnos_usuarios_idpersonas inner join cursos c on c.idcursos=m.cursos_idcursos " .
    //             "WHERE u.idpersonas=:id";
    //         $resultado = $conn->prepare($sql);
    //         $resultado->bindValue(":id", $id);
    //         $resultado->execute();
    //         $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
    //         return $data;
    //     } catch (Exception $e) {
    //         return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
    //     }
    // }

    // muestra un listado de las facturas del alumno
    public static function listarFacturas($conn, $id)
    {
        $sql = "SELECT f.idfactura, u.nombre, u.apellido, u.dni, u.email, c.curso, c.horas, concat(c.precio, ' €') as precio, " .
            "concat(c.descuento , ' %') as Descuento, concat(round(c.precio- (c.precio*c.descuento)/100, 2),' €') as Total, " .
            "m.nota, f.pagado, f.fecha from matricula m inner join usuarios u on u.idpersonas=m.alumnos_usuarios_idpersonas " .
            "inner join cursos c on c.idcursos=cursos_idcursos inner join factura f on f.matricula_idmatricula=m.idmatricula " .
            "wHERE m.alumnos_usuarios_idpersonas=:id";
        $resultado = $conn->prepare($sql);
        $resultado->bindValue(":id", $id);
        $resultado->execute();
        $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }


    // recuperamos los datos del alumno
    public static function modificarAlumno($conn, $id)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE idpersonas=:id";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(":id", $id);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // function para actualizar los datos del usuario (alumno ó profesor) cuando tiene file o no.
    public static function updateAlumnos($conn, $idAlumno, $nombre, $apellido, $edad, $dni, $email, $foto, $telefono)
    {
        try {
            if ($foto == "no") {
                // update usuarios cuando no hay imagen para modificar
                $sql = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, fecha=:edad, dni=:dni, email=:email, " .
                    "telefono=:telefono " .
                    "WHERE idpersonas=:id";
                $resultado = $conn->prepare($sql);
            } else {
                // update usuarios cuando queremos modificar la imagen
                $sql = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, fecha=:edad, dni=:dni, email=:email, " .
                    "foto=:foto, telefono=:telefono " .
                    "WHERE idpersonas=:id";
                $resultado = $conn->prepare($sql);
                $resultado->bindValue(':foto', $foto);
            }
            $resultado->bindValue(":nombre", $nombre);
            $resultado->bindValue(":apellido", $apellido);
            $resultado->bindValue(":edad", $edad);
            $resultado->bindValue(":dni", $dni);
            $resultado->bindValue(":email", $email);
            $resultado->bindValue(":telefono", $telefono);
            $resultado->bindValue(":id", $idAlumno);
            $resultado->execute();
            return true;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // recuperamos el curso y la descripcion de los datos del curso para mostrar
    public static function verListaCurso($conn, $id)
    {
        try {
            $sql = "select m.idmatricula, c.curso, c.descripcion " .
                "from matricula m inner join cursos c on m.cursos_idcursos= c.idcursos where m.idmatricula=:idmatricula";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(":idmatricula", $id);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // muestra un listado de las matriuclas del alumno
    public static function listadoMatriculaProfesores($conn, $id)
    {
        try {
            $sql = "SELECT u.idpersonas, m.idmatricula, u.nombre, u.apellido, TIMESTAMPDIFF(year, u.fecha, curdate()) as edad, u.dni, u.email, u.telefono, u.foto, c.curso,  m.nota, m.fecha, c.horas " .
                "FROM matricula m INNER JOIN usuarios u ON u.idpersonas=m.alumnos_usuarios_idpersonas " .
                "INNER JOIN cursos c ON c.idcursos=m.cursos_idcursos " .
                "WHERE m.profesores_usuarios_idpersonas=:idProfesor";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idProfesor', $id);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // recuperamos los datos de los alumnos y cursos por medio de un select
    public static function listarAlumnos($conn, $permiso)
    {
        try {
            $sql = "SELECT * FROM usuarios u WHERE u.permiso=:permiso";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':permiso', $permiso);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);

            $sql1 = "SELECT * FROM cursos";
            $resultado1 = $conn->prepare($sql1);
            $resultado1->execute();
            $data1 = $resultado1->fetchAll(PDO::FETCH_ASSOC);

            $valor['alumno'] = $data;
            $valor['curso'] = $data1;
            return $valor;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // insertamos los datos de la matricula
    public static function insertarMatricula($conn, $idcursos, $idalumno, $idpersonasProfesor, $matriculaFecha, $notaMatricula)
    {
        try {
            $sql = "INSERT INTO matricula (cursos_idcursos, alumnos_usuarios_idpersonas, profesores_usuarios_idpersonas, fecha, nota) " .
                "VALUES (:curso, :alumno, :profesor, :fecha, :nota)";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':curso', $idcursos);
            $resultado->bindValue(':alumno', $idalumno);
            $resultado->bindValue(':profesor', $idpersonasProfesor);
            $resultado->bindValue(':fecha', $matriculaFecha);
            $resultado->bindValue(':nota', $notaMatricula);
            $resultado->execute();
            return "Datos insertados ok ";
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function para insertar nuevos usuarios como alumnos, profesores o administradores
    public static function insertarNuevoIdpersonas($conn, $usuario, $nombre, $apellido, $edad, $dni, $email, $foto, $telefono, $password1, $permiso, $descripcion)
    {
        try {
            $sql = "INSERT INTO usuarios (usuario, nombre, apellido, fecha, dni, email, foto, telefono, password1, permiso, descripcion) " .
                "values(:usuario, :nombre, :apellido, :fecha, :dni, :email, :foto, :telefono, :password1, :permiso, :descripcion)";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':usuario', $usuario);
            $resultado->bindValue(':nombre', $nombre);
            $resultado->bindValue(':apellido', $apellido);
            $resultado->bindValue(':fecha', $edad);
            $resultado->bindValue(':dni', $dni);
            $resultado->bindValue(':email', $email);
            $resultado->bindValue(':foto', $foto);
            $resultado->bindValue(':telefono', $telefono);
            // crea un nuevo hash de contraseña usando un algoritmo de hash fuerte de único sentido
            $passHush1 = password_hash($password1, PASSWORD_DEFAULT);
            $resultado->bindValue(":password1", $passHush1);
            $resultado->bindValue(':permiso', $permiso);
            $resultado->bindValue(':descripcion', $descripcion);
            $resultado->execute();

            // Recuperamos el último registro insertado
            $sql1 = "select MAX(idpersonas) as idpersonas FROM usuarios";
            $resul = $conn->prepare($sql1);
            $resul->execute();

            if ($permiso == 2) { //insertamos el id del alumno
                while ($datas = $resul->fetch()) {
                    $idAlumnos = $datas['idpersonas'];
                    $sql = "INSERT INTO alumnos (usuarios_idpersonas) VALUES ($idAlumnos)";
                    $resul = $conn->prepare($sql);
                    $resul->execute();
                    return true;
                }
            } else if ($permiso == 3 || $permiso == 0) { //insertamos el id del profesor
                while ($datas = $resul->fetch()) {
                    $idProfesores = $datas['idpersonas'];
                    $sql = "INSERT INTO profesores (usuarios_idpersonas) VALUES ($idProfesores)";
                    $resul = $conn->prepare($sql);
                    $resul->execute();
                    return true;
                }
            } else if ($permiso == 4 || $permiso == 10) { //insertamos el id del administrador
                while ($datas = $resul->fetch()) {
                    $idAdministrador = $datas['idpersonas'];
                    $sql = "INSERT INTO administrador (usuarios_idpersonas) VALUES ($idAdministrador)";
                    $resul = $conn->prepare($sql);
                    $resul->execute();
                    return true;
                }
            }
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }





    // borrado de las matriculas de los alumnos
    public static function deleteMatricula($conn, $idmatricula)
    {
        try {
            $sql = "DELETE FROM matricula WHERE idmatricula=:idmatricula";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idmatricula', $idmatricula);
            $resultado->execute();
            return true;
        } catch (Exception $ex) {
            echo "ERROR: " . $ex->getCode() . ", " . $ex->getMessage();
        }
    }

    // borrado de usuarios de la base de datos
    public static function deleteUsuarios($conn, $idpersonas)
    {
        try {
            $sql = "DELETE FROM usuarios WHERE idpersonas=:idpersonas";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idpersonas', $idpersonas);
            $resultado->execute();
            //si borramos devuelve 1
            return $resultado->rowCount();
        } catch (Exception $ex) {
            echo "ERROR: " . $ex->getCode() . ", " . $ex->getMessage();
        }
    }

    // recuperamos los datos de la matrícula para modificar
    public static function recuperarMatricula($conn, $idmatricula)
    {
        try {
            $sql = "SELECT * FROM matricula m WHERE m.idmatricula=:idmatricula";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idmatricula', $idmatricula);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // actualizamos los datos de la matricula
    public static function matriculaUpdate($conn, $idmatricula, $idcursos, $idalumno, $idpersonasProfesor, $matriculaFecha, $notaMatricula)
    {
        try {
            $sql = "UPDATE matricula SET cursos_idcursos=:idcursos, alumnos_usuarios_idpersonas =:idalumno, " .
                "profesores_usuarios_idpersonas=:idpersonasProfesor, fecha =:matriculaFecha, nota=:notaMatricula " .
                "WHERE idmatricula=:idmatricula";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idmatricula', $idmatricula);
            $resultado->bindValue(':idcursos', $idcursos);
            $resultado->bindValue(':idalumno', $idalumno);
            $resultado->bindValue(':idpersonasProfesor', $idpersonasProfesor);
            $resultado->bindValue(':matriculaFecha', $matriculaFecha);
            $resultado->bindValue(':notaMatricula', $notaMatricula);
            $resultado->execute();
            return true;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // modificamos el passowrd de los usuarios
    public static function modificarpassword($conn, $idpersonas, $password1)
    {
        try {
            $sql = "UPDATE usuarios SET password1=:password1 WHERE idpersonas=:id";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':id', $idpersonas);
            // password_hash() crea un nuevo hash de contraseña usando un algoritmo de hash fuerte de único sentido.
            $passHush1 = password_hash($password1, PASSWORD_DEFAULT);
            $resultado->bindValue(":password1", $passHush1);
            $resultado->execute();
            return $resultado->rowCount();
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // muestra un listado de las matriculas del alumno
    public static function listarMatriculaProfesor($conn, $idpersonas)
    {
        try {
            $sql = " SELECT m.idmatricula, u.nombre, u.apellido, u.email, u.telefono, u.foto, m.fecha,  c.curso, m.nota,  c.horas " .
                "FROM matricula m inner join usuarios u on m.profesores_usuarios_idpersonas=u.idpersonas inner join cursos c on " .
                "m.cursos_idcursos=c.idcursos WHERE m.alumnos_usuarios_idpersonas=:id";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':id', $idpersonas);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // muestra un listado de los alumnos 
    public static function listadoAlumno($conn, $permiso)
    {
        try {
            $sql = "select u.idpersonas, u.usuario, u.nombre, u.apellido, u.fecha, timestampdiff(year, u.fecha, curdate()) as edad, " .
                "u.dni, u.email, u.telefono, u.foto from usuarios u where permiso=:permiso";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':permiso', $permiso);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // comprobamos que el usuario no este repetido en la base de datos
    public static function buscarUsuario($conn, $repetidoUsuario)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE usuario=:repetidoUsuario";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':repetidoUsuario', $repetidoUsuario);
            $resultado->execute();
            $aux = $resultado->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($aux)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // muestra un listado de los cursos en una tabla
    public static function listadoCursos($conn)
    {
        try {
            $sql = "SELECT c.idcursos, c.curso, c.horas, concat(c.precio, ' €') AS precio, concat(c.descuento , ' %') AS Descuento, " .
                "concat(round(c.precio- (c.precio*c.descuento)/100, 2),' €') as Total, c.descripcion  FROM cursos c";
            $resultado = $conn->prepare($sql);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // insertamos datos del curso en la base de datos
    public static function insertarCursosNuevo($conn, $curso, $horas, $precio, $descuento, $descripcion)
    {
        try {
            $sql = "INSERT INTO cursos (curso, horas, precio, descuento, descripcion) VALUES (:curso, :horas, :precio, :descuento, :descripcion)";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':curso', $curso);
            $resultado->bindValue(':horas', $horas);
            $resultado->bindValue(':precio', $precio);
            $resultado->bindValue(':descuento', $descuento);
            $resultado->bindValue(':descripcion', $descripcion);
            $resultado->execute();
            // si todo es correcto y los datos son insertados devuelve 2
            return 2;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // recuperamos los datos del curso por el id
    public static function listadoCursoIdcuros($conn, $idcursos)
    {
        try {
            $sql = "SELECT * FROM cursos c WHERE c.idcursos=:idcursos";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idcursos', $idcursos);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // upadate los datos del curso
    public static function updateCursos($conn, $idcursos, $curso, $horas, $precio, $descuento, $descripcion)
    {
        try {
            $sql = "UPDATE cursos SET curso=:curso, horas=:horas, precio=:precio, descuento=:descuento, descripcion=:descripcion " .
                "WHERE idcursos=:idcursos";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idcursos', $idcursos);
            $resultado->bindValue(':curso', $curso);
            $resultado->bindValue(':horas', $horas);
            $resultado->bindValue(':precio', $precio);
            $resultado->bindValue(':descuento', $descuento);
            $resultado->bindValue(':descripcion', $descripcion);
            $resultado->execute();
            // si todo es correcto devuelve un 1
            return $resultado->rowCount();
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // borramos los datos del curso seleccionado por el id
    public static function deleteCursos($conn, $idcursos)
    {
        try {
            $sql = "DELETE FROM cursos WHERE idcursos=:idcursos";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idcursos', $idcursos);
            $resultado->execute();
            return $resultado->rowCount();
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // funcion que muestra un listado de las facturas que tiene cada profesor
    public static function listadoFacturasProfesor($conn, $idpersonasProfesor)
    {
        try {
            $sql = "select m.idmatricula, f.idfactura, u.nombre, u.apellido, u.foto, u.dni, u.email, u.telefono, c.curso, c.horas, concat(c.precio, ' €') as precio, " .
                "concat(c.descuento, ' %') as descuento, concat(round(c.precio- (c.precio*c.descuento)/100, 2),' €') as total, " .
                "m.nota, f.pagado, f.fecha from matricula m inner join usuarios u on m.alumnos_usuarios_idpersonas=u.idpersonas " .
                "inner join cursos c on c.idcursos=m.cursos_idcursos inner join factura f on f.matricula_idmatricula= m.idmatricula " .
                "where m.profesores_usuarios_idpersonas=:idpersonasProfesor";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue('idpersonasProfesor', $idpersonasProfesor);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function que recupera las matrículas de los alumnos que aún no tienen facturas  (left join)
    public static function selectMatriculaAlumno($conn, $idpersonasProfesor)
    {
        try {
            $sql = "select m.idmatricula, u.nombre, u.apellido, c.curso from usuarios u inner join matricula m on u.idpersonas=m.alumnos_usuarios_idpersonas " .
                "inner join cursos c on m.cursos_idcursos=c.idcursos " .
                "left join factura f on m.idmatricula=f.matricula_idmatricula where f.matricula_idmatricula is null " .
                "and m.profesores_usuarios_idpersonas=:profesores_usuarios_idpersonas";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue('profesores_usuarios_idpersonas', $idpersonasProfesor);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function para insertar los datos de las facturas
    public static function insertarFacturaAlumnos($conn, $fechaFactura, $radiofactura, $idMatricula)
    {
        try {
            $sql = "INSERT INTO factura (fecha, pagado, matricula_idmatricula) VALUES (:fecha, :pagado, :matricula_idmatricula)";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':fecha', $fechaFactura);
            $resultado->bindValue(':pagado', $radiofactura);
            $resultado->bindValue(':matricula_idmatricula', $idMatricula);
            $resultado->execute();
            return 3;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function para modificar los datos de las facturas
    public static function modificarFacturas($conn, $idfactura, $fechaFactura, $radiofactura, $idMatricula)
    {
        try {
            $sql = "UPDATE factura SET fecha=:fecha, pagado=:pagado, matricula_idmatricula=:matricula_idmatricula WHERE idfactura=:idfactura";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue('fecha', $fechaFactura);
            $resultado->bindValue('pagado', $radiofactura);
            $resultado->bindValue('matricula_idmatricula', $idMatricula);
            $resultado->bindValue('idfactura', $idfactura);
            $resultado->execute();
            // si es correcto devuelve 2
            return 2;
            // return $resultado->rowCount();
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }




    // function para recuperar los datos de la matricula y mostrarlos en un select 
    public static function recuperarSelectFacturaUpdate($conn, $idpersonasProfesor)
    {
        try {
            $sql = "select m.idmatricula, f.idfactura, u.nombre, u.apellido, c.curso from matricula m inner join factura f on " .
                "m.idmatricula=f.matricula_idmatricula inner join usuarios u " .
                "on u.idpersonas=m.alumnos_usuarios_idpersonas inner join cursos c on " .
                "m.cursos_idcursos=c.idcursos where m.profesores_usuarios_idpersonas=:profesores_usuarios_idpersonas";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue('profesores_usuarios_idpersonas', $idpersonasProfesor);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function para borrar los datos de las facturas
    public static function deleteFacturas($conn, $idfactura)
    {
        try {
            $sql = "DELETE FROM factura WHERE idfactura=:idfactura";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idfactura', $idfactura);
            $resultado->execute();
            return true;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function que devuelve los datos del usuario 
    public static function idpersonasUpdate($conn, $idpersonas)
    {
        try {
            $sql = "SELECT * FROM usuarios WHERE idpersonas=:idpersonas";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':idpersonas', $idpersonas);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function que recuperamos los profesores ó administradores de la base de datos
    public static function administradorListadoProfesores($conn, $permiso)
    {
        try {
            // permisos con el 4 son administradores 
            if ($permiso == 4) {
                $sql = "SELECT u.idpersonas, u.usuario, u.nombre, u.apellido, timestampdiff(year, u.fecha, curdate()) AS edad, " .
                    "u.fecha, u.dni, u.email, u.telefono, u.foto, u.permiso from usuarios u WHERE u.permiso=:permiso OR u.permiso=10";
                // permisos con el 3 son los profesores
            } else if ($permiso == 3) {
                $sql = "SELECT u.idpersonas, u.usuario, u.nombre, u.apellido, timestampdiff(year, u.fecha, curdate()) AS edad, " .
                    "u.fecha, u.dni, u.email, u.telefono, u.foto, u.permiso from usuarios u WHERE u.permiso=:permiso OR u.permiso=0";
            }
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':permiso', $permiso);
            $resultado->execute();
            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $data;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }


    // function para modificar los permisos del administrador tiene dos opciones (permitido o bloqueado)
    public static function updateAdministradorPermisos($conn, $idpersonas, $permiso)
    {
        try {
            $sql = "UPDATE usuarios SET permiso=:permiso WHERE idpersonas=:idpersonas";
            $resultado = $conn->prepare($sql);
            $resultado->bindValue(':permiso', $permiso);
            $resultado->bindValue(':idpersonas', $idpersonas);
            $resultado->execute();
            return true;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }

    // function para actualizar los datos de los profesores y administradores 
    public static function updateProfesorAdministrador($conn, $id, $nombre, $apellido, $fechaNac, $telefono, $dni, $email, $foto, $permiso, $descripcion)
    {
        try {
            if ($foto == "no") { //si la actualización no tiene archivo imagen
                $sql = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, fecha=:fechaNac, telefono=:telefono, dni=:dni, email=:email, " .
                    " permiso=:permiso, descripcion=:descripcion WHERE idpersonas=:id";
                $resultado = $conn->prepare($sql);
            } else { // la actualización tiene un archivo imagen
                $sql = "UPDATE usuarios SET nombre=:nombre, apellido=:apellido, fecha=:fechaNac, telefono=:telefono, dni=:dni, email=:email, " .
                    "foto=:foto, permiso=:permiso, descripcion=:descripcion WHERE idpersonas=:id";
                $resultado = $conn->prepare($sql);
                $resultado->bindValue(':foto', $foto);
            }
            $resultado->bindValue(':nombre', $nombre);
            $resultado->bindValue(':apellido', $apellido);
            $resultado->bindValue(':fechaNac', $fechaNac);
            $resultado->bindValue(':telefono', $telefono);
            $resultado->bindValue(':dni', $dni);
            $resultado->bindValue(':email', $email);
            $resultado->bindValue('permiso', $permiso);
            $resultado->bindValue(':descripcion', $descripcion);
            $resultado->bindValue(':id', $id);
            $resultado->execute();
            return true;
        } catch (Exception $e) {
            return "Se produjo un error. Código: " . $e->getCode() . ", " . $e->getMessage(); //Guardamos en la variable el error producido.
        }
    }
}





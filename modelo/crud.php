<?php
// Recuperamos la conexión a la base de datos
include_once 'conexion.php';
// Recuperamos la clase mostrar.php
include_once 'mostrar.php';

// conexión a la base de datos
$obj = new Conexion();
$conexion = $obj->Conectar();

// Recepción de los datos enviados mediante POST desde el JS 
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idAlumno = (isset($_POST['idAlumno'])) ? $_POST['idAlumno'] : '';
$idpersonas = (isset($_POST['idpersonas'])) ? $_POST['idpersonas'] : '';
$repetidoUsuario = (isset($_POST['repetidoUsuario'])) ? $_POST['repetidoUsuario'] : '';

$username = (isset($_POST['username'])) ? $_POST['username'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';

$usuario = (isset($_POST['usuario'])) ? $_POST['usuario'] : '';
$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$apellido = (isset($_POST['apellido'])) ? $_POST['apellido'] : '';
$edad = (isset($_POST['edad'])) ? $_POST['edad'] : '';
$dni = (isset($_POST['dni'])) ? $_POST['dni'] : '';
$email = (isset($_POST['email'])) ? $_POST['email'] : '';
$telefono = (isset($_POST['telefono'])) ? $_POST['telefono'] : '';
$password1 = (isset($_POST['password1'])) ? $_POST['password1'] : '';
$idmatricula = (isset($_POST['idmatricula'])) ? $_POST['idmatricula'] : '';
$permiso = (isset($_POST['permiso'])) ? $_POST['permiso'] : '';


//variables de insertar/update matricula
$idMatricula = (isset($_POST['idMatricula'])) ? $_POST['idMatricula'] : '';
$idalumno = (isset($_POST['idalumno'])) ? $_POST['idalumno'] : '';
$idcursos = (isset($_POST['idcursos'])) ? $_POST['idcursos'] : '';
$idfactura = (isset($_POST['idfactura'])) ? $_POST['idfactura'] : '';
$matriculaFecha = (isset($_POST['matriculaFecha'])) ? $_POST['matriculaFecha'] : '';
$fechaNac = (isset($_POST['fechaNac'])) ? $_POST['fechaNac'] : '';
$fechaFactura = (isset($_POST['fechaFactura'])) ? $_POST['fechaFactura'] : '';
$radiofactura = (isset($_POST['radiofactura'])) ? $_POST['radiofactura'] : '';
if (isset($_POST['notaMatricula'])) {
    if ($_POST['notaMatricula'] === '') {
        $notaMatricula = (!empty($_POST['notaMatricula'])) ? $_POST['notaMatricula'] : NULL;
    } else {
        $notaMatricula = (isset($_POST['notaMatricula'])) ? $_POST['notaMatricula'] : '';
    }
}
$idpersonasProfesor = (isset($_POST['idpersonasProfesor'])) ? $_POST['idpersonasProfesor'] : '';
$tieneFileUpdateAlumno = (isset($_POST['tieneFileUpdateAlumno'])) ? $_POST['tieneFileUpdateAlumno'] : '';


// variables de los cursos
$curso = (isset($_POST['curso'])) ? $_POST['curso'] : '';
$horas = (isset($_POST['horas'])) ? $_POST['horas'] : '';
$precio = (isset($_POST['precio'])) ? $_POST['precio'] : '';
$descuento = (isset($_POST['descuento'])) ? $_POST['descuento'] : '';
$descripcion = (isset($_POST['descripcion'])) ? $_POST['descripcion'] : '';


// Condición switch para seleccionar opciones
switch ($opcion) {
    case 1:
        // muestra un listado de los cursos
        $data = Mostrar::listar($conexion);
        break;
    case 2:
        // para acceder a la página usuando usuario y password
        $data = Mostrar::iniciarSesion($username, $password, $conexion);
        break;
    case 3:
        // $data = Mostrar::listarMatricula($conexion, $idAlumno);
        break;
    case 4:
        // muestra un listado de las facturas del alumno
        $data = Mostrar::listarFacturas($conexion, $idAlumno);
        break;
    case 5:
        // recuperamos los datos del alumno
        $data = Mostrar::modificarAlumno($conexion, $idAlumno);
        break;
    case 6:
        // update alumnos cuando no hay imagen para modificar
        $foto = 'no';
        $data = Mostrar::updateAlumnos($conexion, $idAlumno, $nombre, $apellido, $edad, $dni, $email, $foto, $telefono);
        break;
    case 7:
        // update alumnos cuando queremos modificar la imagen
        if (is_array($_FILES) && count($_FILES) > 0) {
            if (($_FILES["files"]["type"] == "image/pjpeg") || ($_FILES["file"]["type"] == "image/jpeg")
                || ($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg")
                || ($_FILES["file"]["type"] == "image/gif")
            ) {
                if (move_uploaded_file($_FILES["file"]["tmp_name"], "../images/" . $_FILES['file']['name'])) {
                    $foto = "../images/" . $_FILES['file']['name'];
                    $data = Mostrar::updateAlumnos($conexion, $idAlumno, $nombre, $apellido, $edad, $dni, $email, $foto, $telefono);
                } else {
                    $data = 10; //error de archivo file
                }
            } else {
                $data = 20; //error de Extensiones                 
            }
        } else {
            $data = 30; //arvhivo files no encontrado
        }
        break;
    case 8:
        // recuperamos los datos del curso para mostrar por pantalla
        $data = Mostrar::verListaCurso($conexion, $idmatricula);
        break;
    case 9:
        // muestra un listado de las matriuclas del alumno
        $data =   Mostrar::listadoMatriculaProfesores($conexion, $idpersonasProfesor);
        break;
    case 10:
        // recuperamos los datos de los alumnos y cursos por medio de un select
        $permiso = 2;
        $data = Mostrar::listarAlumnos($conexion, $permiso);
        break;
    case 11:
        // insertamos los datos de la matricula
        $data =  Mostrar::insertarMatricula($conexion, $idcursos, $idalumno, $idpersonasProfesor, $matriculaFecha, $notaMatricula);
        break;
    case 12:
        // borrado de las matriculas de los alumnos
        $data = Mostrar::deleteMatricula($conexion, $idmatricula);
        break;
    case 13:
        // recuperamos los datos de la matrícula para modificar
        $data = Mostrar::recuperarMatricula($conexion, $idmatricula);
        break;
    case 14:
        // actualizamos los datos de la matricula
        $data = Mostrar::matriculaUpdate($conexion, $idmatricula, $idcursos, $idalumno, $idpersonasProfesor, $matriculaFecha, $notaMatricula);
        break;
    case 15:
        // modificamos el passowrd de los usuarios (alumno - profesores - administrador)
        $data = Mostrar::modificarpassword($conexion, $idpersonas, $password1);
        break;
    case 16:
        // muestra un listado de las matriculas del alumno
        $data = Mostrar::listarMatriculaProfesor($conexion, $idAlumno);
        break;
    case 17:
        // muestra un listado de los alumnos 
        $data = Mostrar::listadoAlumno($conexion, $permiso);
        break;
    case 18:
        // Borrados de los usuarios de la base de datos
        $data = Mostrar::deleteUsuarios($conexion, $idpersonas);
        break;
    case 19:
        // Insertamos o modificamos los datos de los alumnos ó profesores según tenga file
        if (is_array($_FILES) && count($_FILES) > 0) {
            if (($_FILES['files']['type'] == 'image/pjpeg') || ($_FILES['file']['type'] == 'image/jpeg')
                || ($_FILES['file']['type'] == 'image/png') || ($_FILES['file']['type'] == 'image/jpg')
                || ($_FILES['file']['type'] == 'image/gif')
            ) {
                if (move_uploaded_file($_FILES['file']['tmp_name'], '../images/' . $_FILES['file']['name'])) {
                    $foto = '../images/' . $_FILES['file']['name'];
                    // condición cuando es una upadate
                    if ($tieneFileUpdateAlumno == 'tieneFileUpdateAlumno') {
                        // update cuando tiene file
                        $data = Mostrar::updateAlumnos($conexion, $idAlumno, $nombre, $apellido, $fechaNac, $dni, $email, $foto, $telefono);
                    } else {
                        // cuando insertamos un nuevo usuario y tiene file
                        $data = Mostrar::insertarNuevoIdpersonas($conexion, $usuario, $nombre, $apellido, $fechaNac, $dni, $email, $foto, $telefono, $password1, $permiso, $descripcion);
                    }
                } else {
                    $data = 10; //error de archivo file
                }
            } else {
                $data = 20; //error de Extensiones                 
            }
        } else {
            // update cuando no tiene file
            $foto = 'no';
            $data = Mostrar::updateAlumnos($conexion, $idAlumno, $nombre, $apellido, $fechaNac, $dni, $email, $foto, $telefono);
        }
        break;
    case 20:
        // comprobamos que el usuario no este repetido en la base de datos
        $data = Mostrar::buscarUsuario($conexion, $repetidoUsuario);
        break;
    case 21:
        // muestra en el encabezado los datos del alumno
        $data =  Mostrar::valoresCabeceraAlumno($conexion, $idAlumno);
        break;
    case 22:
        // muestra un listado de los cursos en una tabla
        $data = Mostrar::listadoCursos($conexion);
        break;
    case 23:
        // insertamos datos del curso en la base de datos
        $data = Mostrar::insertarCursosNuevo($conexion, $curso, $horas, $precio, $descuento, $descripcion);
        break;
    case 24:
        // upadate los datos del curso
        $data = Mostrar::updateCursos($conexion, $idcursos, $curso, $horas, $precio, $descuento, $descripcion);
        break;
    case 25:
        // recuperamos los datos del curso por el id
        $data = Mostrar::listadoCursoIdcuros($conexion, $idcursos);
        break;
    case 26:
        // borramos los datos del curso seleccionado por el id
        $data = Mostrar::deleteCursos($conexion, $idcursos);
        break;
    case 27:
        // muestra un listado de las facturas que tiene cada profesor
        $data = Mostrar::listadoFacturasProfesor($conexion, $idpersonasProfesor);
        break;
    case 29:
        // recuperamos las matrículas de los alumnos que aún no tienen facturas  (left join)
        $data = Mostrar::selectMatriculaAlumno($conexion, $idpersonasProfesor);
        break;
    case 30:
        // insertamos los datos de las facturas
        $data = Mostrar::insertarFacturaAlumnos($conexion, $fechaFactura, $radiofactura, $idMatricula);
        break;
    case 31:
        // modificamos los datos de las facturas de los alumnos
        $data = Mostrar::modificarFacturas($conexion, $idfactura, $fechaFactura, $radiofactura, $idMatricula);
        break;
    case 32:
        // $data = Mostrar::selectFacturas($conexion, $idfactura);
        break;
    case 33:
        // recuperar los datos de la matricula y mostrarlos en un select 
        $data = Mostrar::recuperarSelectFacturaUpdate($conexion, $idpersonasProfesor);
        break;
    case 34:
        // borrado de los datos de las facturas
        $data = Mostrar::deleteFacturas($conexion, $idfactura);
        break;
    case 35:
        // recupera los datos del usuario para mostrarlos por pantalla
        $data = Mostrar::idpersonasUpdate($conexion, $idpersonas);
        break;
    case 36:
        // muestra los datos de los profesores ó administradores en una tabla
        $data = Mostrar::administradorListadoProfesores($conexion, $permiso);
        break;
    case 37:
        // Actualización de los profesores y administradores según tenga archivo de imagen
        if (is_array($_FILES) && count($_FILES) > 0) {
            if (($_FILES['files']['type'] == 'image/pjpeg') || ($_FILES['file']['type'] == 'image/jpeg')
                || ($_FILES['file']['type'] == 'image/png') || ($_FILES['file']['type'] == 'image/jpg')
                || ($_FILES['file']['type'] == 'image/gif')
            ) {
                if (move_uploaded_file($_FILES['file']['tmp_name'], '../images/' . $_FILES['file']['name'])) {
                    $foto = '../images/' . $_FILES['file']['name'];
                    // upadate profesores - administradores cuando tienen file
                    $data = Mostrar::updateProfesorAdministrador($conexion, $idpersonas, $nombre, $apellido, $fechaNac, $telefono, $dni, $email, $foto, $permiso, $descripcion);
                } else {
                    $data = 10; //error de archivo file
                }
            } else {
                $data = 20; //error de Extensiones                 
            }
        } else {
            // cuando update y no tiene file
            $foto = 'no';
            $data = Mostrar::updateProfesorAdministrador($conexion, $idpersonas, $nombre, $apellido, $fechaNac, $telefono, $dni, $email, $foto, $permiso, $descripcion);
        }
        break;
    case 38:
        // modificamos los permisos del administrador
        $data = Mostrar::updateAdministradorPermisos($conexion, $idpersonas, $permiso);
        break;
}





// echo json_encode($data);
print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;

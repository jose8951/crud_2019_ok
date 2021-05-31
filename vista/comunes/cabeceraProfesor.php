<?php
// Comprobamos que las variables de las sesiones estén correctas 
if (!isset($_SESSION["apellido"]) || !isset($_SESSION['nombre']) || !isset($_SESSION['idpersonas']) || !isset($_SESSION['foto'])) {
    header("Location: ../index.php");
}
?>

</head>

<body>
      <!-- Muestra el encabezado de los profesores -->
    <div class="container-fluid">
        <!-- muestra el logo en el cabezado -->
        <div class="row" style="height: 65px;">
            <div class="col-sm-12" id="titulo_logo">
                <h1 class="animate__animated animate__backInLeft text-center">Academia omega
                    <img src="../images/omega.png" class="ml-4" style="width: 50px;" alt="">
                </h1>
            </div>
        </div>
    </div>

    <div class="totalcontainer">
          <!-- muestra los botones de los profesores -->
        <div class="flex-container">
            <div><button type="button" class="btn btn-primary" id="listadoMatricula">Matriucla</button></div>
            <div><button type="button" class="btn btn-primary" id="listadoAlumnos">Alumno</button></div>
            <div><button type="button" class="btn btn-primary" id="listadoCursos">Curso</button></div>
            <div><button type="button" class="btn btn-primary" id="listadoFacturas">Factura</button></div>
            <div><button type="button" class="btn btn-primary" id="modificarProfesor">Update profesor</button></div>
            <div><button type="button" class="btn btn-primary" id="crearnuevo" data-toggle="modal"></button></div>
        </div>

          <!-- muestra los datos del profesor -->
        <div class="flex-containerEnd">
            <div class="profesorRegistrado"><?php echo 'Profesor Registrado: ' . $_SESSION['nombre'] . ' ' . $_SESSION['apellido']; ?></div>
            <div id="imagenProfesor"><img src="<?php echo  $_SESSION['foto']; ?>" alt=""></div>
            <div><button type="button" class="btn btn-danger" id="desconexionAlumno"> Desconexión</button></div>

        </div>
    </div>
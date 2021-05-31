<?php
// Comprobamos que las variables de las sesiones estén correctas 
if (!isset($_SESSION["usuario"]) || empty($_SESSION['usuario']) || !isset($_SESSION['idpersonas']) || !isset($_SESSION['foto'])) {
    header("Location: ../index.php");
}
?>

</head>

<body>
    <!-- Muestra el encabezado de los alumnos -->
    <div class="container-fluid">
        <!-- muestra el logo en el cabezado -->
        <div class="row" style="height: 60px;">
            <div class="col-sm-12" id="titulo_logo">
                <h1 class="animate__animated animate__backInLeft text-center">Academia omega
                    <img src="../images/omega.png" class="ml-4" id="imagenOmega" alt="">
                </h1>
            </div>
        </div>
        <div class="totalcontainer">
            <!-- muestra los botones de los alumnos -->
            <div class="flex-container">
                <div><button type="button" class="btn btn-primary" id="matriculaAlumnos">Matrícula</button></div>
                <div><button type="button" class="btn btn-primary" id="facturasAlumnos">Factura</button></div>
                <div><button type="button" class="btn btn-primary" id="editarAlumno">Update alumno</button></div>
            </div>
            <div class="flex-containerEnd">
                <div class="profesorRegistrado"><?php echo 'Alumno Registrado: ' . $_SESSION['usuario']; ?></div>
                <div><input type="hidden" id="idpersonasAlumnos" value="<?php echo $_SESSION['idpersonas']; ?>"></div>
                <div id="fotoUsuario"><img src="<?php echo  $_SESSION['foto']; ?>" alt=""></div>
                <div><button type="button" class="btn btn-danger" id="desconexionAlumno"> Desconexión</button></div>
            </div>
        </div>

        <!-- muestra los datos del alumno -->
        <div class="container-fluid" id="datosAlumnosMatricula" style="width: 98%;" hidden>
            <div class="row" id="cabeceraAlumno">
                <div class="col-sm-2">
                    <span class="EltituloAlumnoCabecera">Datos del alumno:</span>
                </div>
                <div class="col-sm-2">
                    <span class="tituloAlumnoCabecera">Nombre:</span><span id="CabeceraNombre"></span>
                </div>
                <div class="col-sm-2">
                    <span class="tituloAlumnoCabecera">Apellido:</span><span id="CabeceraApellido"></span>
                </div>
                <div class="col-sm-2">
                    <span class="tituloAlumnoCabecera">Email:</span><span id="CabeceraEmail"></span>
                </div>
                <div class="col-sm-2">
                    <span class="tituloAlumnoCabecera">Teléfono:</span><span id="CabeceraTelefono"></span>
                </div>
                <div class="col-sm-2">
                    <span class="tituloAlumnoCabecera">Edad:</span><span id="CabeceraEdad"></span>
                </div>
            </div>
        </div>
    </div>
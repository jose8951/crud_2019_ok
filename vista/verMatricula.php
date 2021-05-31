<?php

// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezdo del alumno
include_once 'comunes/cabeceraAlumno.php';
?>

<!-- tabla para mostrar las matriculas de los alumnos -->
<div class="container-fluid">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaMatricula" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th>id</th>
                            <th>nombre profesor</th>
                            <th>apellidos profesor</th>
                            <th>email</th>
                            <th>Telefono</th>
                            <th style="width: 3%;">Profesores</th>
                            <th style="width: 10%;">Fecha Matricula</th>
                            <th>curso</th>
                            <th style="width: 4%;">nota</th>
                            <th style="width: 4%;">Horas</th>
                            <th style="width: 7%">ver curso</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>



<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/verMatricula.js"></script>
<script src="../controlador/validaciones.js"></script>

</body>

</html>
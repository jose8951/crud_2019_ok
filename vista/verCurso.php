<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezdo del alumno
include_once 'comunes/cabeceraAlumno.php';
?>

<!-- recuperamos la session del id de la matricula -->
<input type="hidden" id="idMatricula" value="<?php echo $_REQUEST['idmatricula']; ?>">

<!-- contenido de los datos del curso -->
<div class="container">
    <h1 class="display-4 text-center" id="textoCurso"></h1>

    <div class="container" style="width: 80%;">
        <div class="text-justify" id="textoDescripcion" style="font-size: 1.5em;"></div>
    </div>
</div>


<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/verCurso.js"></script>
</body>

</html>
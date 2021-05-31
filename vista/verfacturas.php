<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezdo del alumno
include_once 'comunes/cabeceraAlumno.php';
?>



<!-- tabla para mostrar las facturas de los alumnos -->
<div class="container-fluid">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaFacturas" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th>id factura</th>
                            <th>nombre</th>
                            <th>apellidos</th>
                            <th>dni</th>
                            <th>email</th>
                            <th>curso</th>
                            <th>horas</th>
                            <th>precio</th>
                            <th>descuento</th>
                            <th>total</th>
                            <th>nota</th>
                            <th>pagado</th>
                            <th>fecha</th>
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
<script src="../controlador/verfacturas.js"></script>

</body>

</html>
<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
?>


<body>
    <!-- encabezado animado con el logo de la empresa-->
    <div class="contenedorInvitado">
        <div id="logoInvitado">
            <h1 class="animate__animated animate__backInLeft text-center">Academia omega
                <img src="../images/omega.png" class="ml-4" id="imagenOmega" alt="">
            </h1>
        </div>
    </div>
    <div id="botonesInvitado">
        <div id="tituloInvitadoCursos">Listado de cursos</div>
        <div id="centradoButton"><button type="button" id="salirInvitado" class="btn btn-primary">Salir</button></div>
    </div>


    <!-- muestra una tabla con los datos de los cursos -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaInvitado" class="table table-strped table-bordered table-condensed table-hover" style="width: 100%">
                        <thead class="text-center">
                            <tr>
                                <th style="width: 4%">id</th>
                                <th>Curso</th>
                                <th style="width: 7%">horas</th>
                                <th style="width: 7%">precio</th>
                                <th style="width: 7%">descuento</th>
                                <th style="width: 7%">Total</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>




        <!-- recuperamos las librerias del footer -->
        <?php include_once '../vista/comunes/footer.php'; ?>
        <!-- Llamadas a javascript -->
        <script src="../controlador/invitado.js"></script>
</body>

</html>
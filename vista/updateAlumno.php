<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezdo del alumno
include_once 'comunes/cabeceraAlumno.php';
?>


<!-- formulario que muestra los datos del alumno para modificar -->
<div class="container">
    <div class="form-row">
        <div class="col-md-12 text-center">
            <h3>Datos a modificar<h3>
        </div>
    </div>
    <form enctype="multipart/form-data" id="formUpdateAlumno">
        <div class="form-row">
            <div class="form-group col-md-5">
                <label>Nombre</label>
                <input type="text" class="form-control" id="inputNombre" placeholder="Nombre">
            </div>
            <div class="form-group col-md-4">
                <label>Apellidos</label>
                <input type="text" class="form-control" id="inputApellidos" placeholder="apellidos">
            </div>
            <div class="form-group col-md-3">
                <label>Fecha nacimiento</label>
                <input type="date" class="form-control" id="inputFechaNac" placeholder="F. Nacimiento">
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-2">
                <label>Dni</label>
                <input type="text" class="form-control" id="inputDni" placeholder="Ejem 23123123G">
            </div>
            <div class="form-group col-md-3">
                <label>Email</label>
                <input type="email" class="form-control" id="inputEmail" placeholder="Ejem correo@correo.com">
            </div>

            <div class="form-group col-md-5">
                <label>Imagen a cambiar</label>
                <input type="file" class="form-control" id="inputFile" placeholder="file">
            </div>

            <div class="form-group col-md-2 updateImagen">
                <img src="" id="imagenfile" alt="">
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3" style="margin-right: 200px;">
                <label>Telefono</label>
                <input type="text" class="form-control" id="inputTelefono" placeholder="Ejem 600-451289">
            </div>
            <div class="form-group col-md-3">
                <label style="visibility: hidden;">label</label>
                <button type="button" class="btn btn-success" data-toggle="modal" id="cambiarPassword">Pulsar aqui para cambiar password</button>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-12" style="margin-top: 20px;">
                <div id="erroresDatos"></div>
            </div>
        </div>

        <div class="form-row">
            <div class="col-md-12 text-center" style="margin-top: 20px;">
                <button type="submit" class="btn btn-primary mr-5">Guardar</button>
            </div>
        </div>
    </form>
</div>

<!-- formulario para modificar el password de los alumnos -->
<div class="modal fade" id="modalUpdatePassword" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formUpdateAlumnoPassword">
                    <div class="modal-body">
                        <div id="tituloUpdatePassword">datos a mostrar</div>
                        <div class="form-group col-md-3">
                            <label>Password</label>
                            <input type="text" class="form-control" id="inputPassword1" placeholder="password">
                        </div>
                        <div class="form-group col-md-3">
                            <label>Repetir password</label>
                            <input type="text" class="form-control" id="inputPassword2" placeholder="password">
                        </div>

                        <div class="form-group col-md-3 imagenCambiarPassword">
                            <div style="margin-bottom:15px;">Alumno</div>
                            <div> <img src="" id="imagenfilePass" alt=""></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 text-center" style="margin: 20px;  height: 70px;">
                            <button type="submit" class="btn btn-primary mr-5">Aceptar</button>
                            <button type="button" id="salirPassword" class="btn btn-primary">Cancelar</button>
                            <div class="text-left" id="erroresPassword" style="margin-top: 15px;"></div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>


<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/updateAlumno.js"></script>
<script src="../controlador/validaciones.js"></script>
</body>

</html>
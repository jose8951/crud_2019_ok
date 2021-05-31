<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezado del profesor
include_once 'comunes/cabeceraProfesor.php';
?>

<!-- guardamos el id del profesor y lo ocultamos -->
<input type="hidden" id="idpersonasProfesor" value="<?php echo $_SESSION['idpersonas']; ?>">

<!--formulario para  editar al profesor para modificar -->
<div class="container">
    <form id="formUpdateProfesor" method="post" enctype="multipart/form-data" style="margin-top: 40px;">
        <h3 id="tituloUpdateProfesor" style="margin:35px;"></h3>
        <div class="row" style="margin-bottom:20px;">
            <div class="col-md-4">
                <label>Nombre</label>
                <input type="text" class="form-control" id="inputUpNombre" placeholder="Nombre">
            </div>
            <div class="col-md-4">
                <label>Apellidos</label>
                <input type="text" class="form-control" id="inputUpAlellidos" placeholder="Apellidos">
            </div>
            <div class="col-md-4">
                <label>Fecha nacimiento</label>
                <input type="date" class="form-control" id="inputUPFecha" placeholder="Fecha">
            </div>
        </div>
        <div class="row" style="margin-bottom:20px;">
            <div class="col-md-3">
                <label>Teléfono</label>
                <input type="text" class="form-control" id="inputUpTelefono" placeholder="Teléfono">
            </div>
            <div class="col-md-3">
                <label>Dni</label>
                <input type="text" class="form-control" id="inputUpDni" placeholder="">
            </div>
            <div class="col-md-6">
                <label>Email</label>
                <input type="email" class="form-control" id="inputUpEmail" placeholder="">
            </div>
        </div>
        <div class="row" style="margin-bottom:30px;">
            <div class="col-md-5">
                <label>Imagen a cambiar</label>
                <input type="file" class="form-control" id="inputFileUpdate" placeholder="file">
            </div>
            <div class="col-md-4 updateImagen">
                <img src="" id="imagenfile" alt="">
            </div>
            <div class="col-md-3">
                <label style="visibility: hidden;">label</label>
                <button type="button" class="btn btn-success" data-toggle="modal" id="cambiarPassword">Pulsar aqui para cambiar password</button>
            </div>
        </div>

        <div class="row" style="margin: 10px;">
            <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-primary mr-5">Guardar cambios</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 erroresAlumno">
                <div class="errores"></div>
            </div>
        </div>

    </form>
</div>

<!-- Formulario para modificar el password del profesor -->
<div class="modal fade" id="modalUpdateProfesorPassword" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formUpdateAlumnoPassword">
                    <div class="modal-body">
                        <div id="tituloUpdatePassword" style="margin-bottom: 45px;"></div>
                        <div class="form-group col-md-4">
                            <label>Password</label>
                            <input type="text" class="form-control" id="inputPassword1" placeholder="password">
                        </div>
                        <div class="form-group col-md-4">
                            <label>Repetir password</label>
                            <input type="text" class="form-control" id="inputPassword2" placeholder="password">
                        </div>
                        <!-- imagen del profesor que vamos a modificar el password -->
                        <div class="form-group col-md-4 imagenCambiarPassword">
                            <div style="margin:4px;">Profesor</div>
                            <div> <img src="" id="imagenfilePass" alt=""></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 btnupdatefrofesor">
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <div id="erroresPassword"></div>
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
<script src="../controlador/updateProfesor.js"></script>
<script src="../controlador/validaciones.js"></script>

</body>

</html>
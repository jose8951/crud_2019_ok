<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezado del profesor
include_once 'comunes/cabeceraProfesor.php';
?>

<!-- guardamos el id del profesor y lo ocultamos -->
<input type="hidden" id="idpersonasProfesor" value="<?php echo $_SESSION['idpersonas']; ?>">

<!-- tabla para mostrar las matriculas de los alumnos -->
<div class="container-fluid mt-1">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaAlumnoListado" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th style="width: 5%;">id</th>
                            <th style="width: 8%;">Usuarios</th>
                            <th>nombre</th>
                            <th>apellidos</th>
                            <th style="width: 3%;">Alumnos</th>
                            <th style="width: 4%;">Edad</th>
                            <th style="width: 5%;">dni</th>
                            <th>email</th>
                            <th style="width: 8%;">Telefono</th>
                            <th class="text-center" style="width: 12%;">Editar/Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- modal para eliminar un alumno -->
<div class="modal fade form-control-sm" id="eliminarMatricula" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="modal-title"></div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <h3 id="tituloAlumnoBorrado" style="margin-left: 20px;"></h3>
                        </div>
                        <div class="col-md-1 ml-auto"><img src="" id="fotoBorrar" alt=""></div>
                    </div>

                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-9"><label id="muestraMatricula" class="col-form-label"></label></div>
                    </div>
                    <div class="row">
                        <div class="col-md-9"><label id="advertenciaBorrado" class="col-form-label"></label></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" id="btnEliminarMatricula">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- formulario para crear un nuevo alumno por primera vez -->
<div class="modal fade" id="crearAlumno" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <h3 class="modal-title"></h3>
            </div>
            <div class="container-fluid">
                <form id="formNuevoAlumno" enctype="multipart/form-data">
                    <div class="modal-body">
                        <h3 id="tituloNuevolumno"></h3>
                        <div class="row">
                            <div class="form-group col-md-2">
                                <label>Usuario</label>
                                <input type="text" class="form-control" id="inputUsuario" placeholder="Usuario">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Nombre</label>
                                <input type="text" class="form-control" id="inputNombre" placeholder="Nombre">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Apellidos</label>
                                <input type="text" class="form-control" id="inputAlellidos" placeholder="Apellidos">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Fecha nacimiento</label>
                                <input type="date" class="form-control" id="inputFecha" placeholder="Fecha">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-3">
                                <label>Teléfono</label>
                                <input type="text" class="form-control" id="inputTelefono" placeholder="Teléfono">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" class="form-control" id="inputEmail" placeholder="">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Dni</label>
                                <input type="text" class="form-control" id="inputDni" placeholder="">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Elige una imagen</label>
                                <input type="file" class="form-control" id="inputFile" placeholder="file">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Password</label>
                                <input type="text" class="form-control" id="inputPassword1" placeholder="password">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Repetir password</label>
                                <input type="text" class="form-control" id="inputPassword2" placeholder="password">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 botonesAlumnosNuevos">
                                <button type="submit" class="btn btn-primary" id="botonNuevoAlumno">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-2">
                                <div id="erroresalumnos"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- editar alumno para modificar -->
<div class="modal fade" id="modalModificarAlumno" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="container-fluid">
                <!-- formulario para update los alumnos -->
                <form id="formUpdateAlumno" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        <h3 id="tituloUpdateAlumno"></h3>
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label>Nombre</label>
                                <input type="text" class="form-control" id="inputUpNombre" placeholder="Nombre">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Apellidos</label>
                                <input type="text" class="form-control" id="inputUpAlellidos" placeholder="Apellidos">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Fecha nacimiento</label>
                                <input type="date" class="form-control" id="inputUPFecha" placeholder="Fecha">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-3">
                                <label>Teléfono</label>
                                <input type="text" class="form-control" id="inputUpTelefono" placeholder="Teléfono">
                            </div>
                            <div class="form-group col-md-3">
                                <label>Dni</label>
                                <input type="text" class="form-control" id="inputUpDni" placeholder="">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" class="form-control" id="inputUpEmail" placeholder="">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-5">
                                <label>Imagen a cambiar</label>
                                <input type="file" class="form-control" id="inputFileUpdate" placeholder="file">
                            </div>
                            <div class="form-group col-md-3 updateImagen">
                                <img src="" id="imagenfile" alt="">
                            </div>
                            <div class="form-group col-md-4">
                                <label style="visibility: hidden;">label</label>
                                <button type="button" class="btn btn-success" data-toggle="modal" id="cambiarPassword">Pulsar aqui para cambiar password</button>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 text-center updateAlumnoBtn">
                                <button type="submit" class="btn btn-primary">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                <div class="errores"></div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<!-- modal formulario para modificar el password -->
<div class="modal fade" id="modalUpdateAlPassword" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="container-fluid">
                <form id="formUpdateAlumnoPassword">
                    <div class="modal-body">
                        <div id="tituloUpdatePassword"></div>
                        <div class="form-group col-md-3">
                            <label>Password</label>
                            <input type="text" class="form-control" id="inputPassword1Pass" placeholder="password">
                        </div>
                        <div class="form-group col-md-3">
                            <label>Repetir password</label>
                            <input type="text" class="form-control" id="inputPassword2Pass" placeholder="password">
                        </div>
                        <div class="form-group col-md-4 imagenCambiarPassword">
                            <div style="margin:10px;">Alumno</div>
                            <div> <img src="" id="imagenfilePass" alt=""></div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col-md-12 text-center updateAlumnoBtn">
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <div id="erroresPassword" class="errores"></div>
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
<script src="../controlador/listadoAlumno.js"></script>
<script src="../controlador/validaciones.js"></script>

</body>

</html>
<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezado del administrador
include_once 'comunes/cabeceraAdministrador.php';
?>
<!-- guardamos el id del administrador y lo ocultamos -->
<input type="hidden" id="idpersonasAdministrador" value="<?php echo $_SESSION['idpersonas']; ?>">



<!-- tabla para mostrar los datos de los usuarios (profesores) -->
<div class="container-fluid mt-1">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaAdminProfesor" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th style="width: 4%;">id</th>
                            <th style="width: 6%;">Usuario</th>
                            <th>nombre</th>
                            <th>apellidos</th>
                            <th style="width: 4%;">Edad</th>
                            <th style="width: 6%;">Telefono</th>
                            <th style="width: 3%;">dni</th>
                            <th style="width: 12%;">email</th>
                            <th style="width: 6%;">Profesor</th>
                            <th style="width: 3%;">permiso</th>
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



<!-- formulario para crear un nuevo profesor por primera vez -->
<div class="modal fade" id="crearProfesor" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modificarAlumno">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formNuevoProfesor" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div id="tituloNuevoProfesor" style="margin-bottom: 25px;"></div>
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
                            <div class="form-group col-md-2">
                                <label>Teléfono</label>
                                <input type="text" class="form-control" id="inputTelefono" placeholder="Teléfono">
                            </div>
                            <div class="form-group col-md-6">
                                <label>Email</label>
                                <input type="email" class="form-control" id="inputEmail" placeholder="">
                            </div>
                            <div class="form-group col-md-4">
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
                        <div class="col-md-10 radioFormulario">
                            <div id="pagadoRdio">Selecciona los permisos del profesor.</div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input " type="radio" name="radioOptions" id="inlineRadio1" value="3">Con permisos
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" name="radioOptions" id="inlineRadio2" value="0">Bloqueados
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 text-center" style="height :70px;">
                                <button type="submit" class="btn btn-primary" id="botonNuevoProfesor">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <div id="erroresprofesor" class="text-left" style="margin-top:20px;"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- editar profesor para modificar -->
<div class="modal fade" id="modalModificarProfesor" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modificarProfesor">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formUpdateProfesor" method="post" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div id="tituloUpdateProfesor"></div>
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label>Nombre</label>
                                <input type="text" class="form-control" id="inputUpNombre" placeholder="Nombre">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Apellidos</label>
                                <input type="text" class="form-control" id="inputUpApellidos" placeholder="Apellidos">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Fecha nacimiento</label>
                                <input type="date" class="form-control" id="inputUpFecha" placeholder="Fecha">
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
                            <div class="form-group col-md-4">
                                <label>Imagen a cambiar</label>
                                <input type="file" class="form-control" id="inputFileUpdate" placeholder="file">
                            </div>
                            <div class="form-group col-md-3 updateImagen">
                                <img src="" id="imagenfile" alt="">
                            </div>

                            <!-- El formulario de update tendrá un botón de modificar password -->
                            <div class="form-group col-md-3">
                                <label style="visibility: hidden;">label</label>
                                <button type="button" class="btn btn-success" data-toggle="modal" id="cambiarPassword">Pulsar aqui para cambiar password</button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <label id="tituloUpProfesor">Permisos del profesor:</label>
                            </div>
                            <div class="col-md-8">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input " type="radio" name="radioUpOptions" id="RadioUpProfesor3" value="3">Con permisos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="radioUpOptions" id="RadioUpProfesor0" value="0">Bloqueados
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 text-center" style="height: 70px;">
                                <button type="submit" class="btn btn-primary mr-5">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                <div class="errores text-left" style="margin-top:20px;"></div>
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
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formUpdateProfesorPassword">
                    <div class="modal-body">
                        <div id="tituloUpdatePassword"></div>
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label>Password</label>
                                <input type="text" class="form-control" id="inputPassword1Pass" placeholder="password">
                            </div>
                            <div class="form-group col-md-4">
                                <label>Repetir password</label>
                                <input type="text" class="form-control" id="inputPassword2Pass" placeholder="password">
                            </div>
                            <div class="form-group col-md-4 imagenCambiarPassword">
                                <div style="margin:10px;">Profesor</div>
                                <div> <img src="" id="imagenfilePass" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-12 text-center" style="height: 80px;">
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



<!-- modal para eliminar un profesor -->
<div class="modal fade form-control-sm" id="eliminarProfesor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="modal-title"></div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div id="tituloProfesorBorrado" style="margin-left: 20px;"></div>
                    <div class="row">
                        <div class="row" style="margin-bottom: 0px;">
                            <div class="col-md-8">
                                <label id="muestraMatricula" class="col-form-label"></label>
                            </div>
                            <div class="col-md-4">
                                <div class="col-md-12"><img src="" id="fotoBorrarProfesor" alt=""></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-9"><label id="advertenciaBorrado" class="col-form-label"></label></div>
                        </div>
                        <div class="row col-md-12 text-center">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-success" id="btnEliminarProfesor">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- recuperamos las librerias del footer -->
        <?php include_once '../vista/comunes/footer.php'; ?>
        <!-- Llamadas a javascript -->
        <script src="../controlador/admProfesor.js"></script>
        <script src="../controlador/validaciones.js"></script>
        </body>

        </html>
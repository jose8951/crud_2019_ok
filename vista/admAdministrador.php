<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezado del administrador
include_once 'comunes/cabeceraAdministrador.php';
?>
<!-- guardamos el id del administrador y lo ocultamos -->
<input type="hidden" id="idpersonasAdministrador" value="<?php echo $_SESSION['idpersonas']; ?>">

<!-- tabla para mostrar los administradores de la tabla usuarios -->
<div class="container-fluid">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaAdministrador" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
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
                            <th style="width: 6%;">Admin</th>
                            <th style="width: 3%;">permiso</th>
                            <th class="text-center" style="width: 12%;">Permisos/Borrar</th>
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
<div class="modal fade" id="crearAdministrador" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header modificarAlumno">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formNuevoAdministrador" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div id="tituloNuevoAdministrador"></div>
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
                        <div class="col-md-10 radioFormulario">
                            <div id="pagadoRdio">Selecciona los permisos del profesor.</div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input " type="radio" name="radioOptions" id="inlineRadio1" value="4">Con permisos
                                </label>
                            </div>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" name="radioOptions" id="inlineRadio2" value="10">Bloqueados
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12 text-center botonesAlumnosNuevos">
                                <button type="submit" class="btn btn-primary" id="botonNuevoAdministrador">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <div class="text-left" id="erroresAdministrador" style="margin-top:20px;"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- modal para modificar los permisos del administrador -->
<div class="modal fade form-control-sm" id="updatePermisosAdministrador" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="modal-title"></div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <form id="formPermisosAdministrador">
                        <div class="row imagenAdministrador">
                            <div class="col-md-8">
                                <div id="tituloAdministradorPermisos" style="margin-bottom: 40px;"></div>
                                <div id="administradorAcambiar"></div>
                                <div class="row">
                                    <div class="col-md-10">
                                        <label class="form-check-label">
                                            <input class="form-check-input " type="radio" name="radioUpOptions" id="RadioUpAdministrador4" value="4">Con permisos
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-10">
                                        <label class="form-check-label">
                                            <input class="form-check-input" type="radio" name="radioUpOptions" id="RadioUpAdministrador10" value="10">Bloqueados
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-1 ml-auto"><img src="" id="fotoAdministradorPermisos" alt=""></div>
                        </div>
                        <div class="row" style="margin-top: 30px;">
                            <div class="col-md-12 text-center" style="height: 80px;">
                                <button type="button" class="btn btn-success" id="btnPermisosAdministrador">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <div class="text-left" id="errorAdministradorPermisos" style="margin-top:20px; color:red;"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- modal para eliminar un profesor -->
<div class="modal fade form-control-sm" id="eliminarAdministrador" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <div id="tituloAdministradorBorrado"></div>
                        </div>
                        <div class="col-md-3">
                            <img src="" id="fotoBorrarAdministrador" alt="">
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 10px;">
                        <div class="col-md-9">
                            <label id="muestraAdministrador" class="col-form-label"></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-9">
                            <label id="advertenciaBorrado" class="col-form-label"></label>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-success" id="btnEliminarAdministrador">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/admAdministrador.js"></script>
<script src="../controlador/validaciones.js"></script>

</body>

</html>
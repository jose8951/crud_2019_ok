<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezado del profesor
include_once 'comunes/cabeceraProfesor.php';
?>
<!-- guardamos el id del profesor y lo ocultamos -->
<input type="hidden" id="idpersonasProfesor" value="<?php echo $_SESSION['idpersonas']; ?>">


<!-- tabla para mostrar las facturas de los alumnos -->
<div class="container-fluid mt-1">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaProfesoresFacturas" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>apellidos</th>
                            <th style="width: 6%;">alumnos</th>
                            <th style="width: 3%;">dni</th>
                            <th style="width: 12%;">email</th>
                            <th>curso</th>
                            <th style="width: 3%;">horas</th>
                            <th style="width: 3%;">precio</th>
                            <th style="width: 3%;">descuento</th>
                            <th style="width: 6%;">total</th>
                            <th style="width: 3%;">nota</th>
                            <th style="width: 3%;">pagado</th>
                            <th style="width: 6%;">Fecha</th>
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



<!-- abrimos un modal con un formulario para insertar - update datos de la facturas -->
<div class="modal fade" id="modalFacturasNuevo" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formFacturas">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5">
                                <div id="tituloFactura"></div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-8 marco">
                                <p>Selecciona un alumno sin factura:<select id="lista_factura" name="lista_factura" class="form-control"></select></select></p>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <p>fecha: <input class="form-control" type="date" value="" id="inputDateFacturas">
                                </div>
                            </div>
                            <div class="col-md-10 radioFormulario">
                                <div id="pagadoRdio">Selecciona el estado de la matrícula está pagada.</div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input " type="radio" name="inlineRadioOptions" id="inlineRadio1" value="si">Si Pagado.
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <label class="form-check-label">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="no">No pagado.
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" id="btnFacturas">
                                <button type="submit" id="btnGuardarMatricula" class="btn btn-primary">Guardar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <!-- muestra errores del formulario de la factura -->
                                <div class="errores"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>


<!-- modal para eliminar factura -->
<div class="modal fade form-control-sm" id="eliminarFactura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <div class="modal-title"></div>
            </div>
            <form id="formMatriculaDelete">
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-3">
                                <div class="col-md-8">
                                    <div class="tituloFactura" style="margin-left: 25px;"></div>
                                </div>
                                <div class="col-md-1 ml-auto"><img src="" id="fotoBorrar" alt=""></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label id="muestraFacturaBorrar" class="col-form-label"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" id="btnEliminarFactura">Eliminar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/listadoFacturas.js"></script>
<script src="../controlador/validaciones.js"></script>
</body>

</html>
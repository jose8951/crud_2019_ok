<?php
// Agregamos las librerías del encabezado
include_once 'comunes/header.php';
// agregamos el encabezdo del alumno
include_once 'comunes/cabeceraProfesor.php';

?>
<input type="hidden" id="idpersonasProfesor" value="<?php echo $_SESSION['idpersonas']; ?>">

<!-- tabla para mostrar los cursos de los alumnos -->
<div class="container-fluid mt-1">
    <div class="row ">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tablaCursoListado" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                    <thead class="text-center">
                        <tr>
                            <th style="width: 5%;">id</th>
                            <th style="width: 7%;">curso</th>
                            <th style="width: 3%;">horas</th>
                            <th style="width: 3%;">precio</th>
                            <th style="width: 3%;">descuento</th>
                            <th style="width: 6%;">Total</th>
                            <th>descripcion</th>
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


<!-- formulario para crear un nuevo curso por primera vez -->
<div class="modal fade" id="modalCrearCurso" role="dialog">
    <div class="modal-dialog modal-lg" style="width:60%">
        <div class="modal-content">
            <div class="modal-header modificarAlumno">
                <button type="button" class="close" style="color: white;" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="container-fluid">
                <form id="formNuevoCurso" enctype="multipart/form-data">
                    <div class="modal-body">
                        <div id="tituloNuevoCurso"></div>
                        <br>
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label>Curso:</label>
                                <input type="text" class="form-control" id="inputCurso" placeholder="Curso">
                            </div>
                            <div class="form-group col-md-2">
                                <label>Horas</label>
                                <input type="number" class="form-control" id="inputHoras" placeholder="Horas">
                            </div>
                            <div class="form-group col-md-2">
                                <label>Precio</label>
                                <input type="text" class="form-control" id="inputPrecio" placeholder="precio">
                            </div>
                            <div class="form-group col-md-2">
                                <label>Descuento</label>
                                <input type="text" class="form-control" id="inputDescuento" placeholder="descuento">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-md-12">
                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                <textarea class="form-control" id="inputDescripcion" rows="3" cols="10" style="resize: none;"></textarea>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md.12 text-center botonesCursos">
                                <button type="submit" class="btn btn-primary" id="botonNuevoAlumno">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                <div id="erroresCursos"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>



<!-- modal para eliminar un curso -->
<div class="modal fade form-control-sm" id="eliminarCurso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <h3 class="tituloCurso" style="margin-left: 20px;"></h3>
                        </div>
                    </div>
                    <br>
                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-9"><label id="muestraCurso" class="col-form-label"></label></div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button type="button" class="btn btn-danger " data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-success" id="btnEliminarCurso">Eliminar</button>
                            <div class="text-left"><label id="advertenciaBorrado" class="col-form-label"></label></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




<!-- modal cuando no puede eliminar el curso por estar relacionada con una matricula -->
<div class="modal fade form-control-sm" id="noSePuedeEliminarCurso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="modal-title"></div>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="tituloCurso" style="margin-left: 20px;"></div>
                        </div>
                    </div>
                    <br>
                    <div class="row" style="margin-bottom: 30px;">
                        <div class="col-md-11"><label id="errorCurso" class="col-form-label"></label></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">>>> Salir <<<< </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>




<!-- recuperamos las librerias del footer -->
<?php include_once '../vista/comunes/footer.php'; ?>
<!-- Llamadas a javascript -->
<script src="../controlador/listadoCursos.js"></script>
<script src="../controlador/validaciones.js"></script>

</body>

</html>
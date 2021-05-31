 <?php
    // Agregamos las librerías del encabezado
    include_once 'comunes/header.php';
    // agregamos el encabezdo del profesor
    include_once 'comunes/cabeceraProfesor.php';

    ?>
 <!-- guardamos el id del profesor y lo ocultamos -->
 <input type="hidden" id="idpersonasProfesor" value="<?php echo $_SESSION['idpersonas']; ?>">

 <!-- tabla para mostrar las matriculas de los alumnos -->
 <div class="container-fluid mt-1">
     <div class="row ">
         <div class="col-lg-12">
             <div class="table-responsive">
                 <table id="tablaProfesoresMatricula" class="table table-strped table-bordered table-condensed table-hover" style="width: 98%; margin:auto;">
                     <thead class="text-center">
                         <tr>
                             <th>Matricula</th>
                             <th>nombre</th>
                             <th>apellidos</th>
                             <th>Edad</th>
                             <th>dni</th>
                             <th>email</th>
                             <th>Telefono</th>
                             <th style="width: 3%;">Alumnos</th>
                             <th>curso</th>
                             <th>nota</th>
                             <th>Fecha</th>
                             <th>horas</th>
                             <th class="text-center">Editar/Borrar</th>
                         </tr>
                     </thead>
                     <tbody>
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
 </div>

 <!-- formulario modal del nueva matrícula -->
 <div class="modal fade" id="modalCRUD" role="dialog">
     <div class="modal-dialog modal-lg">
         <div class="modal-content">
             <div class="modal-header">
                 <button type="button" class="close" data-dismiss="modal">&times;</button>
                 <div class="modal-title"></div>
             </div>
             <div class="container">
                 <form id="formMatricula">
                     <div class="modal-body">
                         <div class="row">
                             <div class="col-md-4">
                                 <div class="tituloMatricula"></div>
                             </div>
                         </div>
                         <br>
                         <div class="row">
                             <div class="col-md-5 marco">
                                 <p>Selecciona un alumno:<select id="lista_reproduccion" name="lista_reproduccion" class="form-control"></select></select></p>
                             </div>
                             <div class="col-md-4 marco">
                                 <p>Selecciona un curso:<select id="lista_cursos" name="lista_cursos" class="form-control"></select></p>
                             </div>
                         </div>
                         <br><br>
                         <div class="row">
                             <div class="col-sm-4 marco">
                                 <p>Fecha de incscripción: <input type="date" id="matriculaFecha" placeholder="fecha"></p>
                             </div>
                             <div class="col-md-4 marco">
                                 <p>Nota del curso: <input type="number" step="0.01" id="notaMatricula" placeholder="5,45"></p>
                             </div>
                         </div>
                         <br>
                         <div class="row">
                             <div class="col-sm-5">
                                 <div class="modal-footer">
                                     <button type="submit" id="btnGuardarMatricula" class="btn btn-primary">Guardar</button>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </form>
                 <div class="errores"></div>
             </div>
             <div class="modal-footer">
                 <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
             </div>
         </div>
     </div>
 </div>


 <!-- modal para eliminar las matriculas -->
 <div class="modal fade form-control-sm" id="eliminarMatricula" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                     <div class="tituloMatricula" style="margin-left: 50px;"></div>
                                 </div>
                                 <div class="col-md-1 ml-auto"><img src="" id="fotoBorrar" alt=""></div>
                             </div>
                         </div>
                         <div class="form-group">
                             <label id="muestraMatricula" class="col-form-label"></label>
                         </div>
                     </div>
                     <div class="modal-footer">
                         <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                         <button type="button" class="btn btn-success" id="btnEliminarMatricula">Eliminar</button>
                     </div>
                 </div>
             </form>
         </div>
     </div>
 </div>


<!-- recuperamos las librerias del footer -->
 <?php include_once '../vista/comunes/footer.php'; ?>

<!-- Llamadas a javascript -->
 <script src="../controlador/listadoMatricula.js"></script>
 <script src="../controlador/validaciones.js"></script>

 </body>

 </html>
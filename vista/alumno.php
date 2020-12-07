
<body>
    <header>
        <h3 class="text-center text-light">tutorial</h3>
        <h4 class="text-center text-light">crud con datatables</h3>
    </header>


    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <button id="btnNuevo" type="button" class="btn btn-success mb-2" data-toggle="modal">nuevo</button>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <button id="otra" type="button" class="btn btn-danger mb-2" data-toggle="modal">otra</button>
            </div>
        </div>

    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaPersonas" class="table table-strped table-bordered table-condensed" style="width: 100%">
                        <thead class="text-center">
                            <tr>
                                <th>id</th>
                                <th>nombre</th>
                                <th>pais</th>
                                <th>edad</th>
                                <th style="width: 15%">acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- modal para crud -->
    <div class="modal fade form-control-sm" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="formPersonas">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="nombre" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombre">
                        </div>
                        <div class="form-group">
                            <label for="pais" class="col-form-label">País:</label>
                            <input type="date" class="form-control" id="pais">
                        </div>
                        <div class="form-group">
                            <label for="edad" class="col-form-label">Edad:</label>
                            <input type="number" class="form-control" id="edad">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="jquery/jquery-3.3.1.min.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

    <!--    Datatables-->

    <script type="text/javascript" src="datatables/datatables.min.js"></script>
    <!-- 
    <script src="datatables/Buttons-1.5.6/js/dataTables.buttons.min.js"></script>
    <script src="datatables/JSZip-2.5.0/jszip.min.js"></script>
    <script src="datatables/pdfmake-0.1.36/pdfmake.min.js"></script>
    <script src="datatables/pdfmake-0.1.36/vfs_fonts.js"></script>
    <script src="datatables/Buttons-1.5.6/js/buttons.html5.min.js"></script>
 -->



    <script src="controlador/main.js"></script>



</body>

</html>
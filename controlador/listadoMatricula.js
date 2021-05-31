$(function() {
    // el título de la página
    $('title').text('Página profesor');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#listadoAlumnos').click(function() {
        $(location).attr('href', 'listadoAlumno.php');
    });
    $('#listadoCursos').click(function() {
        $(location).attr('href', 'listadoCursos.php');
    });
    $('#listadoFacturas').click(function() {
        $(location).attr('href', 'listadoFacturas.php');
    });
    $('#modificarProfesor').click(function() {
        $(location).attr('href', 'updateProfesor.php');
    });
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });

    // recuperamos el id del profesor
    idpersonasProfesor = $('#idpersonasProfesor').val();

    // muestra la tabla de las matriculas
    let tablaProfesoresMatricula = $('#tablaProfesoresMatricula').DataTable({
        "order": [
            [0, "desc"]
        ],
        'lengthMenu': [
            // [3, 5, 10, 25, 50, -1],
            // [3, 5, 10, 25, 50, 'All']
            [10, 25, 50, -1],
            [10, 25, 50, 'All']
        ],
        'ajax': {
            'url': '../modelo/crud.php',
            "error": function(jqXHR, ajaxOptions, thrownError) {
                alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
            },
            'method': 'POST',
            'data': { opcion: '9', idpersonasProfesor: idpersonasProfesor },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idmatricula' },
            { 'data': 'nombre' },
            { 'data': 'apellido' },
            { 'data': 'edad' },
            { 'data': 'dni' },
            { 'data': 'email' },
            { 'data': 'telefono' },
            {
                'data': 'foto',
                'render': function(data, type, row) {
                    return '<center><img src="' + data + '" id="imagenFotoProfesor"></center>';
                },
            },
            { 'data': 'curso' },
            { 'data': 'nota' },
            { 'data': 'fecha' },
            { 'data': 'horas' },
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnEditarMatricula'>Editar</button>
                                                          <button class='btn btn-danger btnBorrarMatricula'>Borrar</button></div>` }
        ],
        "rowCallback": function(row, data, index) {
            if (data.nota < 5) {
                $('td:eq(9)', row).addClass('color');
                // $(row).css('background-color', '#99ff9c')
            } else {
                // $('td:eq(11)', row).css('background-color', '#99ff9c')
                $('td:eq(9)', row).css('color', 'forestgreen')
            }
        },
        'language': {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });






    // Pulsando nueva matrícula mostramos el modal del formulario   
    $('#crearnuevo').click(function() {
        // recuperamos los datos por medio de un select
        recuperaSelect();
        $('#modalCRUD').modal('show');
        $('.errores').html('');
        $('#formMatricula').trigger('reset');
        $('.modal-header').css('background-color', '#007BFF');
        $('.modal-title').html('<h3>Nueva matricula.</h3>');
        $('.modal-header').css('color', 'white');
        $('.tituloMatricula').html('<h3>Nueva matrícula</h3>');
        opcion = 11;
        idmatricula = null;
    });

    // Recuperamos el valor del formulario  validamos y guardamos.
    $('#formMatricula').submit(function(e) {
        e.preventDefault();
        let idalumno = $.trim($('#lista_reproduccion').val());
        let idcursos = $.trim($('#lista_cursos').val());
        let matriculaFecha = $.trim($('#matriculaFecha').val());
        let notaMatricula = $.trim($('#notaMatricula').val());

        // validamos los datos de la nueva matricula
        if (validarFormularioProfesor(idalumno, idcursos, matriculaFecha, notaMatricula)) {
            $('.errores').html('');
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: {
                    idmatricula: idmatricula,
                    idalumno: idalumno,
                    idcursos: idcursos,
                    matriculaFecha: matriculaFecha,
                    notaMatricula: notaMatricula,
                    idpersonasProfesor: idpersonasProfesor,
                    opcion: opcion
                },
                // dataType: 'json',
                success: function(data) {
                    if (data) {
                        tablaProfesoresMatricula.ajax.reload(null, false);
                        // si todo es correcto muestra un mensaje
                        Swal.fire(
                            'Insertado el registro!',
                            'insertado correctamente',
                            'success'
                        );
                    }
                },
                error: function(xhr, status) {
                    alert('Disculpe, existio un problema');
                }
            });
            $('#modalCRUD').modal('hide');
        } else {
            $('.errores').html(cadena);
        }
    });





    // botón para mostrar los datos de las matriculas
    $('#tablaProfesoresMatricula tbody').on('click', '.btnEditarMatricula', function() {
        // recuperamos los datos por medio de un select
        recuperaSelect();
        $('#modalCRUD').modal('show');
        $('.errores').html('');
        $('#formMatricula').trigger('reset');
        $('.modal-header').css('background-color', '#286090');
        $('.modal-title').html('<h3>Modificación de la matrícula.</h3>');
        $('.modal-header').css('color', 'white');
        $('.tituloMatricula').html('<h3>Modificación de matrículas</h3>');

        let data = tablaProfesoresMatricula.row($(this).parents()).data();
        idmatricula = data.idmatricula;
        let fecha = data.fecha;
        let nota = data.nota
        $('#matriculaFecha').val(fecha);
        $('#notaMatricula').val(nota);
        opcion = 13;
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idmatricula: idmatricula
            },
            // dataType: 'json',
            success: function(response) {
                data = $.parseJSON(response);
                data.forEach(function(element) {
                    $('#lista_reproduccion').val(element.alumnos_usuarios_idpersonas);
                    $('#lista_cursos').val(element.cursos_idcursos);
                    opcion = 14;
                });
            }
        });
    });

    //botón para eliminar las matriculas
    $('#tablaProfesoresMatricula tbody').on('click', '.btnBorrarMatricula', function() {
        fila = $(this);
        let data = tablaProfesoresMatricula.row($(this).parents()).data();
        idmatricula = data.idmatricula;
        opcion = 12;
        $('#eliminarMatricula').modal('show');
        $('.modal-header').css('background', 'red');
        $('.modal-title').html('<h3>Borrado de matrícula</h3>');
        $('.modal-title').css('color', 'white');
        $('.tituloMatricula').html('<h3>Borrado de matrícula</h3>');
        $('.modal-header').css('color', 'white');
        $("#fotoBorrar").attr("src", data.foto);
        $('#muestraMatricula').html('<br>¿Quieres borrar la matricula?: ' + data.idmatricula + ' <br>Alumno: ' + data.nombre + " " + data.apellido);

        $('#btnEliminarMatricula').click(function() {
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: {
                    opcion: opcion,
                    idmatricula: idmatricula
                },
                // dataType: 'json',
                success: function(response) {
                    if (response) {
                        tablaProfesoresMatricula.row(fila.parents('tr')).remove().draw();
                        // si todo es correcto muestra un mensaje
                        Swal.fire(
                            'Eliminado!',
                            'Eliminado correctamente',
                            'success'
                        );
                    }
                },
                error: function(xhr, status) {
                    alert('Disculpe, existio un problema');
                }
            });
            $('#eliminarMatricula').modal('hide');
        });
    });
}); //fin


// function para recuperamos los select de alumnos y cursos 
function recuperaSelect() {
    $.ajax({
        url: '../modelo/crud.php',
        method: 'post',
        data: {
            'opcion': 10,
            'idprofesor': idpersonasProfesor
        },
        success: function(data) {
            data = $.parseJSON(data);
            // mostramos los datos del alumnos
            let resulAlumno = '<option value="0">Elige una opción</option>';
            data.alumno.forEach(function(element) {
                resulAlumno += '<option value=' + element.idpersonas + '>' + element.idpersonas + ' - ' + element.nombre + ' - ' + element.apellido + '</option>';
            });
            $('#lista_reproduccion').html(resulAlumno);

            // mostramos los datos de los cursos
            let resulCurso = '<option value="0">Elige una opción</option>';
            data.curso.forEach(function(element) {
                resulCurso += '<option value=' + element.idcursos + '>' + element.idcursos + ' - ' + element.curso + '</option>';
            });
            $('#lista_cursos').html(resulCurso);

        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}

// function que muestra el botón seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nueva Matricula');
    $('#listadoMatricula').css({
        'background-color': '#FF9333',
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em"
    });
}
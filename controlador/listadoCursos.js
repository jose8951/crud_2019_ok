$(function() {
    $('title').text('Página cursos');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#listadoMatricula').click(function() {
        $(location).attr('href', 'listadoMatricula.php');
    });
    $('#listadoAlumnos').click(function() {
        $(location).attr('href', 'listadoAlumno.php');
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

    // muestra la tabla de los cursos
    tablaCursoListado = $('#tablaCursoListado').DataTable({
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
            'method': 'post',
            'data': {
                opcion: '22',
            },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idcursos' },
            { 'data': 'curso' },
            { 'data': 'horas' },
            { 'data': 'precio' },
            { 'data': 'Descuento' },
            { 'data': 'Total' },
            { 'data': 'descripcion' },
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnEditarCurso'>Editar</button>
            <button class='btn btn-danger btnBorrarCurso'>Borrar</button></div>` }
        ],
        "rowCallback": function(row, data, index) {
            // muestra una descripción con las 100 primereras letras
            $('td:eq(6)', row).html('<p>' + data.descripcion.substr(0, 100) + '</p>');
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

    // botón para abrir un modal, para insertar datos en un formulario del curso nuevo 
    $('#crearnuevo').click(function() {
        $('#erroresCursos').html('');
        $('#modalCrearCurso').modal('show');
        $('#formNuevoCurso').trigger('reset');
        $('.modal-header').css({
            'background-color': '#286090',
            'color': 'white'
        });
        $('#tituloNuevoCurso').html('<h3>Creación del nuevo curso</h3>');
        $('.modal-title').html('<h3>Creación del nuevo curso</h3>');
        opcion = 23; // insertamos datos
        idcursos = null;
    });



    // si todo los datos del formulario son correctos pulsamos en enviar datos
    $('#formNuevoCurso').submit(function(e) {
        e.preventDefault();
        $('#erroresCursos').html('');
        let curso = $.trim($('#inputCurso').val());
        let horas = $.trim($('#inputHoras').val());
        let precio = $.trim($('#inputPrecio').val());
        let descuento = $.trim($('#inputDescuento').val());
        let descripcion = $.trim($('#inputDescripcion').val());
        // validamos los datos de los cursos
        if (validarFormularioCursos(curso, horas, precio, descuento, descripcion)) {
            $('#erroresCursos').html('');
            let formdata = new FormData();
            formdata.append('opcion', opcion);
            formdata.append('idcursos', idcursos);
            formdata.append('curso', curso);
            formdata.append('horas', horas);
            formdata.append('precio', precio);
            formdata.append('descuento', descuento);
            formdata.append('descripcion', descripcion);
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: formdata,
                async: true,
                processData: false,
                contentType: false,
                success: function(res) {
                    // actualizamos los datos de la tabla de alumnos
                    tablaCursoListado.ajax.reload(null, false);
                    // curso update correctamente
                    if (res == 1) {
                        Swal.fire(
                            'Curso actualizado!',
                            'Creado correctamente',
                            'success'
                        );
                        // curso insert correctamente
                    } else if (res == 2) {
                        Swal.fire(
                            'Curso nuevo!',
                            'Creado correctamente',
                            'success'
                        );
                    }
                }
            });
            $('#modalCrearCurso').modal('hide');
        } else {
            $('#erroresCursos').html(cadena);
        }
    });

    // para actualizar recuperamos los datos con ajax para evitar los signo €
    $('#tablaCursoListado tbody').on('click', '.btnEditarCurso', function() {
        let data = tablaCursoListado.row($(this).parents()).data();
        // borramos los errores antiguos del formulario de update cursos
        $('#erroresCursos').html('');
        idcursos = data.idcursos;
        $.ajax({
            url: '../modelo/crud.php',
            method: 'post',
            data: {
                opcion: 25, //recuperamos los datos del curso de la fila y lo mostramos en un formulario
                idcursos: idcursos
            },
            dataType: 'json',
            success: function(res) {
                // mostramos los datos del curso por pantalla
                res.forEach(element => {
                    $('#inputCurso').val(element.curso);
                    $('#inputHoras').val(element.horas);
                    $('#inputPrecio').val(element.precio);
                    $('#inputDescuento').val(element.descuento);
                    $('#inputDescripcion').val(element.descripcion);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Estado: " + textStatus + ", error: " + errorThrown);
            }
        });
        opcion = 24; // opcion para actualizar los datos del curso
        $('#modalCrearCurso').modal('show');
        $('.modal-header').css('background-color', '#007bff');
        $('.modal-title').html('<h3>Editar curso</h3>');
        $('.modal-header').css('color', 'white');
        $('#tituloNuevoCurso').html('<h3>Editar curso</h3>');
    });



    // botón para eliminar los cursos
    $('#tablaCursoListado tbody').on('click', '.btnBorrarCurso', function() {
        fila = $(this);
        // recuperamos los datos del registro de la fila
        let data = tablaCursoListado.row($(this).parents()).data();
        // abrimos el modol para mostras datos del curso a eliminar
        $('#eliminarCurso').modal('show');
        $('.modal-header').css({
            'background-color': 'red',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Borrado de curso<h3>');
        $('.tituloCurso').html('<h3>Borrado de curso</h3>');
        $('#muestraCurso').html('¿Quieres borrar el id del curso ? ' + data.idcursos + '<p>El curso a borrar es: ' + data.curso + '</p>');
        // guardamos los datos
        idcursos = data.idcursos;
        elcurso = data.curso;
        opcion = 26;
    });

    // botón para borrar el curso seleccionado
    $('#btnEliminarCurso').click(function() {
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idcursos: idcursos
            },
            dataType: 'json',
            success: function(response) {
                // si todo es correcto podemos borrar el curso
                if (response == 1) {
                    // borramos la fila de la tabla
                    tablaCursoListado.row(fila.parents('tr')).remove().draw();
                    Swal.fire(
                        'Eliminado del curso!',
                        'Eliminado correctamente',
                        'success'
                    );
                    // si no podemos borrar el curso muestra un modal de advertencia
                } else if (response == 0) {
                    $('#eliminarCurso').modal('hide');
                    $('#noSePuedeEliminarCurso').modal('show');
                    $('.modal-header').css({
                        'background-color': '#2C3E50',
                        'color': 'white'
                    });
                    $('.modal-title').html('<h3>Error al borrar</h3>');
                    $('.tituloCurso').html('<h3>Error al borrar</h3>');
                    $('#errorCurso').html('!!!No se puede borrar el curso <span>' + elcurso + ' </span> primero se tiene que borrar la matrícula!!!');
                }
            }
        });
        $('#eliminarCurso').modal('hide');
    });
}); //cierre de la function



// function que muestra el botón seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nuevo curso');
    $('#listadoCursos').css({
        'background-color': '#FF9333',
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em"
    });
}
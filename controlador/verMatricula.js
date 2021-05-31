$(function() {
    $('title').text('Página alumnos');

    // muestra por pantalla los datos del alumno en el encabezado
    $('#datosAlumnosMatricula').show();

    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#facturasAlumnos').click(function() {
        $(location).attr('href', 'verfacturas.php');
    });
    $('#editarAlumno').click(function() {
        $(location).attr('href', 'updateAlumno.php');
    });

    // recuperar el id del alumno
    let idAlumno = $('#idpersonasAlumnos').val();


    // muestra la tabla de las matriculas
    var tablaMatricula = $('#tablaMatricula').DataTable({
        // se ordena por fecha de matricula más reciente
        "order": [
            [6, "desc"]
        ],
        "lengthMenu": [
            // [3, 5, 10, 25, 50, -1],
            // [3, 5, 10, 25, 50, "All"]
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        "ajax": {
            "url": "../modelo/crud.php",
            "error": function(jqXHR, ajaxOptions, thrownError) {
                alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
            },
            "method": "POST",
            "data": {
                opcion: '16',
                idAlumno: idAlumno
            },
            "dataSrc": ""
        },
        "columns": [
            { "data": "idmatricula" },
            { "data": "nombre" },
            { "data": "apellido" },
            { "data": "email" },
            { "data": "telefono" },
            {
                "data": "foto",
                'render': function(data, type, row) {
                    return '<center><img src="' + data + '" id="imagenFotoAlumnos" alt="Alumnos"></center>';
                },
            },
            { "data": "fecha" },
            { "data": "curso" },
            { "data": "nota", },
            { "data": "horas", },
            { "defaultContent": `<div class='text-center'><button class='btn btn-primary btn-sm btnVerCurso mr-1'>Curso</button>` }
        ],
        // marca de color verde mas igual de 5 y en rojo menos de 5
        "rowCallback": function(row, data, index) {
            if (data.nota < '5') {
                $('td:eq(8)', row).addClass('color');
                // $(row).css('background-color', '#99ff9c')
            } else {
                // $('td:eq(11)', row).css('background-color', '#99ff9c')
                $('td:eq(8)', row).css('color', 'forestgreen')
            }
        },
        "language": {
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

    //botón ver curso, mostramos la página verCurso.php con el parametro idmatricula con el método POST
    $('#tablaMatricula tbody').on('click', '.btnVerCurso', function() {
        let data = tablaMatricula.row($(this).parents()).data();

        let idmatricula = data.idmatricula;
        // $(location).attr("href", "verCurso.php?idmatricula=" + idmatricula);
        // se manda la id de matricula por metodo post
        $.redirect('verCurso.php', { 'method': 'post', 'idmatricula': idmatricula });
    });


    // devuelve los datos del alumno en el encabezado
    datosCabecera(idAlumno);

}); //cierra funcion principal


// function para recuperar los datos del alumno
function datosCabecera(idAlumno) {
    // cargamos los datos de la cabecera 
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: {
            'opcion': 21,
            'idAlumno': idAlumno
        },
        // dataType: 'json',
        success: function(res) {
            dato = JSON.parse(res);
            if (Array.isArray(dato) && dato.length) {
                dato.forEach(element => {
                    $('#CabeceraNombre').html(element.nombre);
                    $('#CabeceraApellido').html(element.apellido);
                    $('#CabeceraEmail').html(element.email);
                    $('#CabeceraTelefono').html(element.telefono);
                    $('#CabeceraEdad').html(element.edad);
                });
            } else {
                // si no encuentra los datos vuelve al index.php
                location.replace('../index.php');
            }
        },
        error: function(exception) {
            console.error("Ocurrió un error", exception);
            // Código en caso de error
        }
    });
}


// function que muestra el botón seleccionado
function botonseleccionado() {
    $('#matriculaAlumnos').css({
        'background-color': '#FF9333',
        'color': 'white',
        'font-family': "sans-serif, 'Gill Sans', 'Gill Sans MT'"
    })
}
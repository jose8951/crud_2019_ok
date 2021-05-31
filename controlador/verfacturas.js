$(function() {
    $('title').text('Página facturas');
    // muestra por pantalla los datos del alumno en el encabezado
    $('#datosAlumnosMatricula').show();
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#matriculaAlumnos').click(function() {
        $(location).attr('href', 'verMatricula.php');
    });
    $('#editarAlumno').click(function() {
        $(location).attr('href', 'updateAlumno.php');
    });

    // recuperar los datos del usuario por medio del id 
    let idPersonas = $('#idpersonasAlumnos').val();

    // muestra la tabla de las facturas
    $('#tablaFacturas').DataTable({
        // ordenamos la columna 0 de forma desc
        "order": [
            [0, "desc"]
        ],
        "lengthMenu": [
            // [3, 5, 10, 25, 50, -1],
            // [3, 5, 10, 25, 50, "All"]
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        'ajax': {
            'url': '../modelo/crud.php',
            "error": function(jqXHR, ajaxOptions, thrownError) {
                alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
            },
            'method': 'post',
            'data': {
                opcion: '4',
                idAlumno: idPersonas
            },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idfactura' },
            { 'data': 'nombre' },
            { 'data': 'apellido' },
            { 'data': 'dni' },
            { 'data': 'email' },
            { 'data': 'curso' },
            { 'data': 'horas' },
            { 'data': 'precio' },
            { 'data': 'Descuento' },
            { 'data': 'Total' },
            { 'data': 'nota' },
            { 'data': 'pagado' },
            { 'data': 'fecha' }
        ],
        // marcamos si las facturas estan pagadas
        "rowCallback": function(row, data, index) {
            if (data.pagado != 'si') {
                $('td:eq(11)', row).addClass('color');
                // $(row).css('background-color', '#99ff9c')
            } else {
                // $('td:eq(11)', row).css('background-color', '#99ff9c')
                $('td:eq(11)', row).css('color', 'forestgreen')
            }
            // marcamos las notas de color 
            if (data.nota <= 5) {
                $('td:eq(10)', row).addClass('color');
            } else {
                $('td:eq(10)', row).css('color', 'forestgreen')
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

    // devuelve los datos del alumno en el encabezado
    datosCabecera(idPersonas);


});

// function para recuperar los datos del alumno
function datosCabecera(idPersonas) {
    // cargamos los datos de la cabecera 
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: {
            'opcion': 21,
            'idAlumno': idPersonas
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
    $('#facturasAlumnos').css({
        'background-color': '#FF9333',
        'color': 'white',
        'font-family': "sans-serif, 'Gill Sans', 'Gill Sans MT'"
    })
}
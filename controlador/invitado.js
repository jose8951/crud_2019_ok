$(function() {
        $('title').text('Página invitado');

        // botón para salir vuelve al index.php
        $('#salirInvitado').click(function() {
            $(location).attr('href', '../index.php');
        });

        // tabla de los cursos para los invitados
        $('#tablaInvitado').DataTable({
            // ordenamos desc la tabla por la columna 0 
            "order": [
                [0, "desc"]
            ],
            'lengthMenu': [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            "ajax": {
                "url": "../modelo/crud.php",
                "error": function(jqXHR, ajaxOptions, thrownError) {
                    alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
                },
                "method": "POST",
                "data": { opcion: '1' },
                "dataSrc": ""
            },
            "columns": [
                { "data": "idcursos" },
                { "data": "curso" },
                { "data": "horas" },
                { "data": "Precio" },
                { "data": "Descuento" },
                { "data": "Total" },
                { "data": "descripcion" }
            ],
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
    }) //cierre
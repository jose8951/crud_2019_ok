$(function() {
    document.title = "My New Page Title";
    // tablaPersonas = $("#tablaPersonas").DataTable({
    //     "columnDefs": [{
    //         "targets": -1,
    //         "data": null,
    //         "defaultContent": "<div class='text-center'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div>"
    //     }],
    //     //Para cambiar el lenguaje a español
    //     "language": {
    //         "lengthMenu": "Mostrar _MENU_ registros",
    //         "zeroRecords": "No se encontraron resultados",
    //         "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    //         "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    //         "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    //         "sSearch": "Buscar:",
    //         "oPaginate": {
    //             "sFirst": "Primero",
    //             "sLast": "Último",
    //             "sNext": "Siguiente",
    //             "sPrevious": "Anterior"
    //         },
    //         "sProcessing": "Procesando...",
    //     }
    // });

    // opcion = 5;
    $('#otra').click(function() {

        $(location).attr('href', 'vista/profesores.php')

    })




    var tablaPersonas = $('#tablaPersonas').DataTable({
        "ajax": {
            "url": "bd/crud.php",
            "error": function(jqXHR, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + jqXHR.statusText + "\r\n" + jqXHR.responseText + "\r\n" + ajaxOptions.responseText);
            },
            "method": "POST",
            "data": { opcion: '5' },
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "nombre" },
            { "data": "pais" },
            { "data": "edad" },
            { "defaultContent": `<div class='text-center'><button class='btn btn-primary btnEditar mr-1'>Editarr</button>
                                                        <button class='btn btn-danger btnBorrar'>Borrar</button></div>` }
        ]
    });



    $('#btnNuevo').click(function() {
        $('#formPersonas').trigger('reset');
        $('.modal-header').css('background-color', '#28a745');
        $('.modal-title').text('nueva personal');
        $('.modal-header').css('color', 'white');
        $('#modalCRUD').modal('show');
        opcion = 1;
        id = null;
    });


    $('#formPersonas').submit(function(e) {
        e.preventDefault();
        let nombre = $.trim($('#nombre').val());
        let pais = $.trim($('#pais').val());
        let edad = $.trim($('#edad').val());
        console.log(opcion);
        $.ajax({
            type: "post",
            url: "bd/crud.php",
            data: {
                nombre: nombre,
                pais: pais,
                edad: edad,
                id: id,
                opcion: opcion
            },
            dataType: "json",
            success: function(data) {
                tablaPersonas.ajax.reload(null, false);
            }
        });
        $('#modalCRUD').modal('hide');
    });


    //botón editar
    $('#tablaPersonas tbody').on('click', '.btnEditar', function() {
        let data = tablaPersonas.row($(this).parents()).data();
        console.log(data);
        // Object { id: "105", nombre: "pepe", pais: "2020-12-09", edad: "12" }

        id = data.id;
        nombre = data.nombre;
        pais = data.pais;
        edad = data.edad;

        $('#nombre').val(nombre);
        $('#pais').val(pais);
        $('#edad').val(edad);
        opcion = 2; //editar

        $('.modal-header').css('background-color', '#007bff');
        $('.modal-header').css('color', 'white');
        $('.modal-title').text('Editar Persona');
        $('#modalCRUD').modal('show');
    })

    //botón eliminar
    $('#tablaPersonas tbody').on('click', '.btnBorrar', function() {
        fila = $(this);
        let data = tablaPersonas.row($(this).parents()).data();
        id = data.id;
        opcion = 3;
        console.log(data.id);
        var respuesta = confirm("¿Está seguro de eliminar el registro: " + id + "?");
        if (respuesta) {
            $.ajax({
                type: "post",
                url: "bd/crud.php",
                data: { opcion: opcion, id: id },
                dataType: "json",
                success: function() {
                    tablaPersonas.row(fila.parents('tr')).remove().draw();
                }
            });
        }
    })


}); //cierre
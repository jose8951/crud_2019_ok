$(function() {
    $('title').text('Página factura');
    // Marca el botón seleccionado de otro color
    botonseleccionado();
    // recuperar el id del profesor
    let idpersonasProfesor = $('#idpersonasProfesor').val();

    // Botones del nav de la página
    $('#listadoMatricula').click(function() {
        $(location).attr('href', 'listadoMatricula.php');
    });
    $('#listadoAlumnos').click(function() {
        $(location).attr('href', 'listadoAlumno.php');
    });
    $('#listadoCursos').click(function() {
        $(location).attr('href', 'listadoCursos.php');
    });
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#modificarProfesor').click(function() {
        $(location).attr('href', 'updateProfesor.php');
    });

    // muestra la tabla de las facturas
    tablaProfesoresFacturas = $('#tablaProfesoresFacturas').DataTable({
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
            'error': function(jqXHR, ajaxOptions, thrownError) {
                alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
            },
            'method': 'post',
            'data': {
                opcion: '27',
                idpersonasProfesor: idpersonasProfesor
            },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idfactura' },
            { 'data': 'nombre' },
            { 'data': 'apellido' },
            {
                'data': 'foto',
                'render': function(data, type, row) {
                    return '<center><img src="' + data + '" id="imagenFotoAlumnos"></center>';
                },
            },
            { 'data': 'dni' },
            { 'data': 'email' },
            { 'data': 'curso' },
            { 'data': 'horas' },
            { 'data': 'precio' },
            { 'data': 'descuento' },
            { 'data': 'total' },
            { 'data': 'nota' },
            { 'data': 'pagado' },
            { 'data': 'fecha' },
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnEditarFactura'>Editar</button>
            <button class='btn btn-danger btnBorrarFactura'>Borrar</button></div>` }
        ],
        // marcamos de color las notas 
        'rowCallback': function(row, data, index) {
            if (data.nota < 5) {
                $('td:eq(11)', row).addClass('color');
            } else {
                $('td:eq(11)', row).css('color', 'forestgreen');
            }
            if (data.pagado != 'si') {
                $('td:eq(12)', row).addClass('color');
            } else {
                $('td:eq(12)', row).css('color', 'forestgreen');
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


    // botón que abre un formulario  para crear una nueva factura 
    $('#crearnuevo').click(function() {
        // recupeamos los datos del alumno y curso en un select
        selectMatricualFactura(idpersonasProfesor);

        // abrimos el modal para crear una nueva factura
        $('#modalFacturasNuevo').modal('show');
        $('.errores').html('');
        $('#formFacturas').trigger('reset');
        $('.modal-header').css({
            'background-color': '#286090',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Creación nueva factura</h3>');
        $('#tituloFactura').html('<h3>Creación nueva factura</h3>');
        opcion = 30; //cuando los datos de la factura son nuevos INSERT
        idfactura = null;
        // por defecto marcamos no pagado
        $("#inlineRadio2").prop("checked", true);
    });

    // formulario para guardar los datos de la facturas
    $('#formFacturas').submit(function(e) {
        e.preventDefault();
        $('.errores').html('');
        let idMatricula = $.trim($('#lista_factura').val()); //id de la matricula
        let fechaFactura = $.trim($('#inputDateFacturas').val());
        let radiofactura = $('input:radio[name=inlineRadioOptions]:checked').val();

        // valiamos el formulario con los datos de la facturas
        if (validarFormularioFacturas(idMatricula, fechaFactura, radiofactura)) {
            $.ajax({
                url: '../modelo/crud.php',
                type: 'post',
                data: {
                    idMatricula: idMatricula,
                    idfactura: idfactura,
                    fechaFactura: fechaFactura,
                    radiofactura: radiofactura,
                    opcion: opcion
                },
                success: function(res) {
                    // recargamos los datos de la pantalla
                    tablaProfesoresFacturas.ajax.reload(null, false);
                    if (res == 3) { //si devuelve 3 se han insertado los datos de las facturas
                        Swal.fire(
                            'Insertado el registro!',
                            'insertado correctamente',
                            'success'
                        );
                    } else if (res == 2) { //Si devuelve 2 se han actualizado los datos de las facturas
                        Swal.fire(
                            'Update el registro!',
                            'Actualizado correctamente',
                            'success'
                        );
                    }
                },
                error: function(xhr, status) {
                    alert('Disculpe, existio un problema');
                }
            });
            // cerramos el modal de insertar datos
            $('#modalFacturasNuevo').modal('hide');
        } else {
            $('.errores').html(cadena);
        }
    });



    // boton para update los datos de las facturas
    $('#tablaProfesoresFacturas tbody').on('click', '.btnEditarFactura', function() {
        // para modificar las factura recuperamos todas las matrículas de los alumnos
        selectMatricualFacturaUpdate(idpersonasProfesor);

        // abrimos el modal de facturas para rellenar los datos
        $('#modalFacturasNuevo').modal('show');
        $('.errores').html('');
        $('#formFacturas').trigger('reset');
        $('.modal-header').css({
            'background-color': '#286090',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Actualización de la factura</h3>');
        $('#tituloFactura').html('<h3>Actualización de la factura</h3>');

        // recuperamos los datos de la fila de la tabla de facturas
        let data = tablaProfesoresFacturas.row($(this).parents()).data();
        let idmatricula = data.idmatricula;
        idfactura = data.idfactura;
        let fecha = data.fecha;
        let pagado = data.pagado;
        opcion = 13; // opcion para recuperar el id de matricula select
        $('#inputDateFacturas').val(fecha);
        if (pagado == 'si') {
            $("#inlineRadio1").prop("checked", true);
        } else if (pagado == 'no') {
            $("#inlineRadio2").prop("checked", true);
        }

        // Con ajax cargamos la matricula seleccionada en el select
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idmatricula: idmatricula
            },
            success: function(res) {
                data = $.parseJSON(res);
                console.log(data);
                data.forEach(function(element) {
                    $('#lista_factura').val(element.idmatricula);
                    opcion = 31; // opcion para update los datos de las facturas.                    
                });
            }
        });
    });



    //Seleccionamos los datos de la factura que vamos a borrar
    $('#tablaProfesoresFacturas tbody').on('click', '.btnBorrarFactura', function() {
        fila = $(this);
        let data = tablaProfesoresFacturas.row($(this).parents()).data();
        idfactura = data.idfactura;
        opcion = 34; //opion para borrar la factura DELETE
        $('#eliminarFactura').modal('show');
        $('.modal-header').css('background-color', 'red');
        $('.modal-title').html('<h3>Borrado de facturas</h3>');
        $('.modal-title').css('color', 'white');
        $('.tituloFactura').html('<h3>Borrado de facturas</h3>');
        $("#fotoBorrar").attr("src", data.foto);
        $('#muestraFacturaBorrar').html('<br>¿Quieres borrar la factura?: ' + data.idfactura + ' <br>Alumno: ' +
            data.nombre + " " + data.apellido);
    });

    // botón para eliminar los datos de la factura
    $('#btnEliminarFactura').click(function() {
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idfactura: idfactura
            },
            success: function(response) {
                if (response) {
                    // si todo es correcto se borra la fila de la tabla y muestra un mensaje
                    tablaProfesoresFacturas.row(fila.parents('tr')).remove().draw();
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
        $('#eliminarFactura').modal('hide');
    });



}); //fin de la function


// function para recuperar los datos del alumno y curso y lo mostramos en un select
function selectMatricualFactura(idpersonasProfesor) {
    console.log(idpersonasProfesor);
    $.ajax({
        url: '../modelo/crud.php',
        method: 'post',
        data: {
            'opcion': 29,
            'idpersonasProfesor': idpersonasProfesor
        },
        success: function(res) {
            data = $.parseJSON(res);
            let resulFactura = '<option value="0">Elige una opcion</option>';
            data.forEach(function(element) {
                resulFactura += '<option value=' + element.idmatricula + '>Matrícula ' + element.idmatricula + ' - ' + element.nombre +
                    ' - ' + element.apellido + ' - ' + element.curso + ' </option>';
            });
            $('#lista_factura').html(resulFactura);
        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}

// function que muestra las matriculas en un select para modificar las facturas
function selectMatricualFacturaUpdate(idpersonasProfesor) {
    $.ajax({
        url: '../modelo/crud.php',
        method: 'post',
        data: {
            'opcion': 33,
            'idpersonasProfesor': idpersonasProfesor
        },
        success: function(res) {
            data = $.parseJSON(res);
            // console.log(data);
            let resulFactura = '<option value="0">Elige una opcion</option>';
            data.forEach(function(element) {
                resulFactura += '<option value=' + element.idmatricula + '>Matrícula ' + element.idmatricula + ' - ' + element.nombre +
                    ' - ' + element.apellido + ' - ' + element.curso + ' </option>';
            });
            // muestra el valor de la base de datos en un select
            $('#lista_factura').html(resulFactura);
        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}



// le da formator al boton seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nueva factura');
    $('#listadoFacturas').css('background-color', '#FF9333');
    $('#listadoFacturas').css({
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em"
    });
}
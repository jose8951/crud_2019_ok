$(function() {
    $('title').text('Página administrador');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#listadoAdminProfesor').click(function() {
        $(location).attr('href', 'admProfesor.php');
    });
    $('#updateAdministrador').click(function() {
        $(location).attr('href', 'updateAdministrador.php');
    });
    $('#desconexionProfesor').click(function() {
        $(location).attr('href', 'salir.php');
    });

    // muestra la tabla de los administradores
    tablaAdministrador = $('#tablaAdministrador').DataTable({
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
            'data': { 'opcion': 36, 'permiso': 4 },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idpersonas' },
            { 'data': 'usuario' },
            { 'data': 'nombre' },
            { 'data': 'apellido' },
            { 'data': 'edad' },
            { 'data': 'telefono' },
            { 'data': 'dni' },
            { 'data': 'email' },
            {
                'data': 'foto',
                'render': function(data, type, row) {
                    return '<center><img src="' + data + '" id="imagenFotoProfesor"></center>';
                },
            },
            { 'data': 'permiso' },
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnPermisosAdministrador'>Permisos</button>
            <button class='btn btn-danger btnBorrarAdministrador'>Borrar</button></div>` }
        ],
        // muestra los permisos de los administradores
        'rowCallback': function(row, data, index) {
            if (data.permiso == 4) {
                $('td:eq(9)', row).html('permiso');
                $('td:eq(9)', row).css({
                    'color': 'forestgreen',
                    'text-align': 'center'
                });
            } else if (data.permiso == 10) {
                $('td:eq(9)', row).html('bloqueado');
                $('td:eq(9)', row).css({
                    'color': 'red',
                    'text-align': 'center'
                });
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

    // botón que abre un modal para crear un nuevo administrador por el administrador
    $('#crearnuevo').click(function() {
        $('#crearAdministrador').modal('show');
        $('#formNuevoAdministrador').trigger('reset');
        $('.modal-header').css('background-color', '#286090');
        $('.modal-title').html('<h3>Creación del nuevo administrador</h3>');
        $('.modal-title').css({
            'color': 'white'
        });
        $('#tituloNuevoAdministrador').html('<h3>Nuevo administrador</h3>');
        $('#tituloNuevoAdministrador').css('margin-bottom', '25px');
        opcion = 19;
        // radio marcado por defecto bloqueado
        $('#inlineRadio2').prop('checked', true);
        // comprobamos que el usuario no este repetido en la base de datos
        comprobarUsuarioRepetido();
    });

    // Botón para enviar los datos del nuevo administrador cuando estén validados
    $('#formNuevoAdministrador').submit(function(e) {
        e.preventDefault();
        let usuario = $('#inputUsuario').val();
        let nombre = $('#inputNombre').val();
        let apellidos = $('#inputAlellidos').val();
        let fechaNac = $('#inputFecha').val();
        let telefono = $('#inputTelefono').val();
        let dni = $('#inputDni').val();
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $('#inputEmail').val();
        let filesNueva = $('#inputFile')[0].files[0];
        let password1 = $('#inputPassword1').val();
        let password2 = $('#inputPassword2').val();
        let radioAdministrador = $('input:radio[name=radioOptions]:checked').val();

        // validamos los datos del formulario del nuevo administrador con el radio
        if (validarFormularioUpdateAdministradorTodo(usuario, nombre, apellidos, fechaNac, telefono, email, dniMayusculas, filesNueva, password1, password2, radioAdministrador)) {
            let formdata = new FormData();
            formdata.append('opcion', opcion);
            formdata.append('usuario', usuario);
            formdata.append('nombre', nombre);
            formdata.append('apellido', apellidos);
            formdata.append('fechaNac', fechaNac);
            formdata.append('telefono', telefono);
            formdata.append('dni', dniMayusculas);
            formdata.append('email', email);
            formdata.append('file', filesNueva);
            formdata.append('password1', password1);
            formdata.append('permiso', radioAdministrador);
            formdata.append('descripcion', 'administrador');

            //pasamos los datos del administrador para insertar al administrador por primera vez
            enviarDatosAdministrador(formdata, 'nuevo');
            $('#crearAdministrador').modal('hide');
        } else {
            $('#erroresAdministrador').html(cadena);
        }
    });


    // boton editar el administrador para modificar los permisos
    $('#tablaAdministrador tbody').on('click', '.btnPermisosAdministrador', function() {
        let data = tablaAdministrador.row($(this).parents()).data();
        idpersonas = data.idpersonas;
        lafoto = data.foto;
        $('#updatePermisosAdministrador').modal('show');
        $('#errorAdministradorPermisos').html('');
        $('#formPermisosAdministrador').trigger('reset');
        $('.modal-header').css({
            'background-color': '#286090',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Modificar administrador</h3>');
        $('#tituloAdministradorPermisos').html('<h3>Permisos administrador</h3>');
        $('#administradorAcambiar').html('<p>El administador a cambiar es: ' + data.nombre + ' ' + data.apellido + '</p>');
        $('#fotoAdministradorPermisos').attr('src', data.foto);
        // si el permiso es 10 es que el usuario esta bloqueado
        if (data.permiso == 10) {
            $('#RadioUpAdministrador10').prop('checked', true);
            // si el permiso es 4 el usuario tiene los permisos
        } else if (data.permiso == 4) {
            $('#RadioUpAdministrador4').prop('checked', true);
        }
        opcion = 38;
    });

    // formulario para modificar los permisos del administrador
    $('#btnPermisosAdministrador').click(function(e) {
        e.preventDefault();
        // recuperamos el radio del administrador
        let radioAdministrador = $('input:radio[name=radioUpOptions]:checked').val();
        // validamos el estado del radio que tiene el administrador solo tiene dos opciones 4 o 10
        if (validarFormularioUpdateAdministrador(radioAdministrador)) {
            $('#errorAdministradorPermisos').html('');
            let parametros = {
                'opcion': opcion,
                'idpersonas': idpersonas,
                'permiso': radioAdministrador
            };
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: parametros,
                dataType: 'json',
                success: function(res) {
                    if (res) {
                        tablaAdministrador.ajax.reload(null, false);
                        $('#updatePermisosAdministrador').modal('hide');
                        // si todo es correcto muestra un mensaje
                        Swal.fire(
                            'Modificado!',
                            'Modificado permiso',
                            'success'
                        );
                    }
                }
            });
        } else {
            $('#errorAdministradorPermisos').html(cadena);
        }
    });

    // botón que recupera los datos del administrador y los muestra en un modal
    $('#tablaAdministrador tbody').on('click', '.btnBorrarAdministrador', function() {
        // recuperamos la fila de la tabla para borrar
        let data = tablaAdministrador.row($(this).parents()).data();
        fila = $(this);
        idpersonas = data.idpersonas;
        opcion = 18;
        // abrimos el modal para mostrar los datos del administrador a borrar
        $('#eliminarAdministrador').modal('show');
        $('.modal-header').css({
            'background-color': 'red',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Borrado del administrador</h3>');
        $('#tituloAdministradorBorrado').html('<h3>Borrado del administrador</h3>');
        $('#fotoBorrarAdministrador').attr('src', data.foto);
        $('#muestraAdministrador').html('<p>¿Quieres borrar el administrador Id. ?: ' + data.idpersonas + ' <br>Administrador: ' + data.nombre + " " + data.apellido + "<p>");
    });

    // botón para borrar el administrador seleccionado
    $('#btnEliminarAdministrador').on('click', function() {
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idpersonas: idpersonas
            },
            dataType: 'json',
            success: function(res) {
                if (res) {
                    tablaAdministrador.row(fila.parents('tr')).remove().draw();
                    // si todo es correcto muestra un mensaje
                    Swal.fire(
                        'Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    );
                }
            }
        });
        $('#eliminarAdministrador').modal('hide');
    });
}); //cierre de la funcion

// function para insert o update los datos del administrador
function enviarDatosAdministrador(formData, valor) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        success: function(res) {
            if (res) {
                tablaAdministrador.ajax.reload(null, false);
                if (valor == 'nuevo') {
                    Swal.fire(
                        'Nuevo administrador!',
                        'Creado correctamente',
                        'success'
                    );
                } else if (valor == 'modificar') {
                    Swal.fire(
                        'Modificado administrador',
                        'Modificado correctamente',
                        'success'
                    );
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Estado: " + textStatus + ", error: " + errorThrown);
        }
    });
}



// con la function comprobamos que el usuario administrador no este repetido
function comprobarUsuarioRepetido() {
    $('#inputUsuario').keyup(function(e) {
        let repetidoUsuario = $(this).val();
        $('#erroresAdministrador').html('');
        let parametros = {
            'opcion': 20,
            'repetidoUsuario': repetidoUsuario
        };
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: parametros,
            dataType: 'json',
            success: function(response) {
                if (response) {
                    $('#botonNuevoAdministrador').prop('disabled', true);
                    $('#erroresAdministrador').html('Este usuario está en la base de datos');
                } else {
                    $('#botonNuevoAdministrador').prop('disabled', false);
                }
            }
        });
    });
}

// le da formator al boton seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nuevo administrador');
    $('#crearnuevo').css({
        'width': '150px'
    });
    $('#listadoAdminAdministrador').css({
        'background-color': '#FF9333',
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em",
        'width': '150px'
    });
}
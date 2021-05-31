$(function() {
    $('title').text('Página administrador');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // recuperar el id del profesor
    // let idpersonasAdministrador = $('#idpersonasAdministrador').val();


    // Botones del nav de la página
    $('#listadoAdminAdministrador').click(function() {
        $(location).attr('href', 'admAdministrador.php');
    });
    $('#updateAdministrador').click(function() {
        $(location).attr('href', 'updateAdministrador.php');
    });
    $('#desconexionProfesor').click(function() {
        $(location).attr('href', 'salir.php');
    });



    // muestra la tabla de los profesores
    tablaAdminProfesor = $('#tablaAdminProfesor').DataTable({
        "order": [
            [0, "desc"]
        ],
        // 'lengthMenu': [
        //     [3, 5, 10, 25, 50, -1],
        //     [3, 5, 10, 25, 50, 'All']
        // ],
        'lengthMenu': [
            [10, 25, 50, -1],
            [10, 25, 50, 'All']
        ],
        'ajax': {
            'url': '../modelo/crud.php',
            "error": function(jqXHR, ajaxOptions, thrownError) {
                alert("primero" + thrownError + "\nSegundo" + jqXHR.statusText + "\ntercero" + jqXHR.responseText + "\ncuarto" + ajaxOptions.responseText);
            },
            'method': 'POST',
            'data': { 'opcion': 36, 'permiso': 3 },
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
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnEditarProfesor'>Editar</button>
            <button class='btn btn-danger btnBorrarProfesor'>Borrar</button></div>` }
        ],
        // Diferenciamos los permisos en verde o rojo
        'rowCallback': function(row, data, index) {
            if (data.permiso == 3) { //si devuelve 3 tiene permisos
                $('td:eq(9)', row).html('permiso');
                $('td:eq(9)', row).css({
                    'color': 'forestgreen',
                    'text-align': 'center'
                });

            } else if (data.permiso == 0) { //si devuelve 0 está bloqueado
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

    // botón que abre un modal para crear un nuevo profesor por el administrador
    $('#crearnuevo').click(function() {
        $('#crearProfesor').modal('show');
        $('#formNuevoProfesor').trigger('reset');
        $('.modal-header').css('background-color', '#286090');
        $('.modal-title').html('<h3>Creación del nuevo profesor</h3>');
        $('#tituloNuevoProfesor').html('<h3>Nuevo profesor</h3>');
        $('.modal-title').css({
            'color': 'white',
            'background-color': '#286090'
        });
        opcion = 19;
        // radio marcado por defecto bloqueados
        $('#inlineRadio2').prop('checked', true);
        // Comprobamos que el usuario no este repetido en la base de datos
        comprobarUsuarioRepetido();
    });

    // Botón para enviar los datos del nuevo profesor cuando estén validados
    $('#formNuevoProfesor').submit(function(e) {
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
        let radioProfesor = $('input:radio[name=radioOptions]:checked').val();

        // validamos los datos del formulario del nuevo profesor
        if (validarFormularioNuevoProfesores(usuario, nombre, apellidos, fechaNac, telefono, email, dniMayusculas, filesNueva, password1, password2, radioProfesor)) {
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
            formdata.append('permiso', radioProfesor);
            formdata.append('descripcion', 'profesor');

            // le pasamos los parametros del nuevo profesor para insertar los datos
            let nuevo = 'nuevo';
            enviarDatosProfesor(formdata, nuevo);
            $('#crearProfesor').modal('hide');
        } else {
            $('#erroresprofesor').html(cadena);
        }
    });


    // abrimos el modal y recuperamos los datos del profesor que vamos a modificar
    $('#tablaAdminProfesor tbody').on('click', '.btnEditarProfesor', function() {
        $('.errores').html('');
        $('#modalModificarProfesor').modal('show');
        $('#formUpdateProfesor').trigger('reset');
        $('.modal-header').css({
            'background-color': '#286090',
            'color': 'white'
        });
        $('.modal-title').css('background-color', '#286090')
        $('.modal-title').html('<h3>Modificar profesor</h3>');
        $('#tituloUpdateProfesor').html('<h3>Modificación del profesor</h3>');
        let data = tablaAdminProfesor.row($(this).parents()).data();
        idpersonas = (data.idpersonas);
        lafoto = data.foto;
        $('#inputUpNombre').val(data.nombre);
        $('#inputUpApellidos').val(data.apellido);
        $('#inputUpFecha').val(data.fecha);
        $('#inputUpTelefono').val(data.telefono);
        $('#inputUpDni').val(data.dni);
        $('#inputUpEmail').val(data.email);
        $('#imagenfile').attr('src', data.foto);
        if (data.permiso == 0) {
            $('#RadioUpProfesor0').prop('checked', true);
        } else if (data.permiso == 3) {
            $('#RadioUpProfesor3').prop('checked', true);
        }
        opcion = 37;
    });



    // botón para actualizar los datos del profesor
    $('#formUpdateProfesor').submit(function(e) {
        e.preventDefault();
        let nombre = $.trim($('#inputUpNombre').val());
        let apellido = $.trim($('#inputUpApellidos').val());
        let fechaNac = $.trim($('#inputUpFecha').val());
        let telefono = $.trim($('#inputUpTelefono').val());
        let dni = $.trim($('#inputUpDni').val());
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $.trim($('#inputUpEmail').val());
        let filesNueva = $('#inputFileUpdate')[0].files[0];
        let radioProfesor = $('input:radio[name=radioUpOptions]:checked').val();
        // validamos los datos del profesor sin el password 

        if (validarFormularioUpdateProfesorSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva, radioProfesor)) {
            $('.errores').html('');
            let formData = new FormData();
            formData.append('idpersonas', idpersonas);
            formData.append('opcion', opcion);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('fechaNac', fechaNac);
            formData.append('telefono', telefono);
            formData.append('dni', dniMayusculas);
            formData.append('email', email);
            formData.append('file', filesNueva);
            formData.append('permiso', radioProfesor);
            formData.append('descripcion', 'profesor');

            // pasamos los datos de la nueva actualización
            let modificar = 'modificar';
            enviarDatosProfesor(formData, modificar);

            $('#modalModificarProfesor').modal('hide');
        } else {
            $('.errores').html(cadena);
        }
    });




    // botón que abre un modal para cambiar el password del profesor
    $('#cambiarPassword').click(function() {
        $('#modalModificarProfesor').modal('hide');
        $('#modalUpdateAlPassword').modal('show');
        $('#formUpdateProfesorPassword').trigger('reset');
        $('#erroresPassword').html('');
        $('.modal-header').css('background-color', '#5cb85c');
        $('.modal-title').css('background-color', '#5cb85c');
        $('.modal-title').html('<h3>Modificación del password</h3>');
        $('#tituloUpdatePassword').html('<h3>Password del profesor</h3>');
        $('#tituloUpdatePassword').css({
            'color': 'black',
            'margin-bottom': '3%'
        });
        // foto del profesor para cambiar password
        $('#imagenfilePass').attr('src', lafoto);
    });

    // enviamos los datos del password para modificar
    $('#formUpdateProfesorPassword').submit(function(e) {
        e.preventDefault();
        let password1 = $('#inputPassword1Pass').val();
        let password2 = $('#inputPassword2Pass').val();

        // validamos los datos del password del profesor
        if (valiadarFormularioPassword(password1, password2)) {
            opcion = 15
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idpersonas', idpersonas);
            formData.append('password1', password1);
            // enviamos los datos del password modificado
            enviarDatosPasswordProfesor(formData);
        } else {
            $('#erroresPassword').html(cadena);
        }
    });



    // botón que muestra en un modal los datos del profesor que vamos a borrar
    $('#tablaAdminProfesor tbody').on('click', '.btnBorrarProfesor', function() {
        fila = $(this);
        // recuperamos los datos de la fila de la tabla que vamos a borrar
        let data = tablaAdminProfesor.row($(this).parents()).data();
        idpersonas = data.idpersonas;
        opcion = 18;
        $('#eliminarProfesor').modal('show');
        $('#advertenciaBorrado').html('!!!Si tiene asignada una matricula no se puede borrar!!!')
        $('#advertenciaBorrado').css('color', 'red');
        $('.modal-header').css('background-color', 'red');
        $('.modal-title').html('<h3>Borrado del profesor</h3>');
        $('.modal-title').css({
            'color': 'white',
            'background-color': 'red'
        });
        $('#tituloProfesorBorrado').html('<h3>Borrado del profesor</h3>')
        $('#muestraMatricula').html('<br>¿Quieres borrar al profesor?: ' + data.idpersonas + ' <br>Profesor: ' + data.nombre + " " + data.apellido)
        $("#fotoBorrarProfesor").attr("src", data.foto);
    });

    // botón para eliminar los datos del profesor
    $('#btnEliminarProfesor').on('click', function() {
        $.ajax({
            type: 'post',
            url: '../modelo/crud.php',
            data: {
                opcion: opcion,
                idpersonas: idpersonas
            },
            dataType: 'json',
            success: function(res) {
                // si no puede eliminar al profesor muestra una advertencia
                if (res == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al borrar...',
                        text: '¡Algo salió mal!',
                    })
                } else if (res == 1) {
                    tablaAdminProfesor.row(fila.parents('tr')).remove().draw();
                    // si todo es correcto muestra un mensaje
                    Swal.fire(
                        'Eliminado!',
                        'Eliminado correctamente',
                        'success'
                    );
                }
            }
        });
        $('#eliminarProfesor').modal('hide');
    });
}); //fin de la function


// con la function comprobamos que el usuario no este repetido en la base de datos
function comprobarUsuarioRepetido() {
    $('#inputUsuario').keyup(function(e) {
        let repetidoUsuario = $(this).val();
        $('#erroresprofesor').html('');
        let parametros = {
            'opcion': 20,
            'repetidoUsuario': repetidoUsuario
        };
        $.ajax({
            type: "POST",
            url: "../modelo/crud.php",
            data: parametros,
            dataType: "json",
            success: function(response) {
                if (response) {
                    $('#botonNuevoProfesor').prop("disabled", true);
                    $('#erroresprofesor').html('Este usuario está en la base de datos');
                } else {
                    $('#botonNuevoProfesor').prop("disabled", false);
                }
            }
        });
    });
}


// function para (insertar  ó update) los datos del profesor segun el 'valor' (nuevo o modificar)
function enviarDatosProfesor(formdata, valor) {
    $.ajax({
        type: "post",
        url: "../modelo/crud.php",
        data: formdata,
        async: true,
        processData: false,
        contentType: false,
        // dataType: "json",
        success: function(response) {
            if (response) {
                // si todo es correcto (insertamos o modificamos) los datos de la tabla
                tablaAdminProfesor.ajax.reload(null, false);
                if (valor == 'nuevo') {
                    Swal.fire(
                        'Nuevo profesor!',
                        'Creado correctamente',
                        'success'
                    );
                } else if (valor == 'modificar') {
                    Swal.fire(
                        'Modificado profesor',
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

// function que recibe los nuevos datos del password del profesor
function enviarDatosPasswordProfesor(formData) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(res) {
            // si todo es correcto nos confirma el cambio de password
            if (res == 1) {
                Swal.fire(
                    'Cambio de password!',
                    'Modificado correctamente',
                    'success'
                );
            }
        }
    });
    $('#modalUpdateAlPassword').modal('hide');
}

// le da formator al boton seleccionado
function botonseleccionado() {
    $('#listadoAdminProfesor').css('background-color', '#FF9333');
    $('#listadoAdminProfesor').css({
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em"
    });
    $('#crearnuevo').html('Nuevo Profesor');
}
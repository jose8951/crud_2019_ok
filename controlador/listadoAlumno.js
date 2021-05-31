$(function() {
    $('title').text('Listado alumno');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // Botones del nav de la página
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#listadoMatricula').click(function() {
        $(location).attr('href', 'listadoMatricula.php');
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


    // muestra la tabla de los alumnos
    tablaAlumnoListado = $('#tablaAlumnoListado').DataTable({
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
                opcion: '17',
                permiso: '2'
            },
            'dataSrc': ''
        },
        'columns': [
            { 'data': 'idpersonas' },
            { 'data': 'usuario' },
            { 'data': 'nombre' },
            // {
            //     'data': 'fecha',
            //     "targets": [1],
            //     "visible": false,
            //     "searchable": false
            // },
            { 'data': 'apellido' },
            {
                'data': 'foto',
                'render': function(data, type, row) {
                    return '<center><img src="' + data + '" id="imagenFotoAlumnos"></center>';
                },
            },
            { 'data': 'edad' },
            { 'data': 'dni' },
            { 'data': 'email' },
            { 'data': 'telefono' },
            { 'defaultContent': `<div class='text-center'><button class='btn btn-primary btnEditarAlumno'>Editar</button>
            <button class='btn btn-danger btnBorrarAlumno'>Borrar</button></div>` }
        ],
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


    // Botón para crear un nuevo alumno por el profesor
    $('#crearnuevo').click(function() {
        $('#crearAlumno').modal('show');
        $('#erroresalumnos').html('');
        $('#formNuevoAlumno').trigger('reset');
        $('.modal-header').css('background', '#286090');
        $('.modal-title').html('Creación del nuevo alumno');
        $('.modal-title').css('color', 'white');
        $('#tituloNuevolumno').html('Nuevo alumno');
        $('#tituloNuevolumno').css({
            'margin-bottom': '3%'
        });
        $('.modal-title').css('background-color', '#286090');
        // comprobar usuario no repetido
        comprobarUsuarioRepetido();
    });


    // Botón para crear un alumno por primera vez
    $('#formNuevoAlumno').submit(function(e) {
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

        // validamos los datos de los alumnos
        if (validarFormularioNuevoAlumno(usuario, nombre, apellidos, fechaNac, telefono, email, dniMayusculas, filesNueva, password1, password2)) {
            opcion = 19; //nuevo alumno
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
            formdata.append('permiso', 2);
            formdata.append('descripcion', 'alumno');
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: formdata,
                async: true,
                processData: false,
                contentType: false,
                // dataType: 'json',
                success: function(res) {
                    if (res) {
                        // actualizamos los datos de la tabla de alumnos
                        tablaAlumnoListado.ajax.reload(null, false);
                        // confirmamos datos insertados correctamente
                        Swal.fire(
                            'Nuevo alumno!',
                            'Creado correctamente',
                            'success'
                        );
                    }
                }
            });
            $('#crearAlumno').modal('hide');
            $('#erroresalumnos').html('');
        } else {
            $('#erroresalumnos').html(cadena);
        }
    });




    // recuperamos los datos del alumno que vamos a modificar
    $('#tablaAlumnoListado tbody').on('click', '.btnEditarAlumno', function() {
        $('.errores').html('');
        $('#modalModificarAlumno').modal('show');
        $('#formUpdateAlumno').trigger('reset');
        $('.modal-header').css('background-color', '#286090');
        $('.modal-title').html('<h3>Modificar el Alumno</h3>');
        $('.modal-title').css({
            'color': 'white',
            'background-color': '#286090'
        });
        $('#tituloUpdateAlumno').html('Datos del alumno');
        // recuperamos los datos dela fila
        let data = tablaAlumnoListado.row($(this).parents()).data();
        idalumno = data.idpersonas;
        lafoto = data.foto;
        // console.log(lafoto);
        $('#inputUpNombre').val(data.nombre);
        $('#inputUpAlellidos').val(data.apellido);
        $('#inputUPFecha').val(data.fecha);
        $('#inputUpTelefono').val(data.telefono);
        $('#inputUpDni').val(data.dni);
        $('#inputUpEmail').val(data.email);
        $("#imagenfile").attr('src', data.foto);
        opcion = 19;
    });


    // Actualizamos los datos del alumno 
    $('#formUpdateAlumno').submit(function(e) {
        e.preventDefault();
        let nombre = $.trim($('#inputUpNombre').val());
        let apellido = $.trim($('#inputUpAlellidos').val());
        let fechaNac = $.trim($('#inputUPFecha').val());
        let telefono = $.trim($('#inputUpTelefono').val());
        let dni = $.trim($('#inputUpDni').val());
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $.trim($('#inputUpEmail').val());
        let filesNueva = $('#inputFileUpdate')[0].files[0];
        // validamos los datos del formulario antes de actualizar
        if (validarFormularioNuevoAlumnoSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva)) {
            $('.errores').html('');
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idAlumno', idalumno);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('fechaNac', fechaNac);
            formData.append('telefono', telefono);
            formData.append('dni', dniMayusculas);
            formData.append('email', email);
            formData.append('file', filesNueva);
            formData.append('tieneFileUpdateAlumno', 'tieneFileUpdateAlumno');
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: formData,
                async: true,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res) {
                        // actualizamos los datos de la tabla de alumnos
                        tablaAlumnoListado.ajax.reload(null, false);
                        Swal.fire(
                            'Modificación!',
                            'Modificado correctamente',
                            'success'
                        );
                    }
                }
            });
            $('#modalModificarAlumno').modal('hide');
            $('.errores').html('');
        } else {
            $('.errores').html(cadena);
        }
    });





    // boton para elimnar a los alumnos
    $('#tablaAlumnoListado tbody').on('click', '.btnBorrarAlumno', function() {
        let fila = $(this);
        // recuperamos los datos dela fila
        let data = tablaAlumnoListado.row($(this).parents()).data();
        idpersonas = data.idpersonas;
        opcion = 18;
        // abrimos un modal para mostrar el alumno que vamos a borrar
        $('#eliminarMatricula').modal('show');
        $('.modal-header').css('background-color', 'red');
        $('.modal-title').html('<h3>Borrado del alumno</h3>');
        $('.modal-title').css({
            'color': 'white',
            'background-color': 'red'
        });
        $('#tituloAlumnoBorrado').html('Borrado del alumno');
        $('#muestraMatricula').html('<br>¿Quieres borrar el alumno?: ' + data.idpersonas + ' <br>Alumno: ' + data.nombre + " " + data.apellido);
        $('#advertenciaBorrado').html('!!!Vas a borrar el alumno y sus matrículas!!!');
        $("#fotoBorrar").attr("src", data.foto);
        $('#btnEliminarMatricula').click(function() {
            $.ajax({
                type: 'post',
                url: '../modelo/crud.php',
                data: {
                    opcion: opcion,
                    idpersonas: idpersonas
                },
                dataType: 'json',
                success: function(res) {
                    if (res == 1) {
                        // mostramos los datos de la tabla de alumnos
                        tablaAlumnoListado.row(fila.parents('tr')).remove().draw();
                        // si todo es correcto muestra un mensaje
                        Swal.fire(
                            'Eliminado!',
                            'Eliminado correctamente',
                            'success'
                        );
                    }
                }
            });
            $('#eliminarMatricula').modal('hide');
        });
    });

    // abre un modal para cambiar el password del alumno
    $('#cambiarPassword').click(function() {
        $('#modalUpdateAlPassword').modal('show');
        $('#formUpdateAlumnoPassword').trigger('reset');
        $('.modal-header').css('background-color', '#5CB85C');
        $('.modal-title').html('<h3>Modificación del password</h3>');
        $('.modal-title').css({
            'color': 'white',
            'background-color': '#5CB85C'
        });
        $('#tituloUpdatePassword').html('<h3>Modificación del password</h3>');
        $('#tituloUpdatePassword').css({
            'margin-bottom': '3%'
        });
        // imagen del usuario que vamos a cambiar el password
        $("#imagenfilePass").attr("src", lafoto);
        $('#modalModificarAlumno').modal('hide');
    });


    // boton para cambiar la password del alumno por el profesor
    $('#formUpdateAlumnoPassword').submit(function(e) {
        e.preventDefault();
        $('#erroresPassword').html('');
        let password1 = $('#inputPassword1Pass').val();
        let password2 = $('#inputPassword2Pass').val();
        console.log(password1);
        // validación del formulario para cambiar password del alumno
        if (valiadarFormularioPassword(password1, password2)) {
            opcion = 15
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idpersonas', idalumno);
            formData.append('password1', password1);
            enviarDatosPassword(formData);
        } else {
            $('#erroresPassword').html(cadena);
        }
    });
}); //Cierre de la function



// con la function comprobamos que el usuario creado por primera vez no este repetido
function comprobarUsuarioRepetido() {
    $('#inputUsuario').keyup(function() {
        var repetidoUsuario = $(this).val();
        $('#erroresalumnos').html('');
        let parametros = {
            'opcion': 20,
            'repetidoUsuario': repetidoUsuario
        };
        $.ajax({
            url: '../modelo/crud.php',
            method: 'post',
            data: parametros,
            success: function(data) {
                // console.log(data);
                data = $.parseJSON(data);
                if (data) {
                    $('#botonNuevoAlumno').prop("disabled", true);
                    $('#erroresalumnos').html('Este usuario está en la base de datos');
                } else {
                    $('#botonNuevoAlumno').prop("disabled", false);
                }
            }
        });
    });
}

// function para cambiar el password de los alumnos
function enviarDatosPassword(formData) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(res) {
            if (res == '1') {
                //   si todo es correcto muestra un ok
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


// function que muestra el botón seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nuevo Alumno');
    $('#listadoAlumnos').css({
        'background-color': '#FF9333',
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em"
    });
}
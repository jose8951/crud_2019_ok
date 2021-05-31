$(function() {
    // ocultamos el boton para crear 
    $('#crearnuevo').hide();
    $('title').text('Update administrador');
    // Marca el botón seleccionado de otro color
    botonseleccionado();

    // recuperamos el id del administrador
    let idpersonasAdministrador = $('#idpersonasAdministrador').val();

    // Botones del nav de la página
    $('#desconexionProfesor').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#listadoAdminProfesor').click(function() {
        $(location).attr('href', 'admProfesor.php');
    });
    $('#listadoAdminAdministrador').click(function() {
        $(location).attr('href', 'admAdministrador.php');
    });

    // recuperamos los datos del administrador y lo mostramos por patalla para modificar
    formularioUpdateAdministrador(idpersonasAdministrador);



    // si la modificación esta validada enviamos los datos para guardar
    $('#formUpdateAdministrador').submit(function(e) {
        e.preventDefault();
        let opcion = 37;
        let nombre = $.trim($('#inputUpNombre').val());
        let apellido = $.trim($('#inputUpAlellidos').val());
        let fechaNac = $.trim($('#inputUPFecha').val());
        let telefono = $.trim($('#inputUpTelefono').val());
        let dni = $.trim($('#inputUpDni').val());
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $.trim($('#inputUpEmail').val());
        let filesNueva = $('#inputFileUpdate')[0].files[0];
        let radioAdministrador = $('input:radio[name=radioUpOptions]:checked').val();

        // validamos los datos del formulario del nuevo administrador con el radio
        if (validarFormularioUpdateAdministradorSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva, radioAdministrador)) {
            $('.errores').html('');
            let formData = new FormData();
            formData.append('idpersonas', idpersonasAdministrador);
            formData.append('opcion', opcion);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('fechaNac', fechaNac);
            formData.append('telefono', telefono);
            formData.append('dni', dniMayusculas);
            formData.append('email', email);
            formData.append('file', filesNueva);
            formData.append('permiso', radioAdministrador);
            formData.append('descripcion', 'administrador');

            // Enviamos los datos para modificar los datos del administrador
            enviarDatosAdministrador(formData, idpersonasAdministrador);
        } else {
            $('.errores').html(cadena);
        }
    });

    // Abrimos un modal para cambiar los datos del password del administrador registrado
    $('#cambiarPassword').click(function() {
        $('#erroresPassword').html('');
        $('#modalUpdateAdmPassword').modal('show');

        $('#formUpdateAdministradorPassword').trigger('reset');
        $('.modal-header').css({
            'background-color': '#5cb85c',
            'color': 'white'
        });
        $('.modal-title').html('<h3>Modificación del password</h3>');
        $('#tituloUpdatePassword').html('<h3>Password administrador</h3>');
        $('#tituloUpdatePassword').css('margin', '20px');
        $('#imagenfilePass').attr('src', lafoto);
    });


    // Enviamos los datos del password para modificarlos
    $('#formUpdateAdministradorPassword').submit(function(e) {
        e.preventDefault();
        let password1 = $('#inputPassword1Pass').val();
        let password2 = $('#inputPassword2Pass').val();

        // validamos los password antes de modificarlos
        if (valiadarFormularioPassword(password1, password2)) {
            $('#erroresPassword').html('');
            opcion = 15;
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idpersonas', idpersonasAdministrador);
            formData.append('password1', password1);

            // Si la validación son correcta enviamos los datos para modificar el password
            enviarDatosPasswordProfesor(formData);
        } else {
            $('#erroresPassword').html(cadena);
        }
    });



}); //fin de function

// function que recupera los datos del administrador por el id
function formularioUpdateAdministrador(idpersonasAdministrador) {
    let parametros = {
        'opcion': 35,
        'idpersonas': idpersonasAdministrador
    }
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: parametros,
        dataType: 'json',
        success: function(res) {
            // muestra por pantalla los datos
            res.forEach(element => {
                $('#inputUpUsuario').val(element.usuario);
                $('#inputUpNombre').val(element.nombre);
                $('#inputUpAlellidos').val(element.apellido);
                $('#inputUPFecha').val(element.fecha);
                $('#inputUpTelefono').val(element.telefono);
                $('#inputUpDni').val(element.dni);
                $('#inputUpEmail').val(element.email);
                $('#imagenfile').attr('src', element.foto);
                if (element.permiso == 4) {
                    $('#RadioUpAdministrador4').prop('checked', true);
                } else if (element.permiso == 10) {
                    $('#RadioUpAdministrador10').prop('checked', true);
                }
                lafoto = element.foto;
            });
        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}


// function que recibe los datos del formulario para modificar al administrador registrado
function enviarDatosAdministrador(formData, idpersonasAdministrador) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        success: function(res) {
            if (res) {
                // si todo es correcto recupera los datos del administrador por el id
                formularioUpdateAdministrador(idpersonasAdministrador);
                Swal.fire(
                    'Modificado administrador',
                    'Modificado correctamente',
                    'success'
                );
            }
        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}

// function que recibe los nuevos datos de el password para modificarlos
function enviarDatosPasswordProfesor(formData) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        success: function(res) {
            // si todo es correcto confirmamos las modificación
            if (res == 1) {
                Swal.fire(
                    'Cambio de password!',
                    'Modificado correctamente',
                    'success'
                );
            }
        }
    });
    $('#modalUpdateAdmPassword').modal('hide');
}


// le da formator al boton seleccionado
function botonseleccionado() {
    $('#crearnuevo').html('Nuevo administrador');
    $('#crearnuevo').css({
        'width': '150px'
    });
    $('#updateAdministrador').css({
        'background-color': '#FF9333',
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1.1em",
        'width': '165px'

    });

}
$(function() {
    $('title').text('Página update');
    // Marca el botón seleccionado de otro color
    botonEditar();

    // Botones del nav de la página
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#matriculaAlumnos').click(function() {
        $(location).attr('href', 'verMatricula.php');
    });
    $('#facturasAlumnos').click(function() {
        $(location).attr('href', 'verfacturas.php');
    });
    $('#salirPassword').click(function() {
        $(location).attr('href', 'updateAlumno.php');
    });

    // ocultamos por pantalla los datos del alumno en el encabezado
    $('#datosAlumnosMatricula').hide();


    // recuperar los datos del usuario por medio del id 
    idpersonasAlumnos = $('#idpersonasAlumnos').val();
    //recuperamos con el id del alumno los datos del alumno
    muestraUpdate(idpersonasAlumnos);


    // enviamos los datos del password para cambiar
    $('#formUpdateAlumnoPassword').submit(function(e) {
        e.preventDefault();
        let password1 = $.trim($('#inputPassword1').val());
        let password2 = $.trim($('#inputPassword2').val());
        // validamos los datos del password
        if (valiadarFormularioPassword(password1, password2)) {
            opcion = 15;
            var formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idpersonas', idpersonasAlumnos);
            formData.append('password1', password1);

            // modificamos los datos del password
            enviarDatosModificar(formData);
            $('#erroresPassword').html('');
        } else {
            $('#erroresPassword').html(cadena);
        }
    });


    // enviamos los datos del alumno para modificar
    $('#formUpdateAlumno').submit(function(e) {
        e.preventDefault();
        let nombre = $.trim($('#inputNombre').val());
        let apellido = $.trim($('#inputApellidos').val());
        let edad = $.trim($('#inputFechaNac').val());
        let dni = $.trim($('#inputDni').val());
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $.trim($('#inputEmail').val());
        let filesNueva = $('#inputFile')[0].files[0];
        let telefono = $.trim($('#inputTelefono').val());
        // Validamos los datos del formulario si todo es correcto enviamos
        if (validarFormularioAlumnos(nombre, apellido, edad, dniMayusculas, email, filesNueva, telefono)) {
            if (filesNueva == undefined) {
                //null cuando no hay file
                opcion = 6;
            } else {
                // cuando hay una imagen nueva 
                opcion = 7;
            }
            var formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idAlumno', idpersonasAlumnos);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('edad', edad);
            formData.append('dni', dniMayusculas);
            formData.append('email', email);
            formData.append('file', filesNueva);
            formData.append('telefono', telefono);
            // datos para modificar
            enviarDatosModificar(formData);
            $('#erroresDatos').html('');
        } else {
            $('#erroresDatos').html(cadena);
        }
    });

    // abre un modal para cambiar los datos del password
    $('#cambiarPassword').click(function() {
        $('#modalUpdatePassword').modal('show');
        $('#formUpdateAlumnoPassword').trigger('reset');
        $('.modal-title').html('<h3>Modificación del Password.</h3>');
        $('.modal-header').css({
            'color': 'white',
            'background-color': '#28a745'
        });
        $('#tituloUpdatePassword').html('<h3>Modificación del password</h3>');
        $('#tituloUpdatePassword').css({
            'margin-bottom': '3%'
        });

        $('#imagenfilePass').attr('src', lafoto);
    });
}); //cierre de la function



// function para modificar los datos
function enviarDatosModificar(formData) {
    $.ajax({
        type: 'post',
        url: "../modelo/crud.php",
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        // dataType: 'json',
        success: function(response) {
            if (response == '1') {
                //funcion para mostrar los datos del alumnos y poder modificarlo
                $('#modalUpdatePassword').modal('hide');
            } else {
                //  recuperamos los datos para mostrar los datos
                muestraUpdate(idpersonasAlumnos);
            }
            Swal.fire(
                'Modificación!',
                'Modificado correctamente',
                'success'
            );
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Estado: " + textStatus + ", error: " + errorThrown);
        }
    });
}

// function que muestra el botón seleccionado 
function botonEditar() {
    $('#editarAlumno').css({
        'background-color': '#FF9333',
        'color': 'white',
        'font-family': "sans-serif, 'Gill Sans', 'Gill Sans MT'"
    })
}

// funcition para recuperar los datos del alumno y poder modificar
function muestraUpdate(idpersonasAlumnos) {
    let parametros = {
        'opcion': 5,
        'idAlumno': idpersonasAlumnos
    };
    $.ajax({
        type: "post",
        url: "../modelo/crud.php",
        data: parametros,
        // dataType: "json",
        success: function(response) {
            dato = JSON.parse(response);
            dato.forEach(element => {
                $('#inputNombre').val(element.nombre);
                $('#inputApellidos').val(element.apellido);
                $('#inputFechaNac').val(element.fecha);
                $('#inputDni').val(element.dni);
                $('#inputEmail').val(element.email);
                $("#imagenfile").attr('src', element.foto);
                $("#inputTelefono").val(element.telefono);
                lafoto = element.foto;
            });
        },
        error: function(exception) {
            console.error("Ocurrió un error", exception);
            // Código en caso de error
        }
    });
}
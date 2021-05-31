$(function() {
    $('title').text('Update profesor');
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
    $('#listadoFacturas').click(function() {
        $(location).attr('href', 'listadoFacturas.php');
    });
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });

    // oculta el boton de crear del nav
    $('#crearnuevo').hide();


    // muestra los datos del profesor por pantalla
    formularioUpdateProfesor(idpersonasProfesor);


    // botón para actualizar los datos del profesor
    $('#formUpdateProfesor').submit(function(e) {
        e.preventDefault();
        let nombre = $.trim($('#inputUpNombre').val());
        let apellido = $.trim($('#inputUpAlellidos').val());
        let fechaNac = $.trim($('#inputUPFecha').val());
        let telefono = $.trim($('#inputUpTelefono').val());
        let dni = $.trim($('#inputUpDni').val());
        let dniMayusculas = cambiarLetraDni(dni);
        let email = $.trim($('#inputUpEmail').val());
        let filesNueva = $('#inputFileUpdate')[0].files[0];
        let opcion = 19;

        // validamos los datos del profesor
        if (validarFormularioUpdateProfesor(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva)) {
            $('.errores').html('');
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('fechaNac', fechaNac);
            formData.append('telefono', telefono);
            formData.append('dni', dniMayusculas);
            formData.append('email', email);
            formData.append('file', filesNueva);
            formData.append('idAlumno', idpersonasProfesor);
            // Variable cuando es una actualización
            formData.append('tieneFileUpdateAlumno', 'tieneFileUpdateAlumno');
            // si todo es correcto podemos pasar los parametros para actualializar los datos del profesor
            updateProfesores(formData, idpersonasProfesor);
        } else {
            $('.errores').html(cadena);
        }
    });


    // botón para abrir un modal para cambiar el password de los profesores
    $('#cambiarPassword').click(function() {
        $('#erroresPassword').html('');
        $('#formUpdateAlumnoPassword').trigger('reset');
        $('#modalUpdateProfesorPassword').modal('show');
        $('.modal-title').html('<h3>Modificación del password</h3>');
        $('#tituloUpdatePassword').html('<h3>Modificación del password</h3>');
        $('.modal-header').css({
            'background-color': '#28a745',
            'color': 'white',
        });
        // imagen del profesor para cambiar el password
        $("#imagenfilePass").attr("src", lafoto);
    });


    // botón para enviar los datos del password para modificarlos 
    $('#formUpdateAlumnoPassword').submit(function(e) {
        e.preventDefault();
        $('#erroresPassword').html('');
        let password1 = $.trim($('#inputPassword1').val());
        let password2 = $.trim($('#inputPassword2').val());

        // validamos el password de los profesores
        if (valiadarFormularioPassword(password1, password2)) {
            opcion = 15; //modificación del la password de la tabla usuarios
            let formData = new FormData();
            formData.append('opcion', opcion);
            formData.append('idpersonas', idpersonasProfesor);
            formData.append('password1', password1);

            // pasamos los datos para modificar el password de los profesores 
            enviarDatosModificar(formData);
        } else {
            $('#erroresPassword').html(cadena);
            $('#erroresPassword').css('margin-bottom', '20px');
        }
    });
}); //fin de la function


// function que le pasamos los parametros para actualizalar los datos del profesor
function updateProfesores(formData, idpersonasProfesor) {
    $.ajax({
        type: 'post',
        url: '../modelo/crud.php',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        success: function(res) {
            if (res) {
                // muestra los datos del profesor por pantalla
                formularioUpdateProfesor(idpersonasProfesor);
                Swal.fire(
                    'Modificación!',
                    'Modificado correctamente',
                    'success'
                );
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Estado: " + textStatus + ", error: " + errorThrown);
        }
    });
}


// function para recuperar los datos del profesor y mostrarlos por pantalla
function formularioUpdateProfesor(idpersonasProfesor) {
    let parametros = {
        'opcion': 35,
        'idpersonas': idpersonasProfesor
    }
    $.ajax({
        type: "post",
        url: "../modelo/crud.php",
        data: parametros,
        dataType: "json",
        success: function(res) {
            // console.log(Array.isArray(res)); //true
            if (Array.isArray(res)) {
                res.forEach(element => {
                    $('#inputUpNombre').val(element.nombre);
                    $('#inputUpAlellidos').val(element.apellido);
                    $('#inputUPFecha').val(element.fecha);
                    $('#inputUpTelefono').val(element.telefono);
                    $('#inputUpDni').val(element.dni);
                    $('#inputUpEmail').val(element.email);
                    $("#imagenfile").attr('src', element.foto);
                    lafoto = element.foto;
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡Algo salió mal!',
                })
            }
        },
        error: function(xhr, status) {
            alert('Disculpe, existio un problema');
        }
    });
}

// function para modificar la contraseña de los profesores
function enviarDatosModificar(formData) {
    $.ajax({
        type: "post",
        url: "../modelo/crud.php",
        data: formData,
        async: "true",
        processData: false,
        contentType: false,
        success: function(response) {
            // Si todo es correcto ocultamos el modal y confirmamos la modificación
            if (response == 1) {
                $('#modalUpdateProfesorPassword').modal('hide');
                Swal.fire(
                    'Modificación!',
                    'Modificado correctamente',
                    'success'
                );
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Estado: " + textStatus + ", error: " + errorThrown);
        }
    });
}

// function que muestra el botón seleccionado
function botonseleccionado() {
    $('#modificarProfesor').css('background-color', '#FF9333');
    $('#modificarProfesor').css({
        "color": "white",
        "font-family": "sans-serif, Gill Sans MT, Gill Sans",
        "font-size": "1em",
        "padding-left": "8px",
        "padding-right": "8px",
        "width": "135px"
    });
}
$(function() {
    $('title').text('Página login');
    const focusUsuario = $('#username');
    focusUsuario.focus();

    // Formulario para enviar los datos del login
    $('#formularioLogin').submit(function(e) {
        e.preventDefault();
        let username = $.trim($('#username').val());
        let password = $.trim($('#password').val());

        let parametros = {
            'opcion': '2',
            'username': username,
            'password': password
        };

        // Envío de datos por Ajax del login
        $.ajax({
            type: "post",
            url: "modelo/crud.php",
            data: parametros,
            dataType: "json",
            // recuperamos los datos del login
            success: function(response) {
                // console.log(response);
                if (response == 2) { // Si devuelve un 2 es un alumno
                    $(location).attr('href', 'vista/verMatricula.php');
                } else if (response == 3) { // Si devuelve un 3 es un profesor
                    $(location).attr('href', 'vista/listadoMatricula.php');
                } else if (response == 4) { // Si devuelve un 4 es un administrador
                    $(location).attr('href', 'vista/admProfesor.php');
                } else if (response == 11) { //el usuario no está en la base de datos
                    $('.error_login').html("<p style='color: white; text-align: center;'>Usuario no está en la base de datos</p>");
                } else if (response == 10) { //error de contraseña
                    $('.error_login').html("<p style='color: white; text-align: center;'>Error de contraseña</p>");
                } else if (response == 0) { //el profesor está bloqueado
                    $('.error_login').html("<p style='color: white; text-align: center;'>Usuario está bloqueado en la base de datos</p>");
                }
            }
        });
    });
});
$(function() {

    // muestra una animación en la página principal
    $('.flexslider').flexslider({
        animation: "slide",
    });

    // Botón para mostrar los cursos que no necesitan iniciar sesión
    $('#cursos_invitado').click(function() {
        $(location).attr('href', 'vista/cursosInvitado.php');
    });
})
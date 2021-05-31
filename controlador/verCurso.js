$(function() {
    $('#datosAlumnosMatricula').hide();
    $('title').text('Ver Cursos');

    // Botones del nav de la página
    $('#desconexionAlumno').click(function() {
        $(location).attr('href', 'salir.php');
    });
    $('#facturasAlumnos').click(function() {
        $(location).attr('href', 'verfacturas.php');
    });
    $('#editarAlumno').click(function() {
        $(location).attr('href', 'updateAlumno.php');
    });
    $('#matriculaAlumnos').click(function() {
        $(location).attr('href', 'verMatricula.php');
    });

    // recuperamos el id de la matricula
    let idmatricula = $('#idMatricula').val();


    let parametros = {
        'opcion': 8,
        'idmatricula': idmatricula
    };

    // recuperamos los datos y los mostramos por pantalla
    $.ajax({
        type: "post",
        url: "../modelo/crud.php",
        data: parametros,
        // dataType: "json",
        success: function(response) {
            console.log(response);
            let dato = JSON.parse(response);
            dato.forEach(element => {
                // console.log(element.curso);
                $('#textoCurso').html(element.curso);
                $('#textoDescripcion').html(element.descripcion);
            });
        }
    });





});
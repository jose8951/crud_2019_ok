<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS  -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <!--flexslider css del slider-->
    <link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" />
    <!--letras font avesome-->
    <script src="https://kit.fontawesome.com/121868e1da.js"></script>
    <!--libreira Datatables   -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.20/datatables.min.css" />
    <!-- jsdelivr muestra alert con formatos css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.12.5/dist/sweetalert2.min.css">
    <!--libreria de  animacion con css-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <!--estilos css propios-->
    <link rel="stylesheet" href="css/estilo.css">
    <title></title>
</head>

<body>
    <!-- página principal de login -->
    <div class="container-fluid contenedor-alto col-sm-11 mt-1">
        <!-- animanicion del titulo de la academia -->
        <div class="p-3 contenedor-logo" style="background-color: rgba(0,0,255,.1);">
            <div class="row" style="height: 120px;">
                <div class="col-12 h-100" style="width: 120px;" id="titulo_logo">
                    <h1 class="animate__animated animate__backInLeft text-center">Academia</h1>
                    <h2 class="animate__animated animate__backInLeft text-center">omega</h2>
                </div>
            </div>
            <!--Imágenes donde se muestra fotos de la academia  en un slider-->
            <div class="row">
                <div class="col-7">
                    <div class="flexslider">
                        <ul class="slides">
                            <li>
                                <img src="images/imagenes/clase.jpg" />
                            </li>
                            <li>
                                <img src="images/imagenes/clase1.jpg" />
                            </li>
                            <li>
                                <img src="images/imagenes/clase2.jpg" />
                            </li>
                            <li>
                                <img src="images/imagenes/clase3.jpg" />
                            </li>
                            <li>
                                <img src="images/imagenes/clase4.jpg" />
                            </li>
                            <li>
                                <img src="images/imagenes/clase5.jpg" />
                            </li>
                        </ul>
                    </div>
                    <div class="form-group col-12 text-center">
                        <div id="cursos_invitado" class="btn btn-primary btn-sm col-4">CURSOS</div>
                    </div>
                </div>

                <!-- Formulario del login -->
                <div class="col-4 ml-5 marco-login" style="background-color: #D47677;">
                    <div class="row">
                        <div class="col-12 avatar">
                            <img src="https://www.tutorialrepublic.com/examples/images/avatar.png" alt="">
                        </div>
                        <div class="col-12 mt-5">
                            <h4 class="text-center">Inicio de sesión</h4>
                        </div>
                    </div>

                    <form id="formularioLogin" method="post" class="m-3 p-3">                 
                        <div class="row mb-3">
                            <div class="form-group col-12">
                                <input type="text" class="form-control" id="username" placeholder="Username" required="required">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="form-group col-12">
                                <input type="password" class="form-control" id="password" placeholder="Password" required="required">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="form-group col-12">
                                <button type="submit" class="btn btn-primary btn-sm btn-block login-btn ">Login</button>
                            </div>
                            <div class="form-group col-12 error_login">
                                <span id="erroresLogin"></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <!-- bootstrap y popper de javascritp -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    <!-- jQuery -->
    <!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- FlexSlider -->
    <script src="lib/jquery/jquery.flexslider-min.js"></script>

    <!--Páginas de javascript -->
    <script src="controlador/cursosInvitado.js"></script>
    <script src="controlador/enviarLogin.js"></script>
</body>

</html>
<?php

//  Abrimos la session si no esta abierta 
if (session_status() !== PHP_SESSION_ACTIVE) {
  session_start();
}

?>
<!DOCTYPE html>
<html lang="es">

<head>
  <!-- Required meta tags -->
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Bootstrap CSS no se puede quitar -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <!--flexslider css del slider-->
  <!-- <link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" /> -->
  <!--letras font avesome-->
  <script src="https://kit.fontawesome.com/121868e1da.js"></script>
  <!--  libreria de las   Datatables  -->
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.20/datatables.min.css" />
  <!-- jsdelivr muestra alert con formatos css -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@10.12.5/dist/sweetalert2.min.css">
  <!--muestra animacion con css-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <!--estilos css-->
  <link rel="stylesheet" href="../css/estilo.css">
  <title></title>

</head>
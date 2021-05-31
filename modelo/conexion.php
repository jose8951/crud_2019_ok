<?php

class Conexion
{
    /* Función que devuelve una conexión a la base de datos */
    public static function Conectar()
    {
        
        define('servidor', 'localhost');
        define('nombre_bd', 'academia');
        define('usuario', 'root');
        define('password', '');

        // define('servidor', 'localhost');
        // define('nombre_bd', 'id16342260_academia');
        // define('usuario', 'id16342260_root');
        // define('password', 'Dg5\$(]>1muD!3Y#');

        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
        try {
            $conexion = new PDO("mysql:host=" . servidor . "; dbname=" . nombre_bd, usuario, password, $opciones);
            return $conexion;
            //return "ok";
        } catch (Exception $e) {
            die("El error de Conexión es " . $e->getMessage());
        }
    }
}

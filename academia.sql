-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
-- base
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2021 a las 11:21:43
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `academia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `usuarios_idpersonas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`usuarios_idpersonas`) VALUES
(40),
(45),
(89);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `usuarios_idpersonas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`usuarios_idpersonas`) VALUES
(55),
(64),
(92),
(95),
(96);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `idcursos` int(11) NOT NULL,
  `curso` varchar(45) NOT NULL,
  `horas` varchar(45) NOT NULL,
  `precio` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `descripcion` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`idcursos`, `curso`, `horas`, `precio`, `descuento`, `descripcion`) VALUES
(13, 'java', '200', 1000, 10, 'Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems. Hay muchas aplicaciones y sitios web que no funcionarán, probablemente, a menos que tengan Java instalado y cada día se crean más.'),
(14, 'php', '2000', 150, 50, 'PHP (acrónimo recursivo de PHP.  Hypertext Preprocessor) es un lenguaje de código abierto muy popular especialmente adecuado para el desarrollo web y que puede ser incrustado en HTML.'),
(20, 'React', '1000', 2000, 40, 'Una biblioteca de JavaScript para construir interfaces de usuario'),
(24, 'javascript', '100', 200, 90, 'JavaScript  es un lenguaje de programación ligero, interpretado, o compilado justo a tiempo con funciones de primera clase'),
(25, 'laravel', '3000', 1000, 20, 'curso nuevo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idfactura` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `pagado` varchar(45) NOT NULL,
  `matricula_idmatricula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idfactura`, `fecha`, `pagado`, `matricula_idmatricula`) VALUES
(63, '2021-04-13', 'no', 48),
(64, '2021-04-06', 'no', 49);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE `matricula` (
  `idmatricula` int(11) NOT NULL,
  `cursos_idcursos` int(11) NOT NULL,
  `alumnos_usuarios_idpersonas` int(11) NOT NULL,
  `profesores_usuarios_idpersonas` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `nota` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`idmatricula`, `cursos_idcursos`, `alumnos_usuarios_idpersonas`, `profesores_usuarios_idpersonas`, `fecha`, `nota`) VALUES
(44, 13, 55, 76, '2021-03-10', NULL),
(45, 13, 64, 76, '2021-03-10', NULL),
(48, 20, 64, 48, '2021-04-05', 8.4),
(49, 20, 55, 48, '2021-04-13', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

CREATE TABLE `profesores` (
  `usuarios_idpersonas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`usuarios_idpersonas`) VALUES
(48),
(72),
(74),
(76);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idpersonas` int(11) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `password1` varchar(255) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `dni` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `foto` varchar(45) NOT NULL,
  `permiso` varchar(45) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idpersonas`, `usuario`, `password1`, `nombre`, `apellido`, `fecha`, `telefono`, `dni`, `email`, `foto`, `permiso`, `descripcion`) VALUES
(40, 'adm1', '$2y$10$2vVsk0Krv/vQe.lbTPvvuuR4SHSdS.BpxOaa3Be2ENoBUvYSs34oe', 'jose a', 'vega m', '2004-10-05', '620-112233', '33444555W', 'josves222@gmail.com', '../images/simpson.jpg', '4', 'administrador'),
(45, 'adm3', '$2y$10$Eo7azKmMf5pK.0Sf/iJAwuZZgUGxfnmXMZ0oINMKSj/vzi8Ie0.Hi', 'Mario', 'Bros', '1995-03-01', '900-222248', '33444555W', 'cor-reo@hotmail.com', '../images/mario.jpg', '4', 'administrador'),
(48, 'pro1', '$2y$10$u8m8mIOhT.zi9ZSATXo4kOTPji3r88d2wklSlU4k73JjB3S6N9gPm', 'jose al', 'vega', '2000-04-17', '900-222243', '12000110K', 'correo@gmail.com', '../images/homer.jpg', '3', 'profesor'),
(55, 'alu1', '$2y$10$yrxsVjkHWqQ.e5vuQZKQ5eA/q.RIxHQhvr9GAaqan4GGzb1oJbgQq', 'lise', 'simpsop', '1999-03-01', '900-222233', '33444555W', 'core@coir.com', '../images/lisa.png', '2', 'alumno'),
(64, 'alu2', '$2y$10$CTq4GzxDSHLL0p5iQj/oiOt7jMm0p2VkhZlzAGH3VIFrlWmiFK8ca', 'mario', 'bros', '1990-01-29', '320-458979', '11193123N', 'bros@gmail.com', '../images/mario.jpg', '2', 'alumno'),
(72, 'pro2', '$2y$10$NhGeIW2JopD1HwcpWJ9C6eS61Jvyw52VD/xlUcO9CPVhU4t3iwLEO', 'bart', 'simpson', '1980-10-12', '900-343434', '34333333Z', 'core-bart@coir.com', '../images/Bart.png', '3', 'profesor'),
(74, 'pro3', '$2y$10$O7DOmCLkCMoXymgGnxKkROseKfhS9O6zuY3C91eXfKQVZArw67cfS', 'leo', 'messi', '1990-11-11', '900-222241', '34333333Z', 'core@coir.com', '../images/profesor2.jpg', '0', 'profesor'),
(76, 'pro5', '$2y$10$zAJ9Mnnr/c6skRX6el1TO.VgURFbR82Ztrn1VvqLIDgCKNIsws2GW', 'maria', 'garcia', '1980-03-06', '900-222248', '34333333Z', 'core@coir.es', '../images/profesor4.jpg', '3', 'profesor'),
(89, 'adm4', '$2y$10$c8ymUY9Cy2WyjHzO/MigE.rG8rchw.VfdDHKuXg4rNPiV8YPF5E8W', 'Teresa', 'Nuñez', '2000-11-11', '900-222246', '34333333Z', 'core@coir.com', '../images/profesor1.jpg', '10', 'administrador'),
(92, 'alu4', '$2y$10$AISSfLVb8divVB6NgPHPNeIc/pTBEPT/4olSB8TPFSXGuxk0G5qUW', 'maria', 'gabriela', '2012-02-08', '900-222200', '11193123N', 'maria@hotmail.com', '../images/profesor3.jpg', '2', 'alumno'),
(95, 'jkjkjkj', '$2y$10$5Rt61T.nQc1T4uQ4k63tveQSxjUELoOOn3/qQNHS.MZUqMxjefU5q', 'jkjkjkj', 'jkjjkj', '2021-04-06', '900-222241', '11193123N', 'core@coir.com', '../images/mario.jpg', '2', 'alumno'),
(96, 'klklkl', '$2y$10$36arZFQELVTWIyGlWVHd7ux5Wjhk4jZ2Ll25EMgVOUen4KHv0BuBK', 'kklklk', 'klklklk', '2021-04-15', '900-222241', '11193123N', 'core@coir.com', '../images/profesor2.jpg', '2', 'alumno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD KEY `fk_table1_usuarios1_idx` (`usuarios_idpersonas`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD UNIQUE KEY `delete_alumnos` (`usuarios_idpersonas`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`idcursos`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idfactura`),
  ADD KEY `fk_factura_matricula1_idx` (`matricula_idmatricula`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`idmatricula`),
  ADD KEY `fk_cursos_has_alumnos_alumnos1_idx` (`alumnos_usuarios_idpersonas`),
  ADD KEY `fk_cursos_has_alumnos_cursos1_idx` (`cursos_idcursos`),
  ADD KEY `fk_matricula_profesores1_idx` (`profesores_usuarios_idpersonas`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD KEY `fk_profesores_usuarios1_idx` (`usuarios_idpersonas`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idpersonas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `idcursos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idfactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `idmatricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idpersonas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_table1_usuarios1` FOREIGN KEY (`usuarios_idpersonas`) REFERENCES `usuarios` (`idpersonas`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `delete_alumnos` FOREIGN KEY (`usuarios_idpersonas`) REFERENCES `usuarios` (`idpersonas`) ON DELETE CASCADE;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_matricula1` FOREIGN KEY (`matricula_idmatricula`) REFERENCES `matricula` (`idmatricula`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `fk_cursos_has_alumnos_alumnos1` FOREIGN KEY (`alumnos_usuarios_idpersonas`) REFERENCES `alumnos` (`usuarios_idpersonas`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cursos_has_alumnos_cursos1` FOREIGN KEY (`cursos_idcursos`) REFERENCES `cursos` (`idcursos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_matricula_profesores1` FOREIGN KEY (`profesores_usuarios_idpersonas`) REFERENCES `profesores` (`usuarios_idpersonas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `fk_profesores_usuarios1` FOREIGN KEY (`usuarios_idpersonas`) REFERENCES `usuarios` (`idpersonas`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

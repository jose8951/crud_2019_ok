// 
// Validaciones de los formularios
// paginas https://regex101.com/
// 

// variable para guardr los errores
var cadena = '';

// validamos los datos de la nueva matricula
function validarFormularioProfesor(idalumno, idcursos, matriculaFecha, notaMatricula) {
    cadena = '';
    if (validarIdalumno(idalumno) && validarIdcursos(idcursos) && validarFecha(matriculaFecha) && validarNota(notaMatricula)) {
        return true;
    } else {
        return false;
    }
}



// Validamos los datos del formulario si todo es correcto podemos enviar
function validarFormularioAlumnos(nombre, apellido, edad, dni, email, filesNueva, telefono) {
    cadena = '';
    if (validarNombre(nombre) && validarApellido(apellido) && validarFecha(edad) &&
        validarDni(dni) && validarEmail(email) && validarFilesUpdate(filesNueva) && validarTelefono(telefono)) {
        return true;
    } else {
        return false;
    }
}

// validamos los datos del password
function valiadarFormularioPassword(password1, password2) {
    cadena = '';
    if (valiadarPassword(password1, password2)) {
        return true;
    } else {
        return false;
    }
}


// validamos los datos de los usuarios
function validarFormularioNuevoAlumno(usuario, nombre, apellidos, fechaNac, telefono, email, dni, filesNueva, password1, password2) {
    cadena = '';
    if (validarUsuario(usuario) && validarNombre(nombre) && validarApellido(apellidos) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarEmail(email) && validarDni(dni) && validarFiles(filesNueva) && valiadarPassword(password1, password2)) {
        return true;
    } else {
        return false;
    }
}
// validamos los datos de los usuario y ademas validamos el radio 
function validarFormularioNuevoProfesores(usuario, nombre, apellidos, fechaNac, telefono, email, dniMayusculas, filesNueva, password1, password2, radioAdministrador) {
    cadena = '';
    if (validarUsuario(usuario) && validarNombre(nombre) && validarApellido(apellidos) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarEmail(email) && validarDni(dniMayusculas) && validarFiles(filesNueva) && valiadarPassword(password1, password2) && validarRadioProfesor(radioAdministrador)) {
        return true;
    } else {
        return false;
    }
}


//update alumno para modificar por el profesor
function validarFormularioNuevoAlumnoSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva) {
    cadena = '';
    if (validarNombre(nombre) && validarApellido(apellido) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarDni(dniMayusculas) && validarEmail(email) && validarFilesUpdate(filesNueva)) {
        return true;
    } else {
        return false;
    }
}

// validar los datos del formulario para verificar los cursos
function validarFormularioCursos(curso, horas, precio, descuento, descripcion) {
    cadena = '';
    if (validarCursos(curso) && validarHoras(horas) && validarPrecio(precio) &&
        validarDescuento(descuento) && validarDescripcion(descripcion)) {
        return true;
    } else {
        return false;
    }
}

// validar datos del formulario para verificar las facturas
function validarFormularioFacturas(idmatricula, fechaFactura, radiofactura) {
    cadena = '';
    if (validaridMatricula(idmatricula) && validarFecha(fechaFactura) && validarRadio(radiofactura)) {
        return true;
    } else {
        return false;
    }
}

// validar datos del formulario para verificar update profesor
function validarFormularioUpdateProfesor(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva) {
    cadena = '';
    if (validarNombre(nombre) && validarApellido(apellido) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarDni(dniMayusculas) && validarEmail(email) && validarFilesUpdate(filesNueva)) {
        return true;
    } else {
        return false;
    }
}

//Validar los datos del formulario del profesor desde el rol de administrador radio(3,0)
function validarFormularioUpdateProfesorSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva, radioProfesor) {
    cadena = '';
    if (validarNombre(nombre) && validarApellido(apellido) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarDni(dniMayusculas) && validarEmail(email) && validarFilesUpdate(filesNueva) && validarRadioProfesor(radioProfesor)) {
        return true;
    } else {
        return false;
    }
}
//Validar los datos del formulario del administrador desde el rol de administrador radio(4,10)
function validarFormularioUpdateAdministradorSinPassword(nombre, apellido, fechaNac, telefono, dniMayusculas, email, filesNueva, radioAdministrador) {
    cadena = '';
    if (validarNombre(nombre) && validarApellido(apellido) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarDni(dniMayusculas) && validarEmail(email) && validarFilesUpdate(filesNueva) && validarRadioAdministrador(radioAdministrador)) {
        return true;
    } else {
        return false;
    }
}

// validamos el formulario del administrador con todos los campos, también el radio del administrador (4-10)

function validarFormularioUpdateAdministradorTodo(usuario, nombre, apellido, fechaNac, telefono, email, dniMayusculas, filesNueva, password1, password2, radioAdministrador) {
    cadena = '';
    if (validarUsuario(usuario) && validarNombre(nombre) && validarApellido(apellido) && validarFecha(fechaNac) && validarTelefono(telefono) &&
        validarEmail(email) && validarDni(dniMayusculas) && validarFiles(filesNueva) && valiadarPassword(password1, password2) &&
        validarRadioAdministrador(radioAdministrador)) {
        return true;
    } else {
        return false;
    }
}


function validarFormularioUpdateAdministrador(radioAdministrador) {
    cadena = '';
    if (validarRadioAdministrador(radioAdministrador)) {
        return true;
    } else {
        return false;
    }
}

// validación del curso de 3 a 30 letras con espacios en blanco
function validarCursos(curso) {
    valor = false;
    let regCurso = /^[\w\sñÑáéíóúÁÉÍÓÚ]{3,30}$/;
    if (regCurso.test(curso)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo curso es de 3 a 30 caracteres.<p/>';
    }
    return valor;
}

// validación de horas de 1 a 4  digitos 
function validarHoras(horas) {
    valor = false;
    let regHoras = /^\d{1,4}$/;
    if (regHoras.test(horas)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo horas es de 1 a 4 caracteres.<p/>';
    }
    return valor;
}

// validación del precio de 1 a 4 digitos
function validarPrecio(precio) {
    valor = false;
    let regPrecio = /^\d{1,4}$/;
    if (regPrecio.test(precio)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo precio es de 1 a 4 caracteres.<p/>';
    }
    return valor;
}

// validación del descuento de 1 a 3 digitos
function validarDescuento(descuento) {
    valor = false;
    let regDescuento = /^\d{1,3}$/;
    if (regDescuento.test(descuento)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo descuento es de 1 a 3 caracteres.<p/>';
    }
    return valor;
}

// validación de la descripcion de 3 a 500 digitos. y simbolos ñÑáéíóúÁÉÍÓÚ()., «»+ y espacio en blanco
function validarDescripcion(descripcion) {
    valor = false;
    let regDescripcion = /^[\w\sñÑáéíóúÁÉÍÓÚ()., «»+]{3,500}$/;
    if (regDescripcion.test(descripcion)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo descripcion es de 3 a 500 caracteres.<p/>';
    }
    return valor;
}

// validamos el id del alumno para que no este vacío
function validarIdalumno(idalumno) {
    valor = false;
    if (idalumno != 0) {
        valor = true;
    } else {
        cadena += '<p>El campo alumno no puede estar vacío.<p/>';
    }
    return valor;
}

// validamos el id del curso para que no este vacío
function validarIdcursos(idcursos) {
    valor = false;
    if (idcursos != 0) {
        valor = true;
    } else {
        cadena += '<p>El campo del curso no puede estar vacío.<p/>';
    }
    return valor;
}

// validamos la fecha con la expresion regular ^\d{4}\-\d{2}\-\d{2}$
function validarFecha(laFecha) {
    valor = false;
    let regEdad = /^\d{4}\-\d{2}\-\d{2}$/;
    // console.log(laFecha); //1998-01-06
    if (regEdad.test(laFecha) && laFecha.length == 10) {
        valor = true;
    } else {
        cadena += '<p>Error de fecha ejemplo: 07/07/2021</p></b>';
    }
    return valor;
}

// validación de las notas con la expresión  ^([0-9](\,\d{1,2})?|10)$
// válido de 0 10 con  dos decimales. menos el 10
function validarNota(notaMatricula) {
    valor = false;
    if (notaMatricula.length != 0) {
        let regEdad = /^([0-9](\.\d{1,2})?|10)$/;
        if (regEdad.test(notaMatricula)) {
            valor = true;
        } else {
            cadena += '<p>Error de la nota  de 0 a 10 puede tener 2 décimas con .</p></b>';
        }
    } else {
        valor = true;
    }
    return valor;
}




// validación del usuario de 3 a 30 letras SIN espacios en blanco
function validarUsuario(usuario) {
    valor = false;
    let regUsuario = /^[\wñÑáéíóúÁÉÍÓÚ]{3,12}$/;
    if (regUsuario.test(usuario)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo usuario es de 3 a 12 caracteres.<p/>';
    }
    return valor;
}



// validación del nombre de 3 a 30 letras con espacios en blanco
function validarNombre(nombre) {
    valor = false;
    let regNombre = /^[\w\sñÑáéíóúÁÉÍÓÚ]{3,30}$/;
    if (regNombre.test(nombre)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo nombre es de 3 a 30 caracteres.<p/>';
    }
    return valor;
}

// validación del apellido de 3 a 30 caracteres
function validarApellido(apellido) {
    valor = false;
    let regApellido = /^[\w\sñÑáéíóúÁÉÍÓÚ]{3,30}$/;
    if (regApellido.test(apellido)) {
        valor = true;
    } else {
        cadena += '<p>La longitud del campo apellido es de 3 a 30 caracteres.<p/>';
    }
    return valor;
}


// function validarEdad(edad) {
//     val = false;
//     let regEdad = /^\d{4}\-\d{2}\-\d{2}$/;
//     if (regEdad.test(edad)) {
//         valor = true;
//     } else {
//         cadena += '<p>Error de fecha ejemplo: 07/07/2021</p></b>';
//     }
//     return valor;
// }

// validamos el dni con la expresión regular ^\d{8}[a-zA-Z]$
function validarDni(dni) {
    valor = false;
    let regDni = /^\d{8}[a-zA-Z]$/;
    if (regDni.test(dni)) {
        //recuperamos el numero sin letra
        numero = dni.substr(0, dni.length - 1, 1);
        //recuperamos la letra
        letraDni = dni.substr(dni.length - 1, 1);
        //recuperamos el cociente
        numero = numero % 23;
        //letra para comparar
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        //recuperamos la letra del cociente
        letra = letra.substring(numero, numero + 1);
        //muestra por consosla la letra correcta
        console.log(letra);
        //comparamos las letras
        if (letra == letraDni.toUpperCase()) {
            valor = true;
        } else {
            cadena += '<p>DNI erróneo o la letra del NIF no se corresponde</p></b>';
        }
    } else {
        cadena += '<p>Error de dni ejemplo: 23123123H</p></b>';
    }
    return valor;
}

// Validaciones del email
// Expresión de email /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
// \w+ un dígito o muchos
// ([\.-]?\w+)* puede o no incluir . ó - pero solo uno. Antes o después puede tener uno o más dígitos
// @ una @ obligatoria.
// \w+ un dígito o muchos
// ([\.-]?\w+)* puede o no incluir . ó - pero solo uno. Antes o después puede tener uno o más dígitos 
// (\.\w{2,4})+$   un .\ es obligatorio un punto.  w{2,4} después 2 o 4 dígitos
function validarEmail(email) {
    valor = false;
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (regEmail.test(email)) {
        valor = true;
    } else {
        cadena += '<p>Error de email ejemplo: jose-vega.muñoz@hotmail.con</p></b>';
    }
    return valor;
}

// devuelve solo true
function validarFilesUpdate(filesNueva) {
    // valor = false;
    // if (filesNueva == undefined) {
    //     valor = true;
    // }
    // return valor;
    return true;
}

// validamos el file comprobando que existe el archivo a subir
function validarFiles(filesNueva) {
    valor = false;
    if (filesNueva != undefined) {
        valor = true;
    } else {
        cadena += '<p>El file introducido no es correcto</p></b>';
    }
    return valor;
}

// Validamos los datos del telefono con la expresión regular ^\d{3}-\d{6}$
function validarTelefono(telefono) {
    valor = false;
    let regTelefono = /^\d{3}-\d{6}$/;
    if (regTelefono.test(telefono)) {
        valor = true;
    } else {
        cadena += '<p>Error del teléfono ejemplo: 900-341278</p></b>';
    }
    return valor;
}

// validamos los datos del password
// ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$
// (?=.*[a-z])      tiene que tener una letra minúscula o más
// (?=.*[A-Z])      tiene que tener una letra MAYÚSCULA o más
// (?=.*\d)         tiene que tener un dígito o más
// (?=.*[$@$!%*?&]) tiene que tener algunos de estos símbolos o mas de uno
// [A-Za-z\d$@$!%*?&]{4,8} el passowrd esta comprendido entre 4 y 8
function valiadarPassword(password1, password2) {
    valor = false;
    if (password1 != '' && password2 != '') {
        if (password1 == password2) {
            let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,8}$/;
            if (regPassword.test(password1)) {
                valor = true;
            } else
                cadena += `<b><p>Error de password: tiene que tener una letra minúscula otra mayúscula un dígito y un símbolo $@$!%*?& `;
        } else {
            cadena += `la contraseña tiene que ser iguales.`;
        }
    } else {
        cadena += `Los password no pueden estar vacíos.`;
    }
    return valor;
}

// pasamos el dni con la letra mayuscula
function cambiarLetraDni(dni) {
    //recupera el numero sin letra
    numero = dni.substr(0, dni.length - 1, 1);
    //recuperamos la letra
    letraDni = dni.substr(dni.length - 1, 1);
    let letraMayusculas = letraDni.toUpperCase();
    return numero + letraMayusculas;
}


// Validamos el id de la matrícula para que no este vacío
function validaridMatricula(idmatricula) {
    valor = false;
    if (idmatricula != 0) {
        valor = true;
    } else {
        cadena += '<p>El campo matricula no puede estar vacío.<p/>';
    }
    return valor;
}



// Validamos checked con una expresión regular para que sea si o no
function validarRadio(radiofactura) {
    valor = false;
    let regRadio = /^(si|no)$/;
    if (regRadio.test(radiofactura)) {
        valor = true;
    } else {
        cadena += '<p>El radio no puede estar vacío</p>';
    }
    return valor;
}


// Validamos el radio  solo tiene dos opciones 0 bloqueados ó 3 con permisos
function validarRadioProfesor(radioProfesor) {
    valor = false;
    let regRadioProfesor = /^(0|3)$/;
    if (regRadioProfesor.test(radioProfesor)) {
        valor = true;
    } else {
        cadena += '<p>El permiso no puede estar vacío</p>';
    }
    return valor;
}


// validamos el radio del administrador solo tiene dos opciones 4 ok - 10 bloqueado
function validarRadioAdministrador(radioAdministrador) {
    valor = false;
    let regRadioAdministrador = /^(4|10)$/;
    if (regRadioAdministrador.test(radioAdministrador)) {
        valor = true;
    } else {
        cadena += '<p>Error solo puede tener dos opciones (permitido o bloqueado)</p>';
    }
    return valor;
}
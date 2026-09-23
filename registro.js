const formularioRegistro =
    document.getElementById("form-registro");

const nombre =
    document.getElementById("nombre");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const confirmarPassword =
    document.getElementById("confirmar-password");


const errorNombre =
    document.getElementById("error-nombre");

const errorEmail =
    document.getElementById("error-email");

const errorPassword =
    document.getElementById("error-password");

const errorConfirmar =
    document.getElementById("error-confirmar");

const mensajeRegistro =
    document.getElementById("mensaje-registro");

const FORMATO_EMAIL =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

formularioRegistro.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        limpiarErrores();


        const nombreIngresado =
            nombre.value.trim();

        const emailIngresado =
            email.value.trim();

        const passwordIngresada =
            password.value;

        const passwordConfirmada =
            confirmarPassword.value;


        let formularioValido = true;


        // =========================
        // VALIDAR NOMBRE
        // =========================

        if (nombreIngresado.length < 3) {

            errorNombre.textContent =
                "Ingresá un nombre válido.";

            formularioValido = false;

        }


// =========================
// VALIDAR EMAIL
// =========================

if (!FORMATO_EMAIL.test(emailIngresado)) {

    errorEmail.textContent =
        "Ingresá un correo electrónico válido.";

    formularioValido = false;

}


        // =========================
        // VALIDAR CONTRASEÑA
        // =========================

        if (passwordIngresada.length < 8) {

            errorPassword.textContent =
                "La contraseña debe tener al menos 8 caracteres.";

            formularioValido = false;

        }


        // =========================
        // CONFIRMAR CONTRASEÑA
        // =========================

        if (
            passwordIngresada !==
            passwordConfirmada
        ) {

            errorConfirmar.textContent =
                "Las contraseñas no coinciden.";

            formularioValido = false;

        }


        if (!formularioValido) {

            return;

        }


        // =========================
        // ENVIAR DATOS A FLASK
        // =========================

        try {

            const respuesta = await fetch(
                "/api/registro",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        nombre: nombreIngresado,
                        email: emailIngresado,
                        password: passwordIngresada
                    })
                }
            );


            const resultado =
                await respuesta.json();


if (!respuesta.ok) {

    mostrarErrorRegistro(
        resultado.mensaje
    );

    return;

}


            // =========================
            // REGISTRO CORRECTO
            // =========================

            mensajeRegistro.textContent =
                "✓ Cuenta creada correctamente.";

            mensajeRegistro.style.color = "";

            mensajeRegistro.classList.add(
                "registro-correcto"
            );


            formularioRegistro.reset();


            setTimeout(
                function() {

                    window.location.href =
                        "login.html";

                },
                1500
            );


        } catch (error) {

            console.error(error);

            mensajeRegistro.textContent =
                "No se pudo conectar con el servidor.";

            mensajeRegistro.classList.remove(
                "registro-correcto"
            );

            mensajeRegistro.style.color =
                "#d93636";

        }

    }
);

// =========================
// MOSTRAR ERROR DE REGISTRO
// =========================

function mostrarErrorRegistro(mensaje) {

    mensajeRegistro.textContent =
        mensaje;

    mensajeRegistro.classList.remove(
        "registro-correcto"
    );

    mensajeRegistro.style.color =
        "#d93636";

}

function limpiarErrores() {

    errorNombre.textContent = "";

    errorEmail.textContent = "";

    errorPassword.textContent = "";

    errorConfirmar.textContent = "";

    mensajeRegistro.textContent = "";

    mensajeRegistro.style.color = "";

    mensajeRegistro.classList.remove(
        "registro-correcto"
    );

}

// =========================================
// MOSTRAR / OCULTAR CONTRASEÑAS
// =========================================

const botonMostrarPasswordRegistro =
    document.getElementById(
        "mostrar-password-registro"
    );


const botonMostrarConfirmarPassword =
    document.getElementById(
        "mostrar-confirmar-password"
    );


const campoPasswordRegistro =
    document.getElementById(
        "password"
    );


const campoConfirmarPassword =
    document.getElementById(
        "confirmar-password"
    );


// =========================================
// CONTRASEÑA
// =========================================

if (
    botonMostrarPasswordRegistro
    &&
    campoPasswordRegistro
) {

    botonMostrarPasswordRegistro.addEventListener(
        "click",
        function() {

            const estaOculta =
                campoPasswordRegistro.type ===
                "password";


            campoPasswordRegistro.type =
                estaOculta
                    ?
                    "text"
                    :
                    "password";


            botonMostrarPasswordRegistro.textContent =
                estaOculta
                    ?
                    "Ocultar"
                    :
                    "Mostrar";

        }
    );

}


// =========================================
// CONFIRMAR CONTRASEÑA
// =========================================

if (
    botonMostrarConfirmarPassword
    &&
    campoConfirmarPassword
) {

    botonMostrarConfirmarPassword.addEventListener(
        "click",
        function() {

            const estaOculta =
                campoConfirmarPassword.type ===
                "password";


            campoConfirmarPassword.type =
                estaOculta
                    ?
                    "text"
                    :
                    "password";


            botonMostrarConfirmarPassword.textContent =
                estaOculta
                    ?
                    "Ocultar"
                    :
                    "Mostrar";

        }
    );

}
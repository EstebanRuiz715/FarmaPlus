const formularioLogin =
    document.getElementById("form-login");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const errorEmail =
    document.getElementById("error-email-login");

const errorPassword =
    document.getElementById("error-password-login");

const mensajeLogin =
    document.getElementById("mensaje-login");


formularioLogin.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        limpiarErroresLogin();


        const emailIngresado =
            email.value.trim();

        const passwordIngresada =
            password.value;


        let formularioValido = true;


        // VALIDAR EMAIL

        const formatoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!formatoEmail.test(emailIngresado)) {

            errorEmail.textContent =
                "Ingresá un correo electrónico válido.";

            formularioValido = false;

        }


        // VALIDAR CONTRASEÑA

        if (passwordIngresada.length === 0) {

            errorPassword.textContent =
                "Ingresá tu contraseña.";

            formularioValido = false;

        }


        if (!formularioValido) {

            return;

        }


        try {

            const respuesta = await fetch(
                "/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: emailIngresado,
                        password: passwordIngresada
                    })
                }
            );


            const resultado =
                await respuesta.json();


            if (!respuesta.ok) {

                mensajeLogin.textContent =
                    resultado.mensaje;

                mensajeLogin.style.color =
                    "#d93636";

                return;

            }


            mensajeLogin.textContent =
                "✓ Sesión iniciada correctamente.";

            mensajeLogin.style.color =
                "#168a5b";


            setTimeout(
                function() {

                    window.location.href =
                        "productos.html";

                },
                1000
            );


} catch (error) {

    console.error(error);

    mensajeLogin.textContent =
        "No se pudo conectar con el servidor.";

    mensajeLogin.style.color =
        "#d93636";

}

    }
);


function limpiarErroresLogin() {

    errorEmail.textContent = "";

    errorPassword.textContent = "";

    mensajeLogin.textContent = "";

}

// =========================================
// MOSTRAR / OCULTAR CONTRASEÑA
// =========================================

const botonMostrarPassword =
    document.getElementById(
        "mostrar-password-login"
    );


if (botonMostrarPassword) {

    botonMostrarPassword.addEventListener(
        "click",
        function() {

            const campoPassword =
                document.getElementById(
                    "password"
                );


            const estaOculta =
                campoPassword.type ===
                "password";


            campoPassword.type =
                estaOculta
                    ?
                    "text"
                    :
                    "password";


            botonMostrarPassword.textContent =
                estaOculta
                    ?
                    "Ocultar"
                    :
                    "Mostrar";

        }
    );

}
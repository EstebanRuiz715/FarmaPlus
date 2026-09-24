const contenedorSesion =
    document.getElementById("sesion-nav");


async function cargarSesion() {

    if (!contenedorSesion) {
        return;
    }


try {

    const respuesta =
        await fetch("/api/sesion");


    if (!respuesta.ok) {

        throw new Error(
            "No se pudo consultar la sesión."
        );

    }


    const datos =
        await respuesta.json();


    if (!datos.logueado) {

            mostrarLogin();

            return;

        }


        mostrarUsuario(datos.usuario);


    } catch (error) {

        console.error(
            "Error al consultar la sesión:",
            error
        );

    }

}


function mostrarLogin() {

    contenedorSesion.innerHTML = "";


    const enlace =
        document.createElement("a");


    enlace.href = "login.html";

    enlace.textContent =
        "Iniciar sesión";


    contenedorSesion.appendChild(enlace);

}


function mostrarUsuario(usuario) {

    contenedorSesion.innerHTML = "";


    const primerNombre =
        usuario.nombre
            .trim()
            .split(/\s+/)[0];


    // =========================
    // CONTENEDOR DEL MENÚ
    // =========================

    const menuUsuario =
        document.createElement("div");


    menuUsuario.classList.add(
        "usuario-menu"
    );


    // =========================
    // BOTÓN PRINCIPAL
    // =========================

    const botonUsuario =
        document.createElement("button");


    botonUsuario.type =
        "button";


    botonUsuario.classList.add(
        "usuario-menu-boton"
    );


    const nombreBoton =
        document.createElement("span");


    nombreBoton.textContent =
        primerNombre;


    const flecha =
        document.createElement("span");


    flecha.textContent =
        "▾";


    flecha.classList.add(
        "usuario-menu-flecha"
    );


    botonUsuario.appendChild(
        nombreBoton
    );


    botonUsuario.appendChild(
        flecha
    );


    // =========================
    // MENÚ DESPLEGABLE
    // =========================

    const desplegable =
        document.createElement("div");


    desplegable.classList.add(
        "usuario-menu-desplegable"
    );


// =========================
// INFORMACIÓN DEL USUARIO
// =========================

const informacion =
    document.createElement("div");


informacion.classList.add(
    "usuario-menu-info"
);


// =========================
// NOMBRE COMPLETO
// =========================

const nombreCompletoTexto =
    (
        usuario.nombre
        +
        " "
        +
        (
            usuario.apellido || ""
        )
    ).trim();


// =========================
// AVATAR
// =========================

const avatar =
    document.createElement("div");


avatar.classList.add(
    "usuario-menu-avatar"
);


const partesNombre =
    nombreCompletoTexto
        .split(/\s+/);


let iniciales =
    partesNombre[0]
        ? partesNombre[0][0]
        : "";


if (partesNombre.length > 1) {

    iniciales +=
        partesNombre[
            partesNombre.length - 1
        ][0];

}


avatar.textContent =
    iniciales.toUpperCase();


// =========================
// NOMBRE Y ROL
// =========================

const informacionTexto =
    document.createElement("div");


informacionTexto.classList.add(
    "usuario-menu-info-texto"
);


const nombreCompleto =
    document.createElement("strong");


nombreCompleto.textContent =
    nombreCompletoTexto;


const rol =
    document.createElement("span");


let nombreRol =
    "Cliente";


if (usuario.rol === "admin") {

    nombreRol =
        "Administrador";

} else if (
    usuario.rol === "empleado"
) {

    nombreRol =
        "Empleado";

} else if (
    usuario.rol === "repartidor"
) {

    nombreRol =
        "Repartidor";

}


rol.textContent =
    nombreRol;


informacionTexto.appendChild(
    nombreCompleto
);


informacionTexto.appendChild(
    rol
);


informacion.appendChild(
    avatar
);


informacion.appendChild(
    informacionTexto
);


desplegable.appendChild(
    informacion
);


// =========================
// MI PERFIL
// =========================

const botonPerfil =
    document.createElement("a");


botonPerfil.href =
    "/perfil.html";


botonPerfil.textContent =
    "👤 Mi perfil";


botonPerfil.classList.add(
    "usuario-menu-opcion"
);


desplegable.appendChild(
    botonPerfil
);


    // =========================
    // PANEL ADMIN
    // =========================

    if (usuario.rol === "admin") {

        const botonAdmin =
            document.createElement("a");


        botonAdmin.href =
            "/admin";


        botonAdmin.textContent =
            "Panel admin";


        botonAdmin.classList.add(
            "usuario-menu-opcion"
        );


        desplegable.appendChild(
            botonAdmin
        );

    }


    // =========================
    // CERRAR SESIÓN
    // =========================

    const botonCerrar =
        document.createElement("button");


    botonCerrar.type =
        "button";


    botonCerrar.textContent =
        "Cerrar sesión";


    botonCerrar.classList.add(
        "usuario-menu-opcion",
        "usuario-menu-cerrar"
    );


    botonCerrar.addEventListener(
        "click",
        cerrarSesion
    );


    desplegable.appendChild(
        botonCerrar
    );


    // =========================
    // ABRIR / CERRAR MENÚ
    // =========================

    botonUsuario.addEventListener(
        "click",
        function(evento) {

            evento.stopPropagation();


            menuUsuario.classList.toggle(
                "abierto"
            );

        }
    );


    document.addEventListener(
        "click",
        function(evento) {

            if (
                !menuUsuario.contains(
                    evento.target
                )
            ) {

                menuUsuario.classList.remove(
                    "abierto"
                );

            }

        }
    );


    // =========================
    // MOSTRAR TODO
    // =========================

    menuUsuario.appendChild(
        botonUsuario
    );


    menuUsuario.appendChild(
        desplegable
    );


    contenedorSesion.appendChild(
        menuUsuario
    );

}


async function cerrarSesion() {

    try {

        const respuesta =
            await fetch(
                "/api/logout",
                {
                    method: "POST"
                }
            );


        if (!respuesta.ok) {
            return;
        }


        window.location.href =
            "/";


    } catch (error) {

        console.error(
            "Error al cerrar sesión:",
            error
        );

    }

}


cargarSesion();
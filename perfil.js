// =========================================
// ELEMENTOS
// =========================================

const perfilAvatar =
    document.getElementById(
        "perfil-avatar"
    );


const perfilNombrePrincipal =
    document.getElementById(
        "perfil-nombre-principal"
    );


const perfilRol =
    document.getElementById(
        "perfil-rol"
    );


const perfilNombre =
    document.getElementById(
        "perfil-nombre"
    );


const perfilApellido =
    document.getElementById(
        "perfil-apellido"
    );


const perfilEmail =
    document.getElementById(
        "perfil-email"
    );


const perfilTelefono =
    document.getElementById(
        "perfil-telefono"
    );


const contenedorDirecciones =
    document.getElementById(
        "perfil-direcciones"
    );

// =========================================
// EDICIÓN DEL PERFIL
// =========================================

const perfilDatosVista =
    document.getElementById(
        "perfil-datos-vista"
    );


const formularioEditarPerfil =
    document.getElementById(
        "formulario-editar-perfil"
    );


const botonEditarPerfil =
    document.getElementById(
        "boton-editar-perfil"
    );


const botonCancelarEdicion =
    document.getElementById(
        "boton-cancelar-edicion"
    );


const botonGuardarPerfil =
    document.getElementById(
        "boton-guardar-perfil"
    );


const campoEditarNombre =
    document.getElementById(
        "editar-perfil-nombre"
    );


const campoEditarApellido =
    document.getElementById(
        "editar-perfil-apellido"
    );


const campoEditarEmail =
    document.getElementById(
        "editar-perfil-email"
    );


const campoEditarTelefono =
    document.getElementById(
        "editar-perfil-telefono"
    );


const mensajeEditarPerfil =
    document.getElementById(
        "mensaje-editar-perfil"
    );


let perfilActual = null;

// =========================================
// DIRECCIONES
// =========================================

const botonAgregarDireccion =
    document.getElementById(
        "boton-agregar-direccion"
    );


const formularioDireccion =
    document.getElementById(
        "formulario-direccion"
    );


const botonCancelarDireccion =
    document.getElementById(
        "boton-cancelar-direccion"
    );


const botonGuardarDireccion =
    document.getElementById(
        "boton-guardar-direccion"
    );


const mensajeDireccion =
    document.getElementById(
        "mensaje-direccion"
    );


const campoDireccionAlias =
    document.getElementById(
        "direccion-alias"
    );


const campoDireccionCalle =
    document.getElementById(
        "direccion-calle"
    );


const campoDireccionNumero =
    document.getElementById(
        "direccion-numero"
    );


const campoDireccionPiso =
    document.getElementById(
        "direccion-piso"
    );


const campoDireccionDepartamento =
    document.getElementById(
        "direccion-departamento"
    );


const campoDireccionLocalidad =
    document.getElementById(
        "direccion-localidad"
    );


const campoDireccionProvincia =
    document.getElementById(
        "direccion-provincia"
    );


const campoDireccionCodigoPostal =
    document.getElementById(
        "direccion-codigo-postal"
    );


const campoDireccionReferencias =
    document.getElementById(
        "direccion-referencias"
    );


const campoDireccionPrincipal =
    document.getElementById(
        "direccion-principal"
    );

const tituloFormularioDireccion =
    formularioDireccion.querySelector(
        "h3"
    );


let direccionesActuales = [];

let direccionEditandoId = null;    

// =========================================
// PROVINCIAS Y LOCALIDADES
// =========================================

const URL_GEOREF =
    "https://apis.datos.gob.ar/georef/api/v2.0";


async function cargarProvincias() {

    campoDireccionProvincia.disabled =
        true;


    campoDireccionLocalidad.disabled =
        true;


    campoDireccionProvincia.innerHTML = `

        <option value="">
            Cargando provincias...
        </option>

    `;


    campoDireccionLocalidad.innerHTML = `

        <option value="">
            Elegí primero una provincia
        </option>

    `;


    try {

        const respuesta =
            await fetch(
                URL_GEOREF
                +
                "/provincias?campos=id,nombre&orden=nombre&max=24"
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron cargar las provincias."
            );

        }


        const datos =
            await respuesta.json();


        campoDireccionProvincia.innerHTML = `

            <option value="">
                Seleccioná una provincia
            </option>

        `;


        datos.provincias.forEach(
            function(provincia) {

                const opcion =
                    document.createElement(
                        "option"
                    );


                opcion.value =
                    provincia.nombre;


                opcion.textContent =
                    provincia.nombre;


                opcion.dataset.id =
                    provincia.id;


                campoDireccionProvincia.appendChild(
                    opcion
                );

            }
        );


        campoDireccionProvincia.disabled =
            false;


        // =========================================
        // BUENOS AIRES POR DEFECTO
        // =========================================

        const opciones =
            Array.from(
                campoDireccionProvincia.options
            );


        const buenosAires =
            opciones.find(
                function(opcion) {

                    return (
                        opcion.value ===
                        "Buenos Aires"
                    );

                }
            );


        if (buenosAires) {

            campoDireccionProvincia.value =
                "Buenos Aires";


            await cargarLocalidades(
                buenosAires.dataset.id
            );

        }


    } catch (error) {

        console.error(
            "Error al cargar provincias:",
            error
        );


        campoDireccionProvincia.innerHTML = `

            <option value="">
                No se pudieron cargar las provincias
            </option>

        `;

    }

}


// =========================================
// CARGAR LOCALIDADES DE UNA PROVINCIA
// =========================================

async function cargarLocalidades(
    provinciaId
) {

    campoDireccionLocalidad.disabled =
        true;


    campoDireccionLocalidad.innerHTML = `

        <option value="">
            Cargando localidades...
        </option>

    `;


    if (!provinciaId) {

        campoDireccionLocalidad.innerHTML = `

            <option value="">
                Elegí primero una provincia
            </option>

        `;


        return;

    }


    try {

        const respuesta =
            await fetch(
                URL_GEOREF
                +
                "/localidades"
                +
                "?provincia="
                +
                encodeURIComponent(
                    provinciaId
                )
                +
                "&campos=id,nombre"
                +
                "&orden=nombre"
                +
                "&max=5000"
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron cargar las localidades."
            );

        }


        const datos =
            await respuesta.json();


        campoDireccionLocalidad.innerHTML = `

            <option value="">
                Seleccioná una localidad
            </option>

        `;


        datos.localidades.forEach(
            function(localidad) {

                const opcion =
                    document.createElement(
                        "option"
                    );


                opcion.value =
                    localidad.nombre;


                opcion.textContent =
                    localidad.nombre;


                campoDireccionLocalidad.appendChild(
                    opcion
                );

            }
        );


        campoDireccionLocalidad.disabled =
            false;


    } catch (error) {

        console.error(
            "Error al cargar localidades:",
            error
        );


        campoDireccionLocalidad.innerHTML = `

            <option value="">
                No se pudieron cargar las localidades
            </option>

        `;

    }

}


// =========================================
// CAMBIAR PROVINCIA
// =========================================

campoDireccionProvincia.addEventListener(
    "change",
    async function() {

        const opcionSeleccionada =
            campoDireccionProvincia.options[
                campoDireccionProvincia.selectedIndex
            ];


        const provinciaId =
            opcionSeleccionada
                ? opcionSeleccionada.dataset.id
                : null;


        await cargarLocalidades(
            provinciaId
        );

    }
);


// =========================================
// RESTABLECER FORMULARIO DE DIRECCIÓN
// =========================================

async function restablecerFormularioDireccion() {

    formularioDireccion.reset();


    const opciones =
        Array.from(
            campoDireccionProvincia.options
        );


    const buenosAires =
        opciones.find(
            function(opcion) {

                return (
                    opcion.value ===
                    "Buenos Aires"
                );

            }
        );


    if (buenosAires) {

        campoDireccionProvincia.value =
            "Buenos Aires";


        await cargarLocalidades(
            buenosAires.dataset.id
        );

    } else {

        campoDireccionProvincia.value =
            "";


        campoDireccionLocalidad.innerHTML = `

            <option value="">
                Elegí primero una provincia
            </option>

        `;


        campoDireccionLocalidad.disabled =
            true;

    }

}

// =========================================
// ABRIR DIRECCIÓN PARA EDITAR
// =========================================

async function abrirEdicionDireccion(
    direccionId
) {

    const direccion =
        direccionesActuales.find(
            function(item) {

                return (
                    Number(item.id) ===
                    Number(direccionId)
                );

            }
        );


    if (!direccion) {

        return;

    }


    direccionEditandoId =
        Number(
            direccion.id
        );


    tituloFormularioDireccion.textContent =
        "Editar dirección";


    botonGuardarDireccion.textContent =
        "Guardar cambios";


    mensajeDireccion.textContent =
        "";


    campoDireccionAlias.value =
        direccion.alias || "";


    campoDireccionCalle.value =
        direccion.calle || "";


    campoDireccionNumero.value =
        direccion.numero || "";


    campoDireccionPiso.value =
        direccion.piso || "";


    campoDireccionDepartamento.value =
        direccion.departamento || "";


    campoDireccionCodigoPostal.value =
        direccion.codigo_postal || "";


    campoDireccionReferencias.value =
        direccion.referencias || "";


    campoDireccionPrincipal.checked =
        Number(
            direccion.es_principal
        ) === 1;


    // =========================================
    // PROVINCIA
    // =========================================

    let opcionProvincia =
        Array.from(
            campoDireccionProvincia.options
        ).find(
            function(opcion) {

                return (
                    opcion.value ===
                    direccion.provincia
                );

            }
        );


    // Si todavía no terminaron de cargar
    // las provincias, las cargamos.

    if (!opcionProvincia) {

        await cargarProvincias();


        opcionProvincia =
            Array.from(
                campoDireccionProvincia.options
            ).find(
                function(opcion) {

                    return (
                        opcion.value ===
                        direccion.provincia
                    );

                }
            );

    }


    if (opcionProvincia) {

        campoDireccionProvincia.value =
            direccion.provincia;


        await cargarLocalidades(
            opcionProvincia.dataset.id
        );


        // Por seguridad, si la localidad
        // guardada no aparece en la API,
        // la agregamos igualmente.

        const existeLocalidad =
            Array.from(
                campoDireccionLocalidad.options
            ).some(
                function(opcion) {

                    return (
                        opcion.value ===
                        direccion.localidad
                    );

                }
            );


        if (
            direccion.localidad
            &&
            !existeLocalidad
        ) {

            const opcionLocalidad =
                document.createElement(
                    "option"
                );


            opcionLocalidad.value =
                direccion.localidad;


            opcionLocalidad.textContent =
                direccion.localidad;


            campoDireccionLocalidad.appendChild(
                opcionLocalidad
            );

        }


        campoDireccionLocalidad.value =
            direccion.localidad || "";

    }


    formularioDireccion.hidden =
        false;


    botonAgregarDireccion.hidden =
        true;


    campoDireccionAlias.focus();

}

// =========================================
// ROL
// =========================================

function obtenerNombreRol(rol) {

    const roles = {

        admin:
            "Administrador",

        empleado:
            "Empleado",

        cliente:
            "Cliente",

        repartidor:
            "Repartidor"

    };


    return roles[rol] || rol;

}


// =========================================
// INICIALES
// =========================================

function obtenerIniciales(
    nombre,
    apellido
) {

    const partes = [];


    if (nombre) {

        const nombres =
            nombre
                .trim()
                .split(/\s+/);


        if (nombres.length > 0) {

            partes.push(
                nombres[0][0]
            );

        }

    }


    if (apellido) {

        partes.push(
            apellido.trim()[0]
        );

    } else if (nombre) {

        const nombres =
            nombre
                .trim()
                .split(/\s+/);


        if (nombres.length > 1) {

            partes.push(
                nombres[
                    nombres.length - 1
                ][0]
            );

        }

    }


    return partes
        .join("")
        .toUpperCase();

}


// =========================================
// MOSTRAR DIRECCIONES
// =========================================

function mostrarDirecciones(
    direcciones
) {

    contenedorDirecciones.innerHTML =
        "";


    if (
        !direcciones
        ||
        direcciones.length === 0
    ) {

        contenedorDirecciones.innerHTML = `

            <div class="perfil-sin-direcciones">

                <h3>
                    Todavía no tenés direcciones guardadas
                </h3>

                <p>
                    Agregá una dirección para usarla
                    más adelante en tus compras.
                </p>

            </div>

        `;


        return;

    }


    direcciones.forEach(
        function(direccion) {

            const tarjeta =
                document.createElement(
                    "div"
                );


            tarjeta.classList.add(
                "perfil-direccion"
            );


            const esPrincipal =
                Number(
                    direccion.es_principal
                ) === 1;


            tarjeta.innerHTML = `

                <div class="perfil-direccion-superior">

                    <strong>
                        ${direccion.alias}
                    </strong>

                    ${
                        esPrincipal
                            ? `
                                <span class="direccion-principal">
                                    Principal
                                </span>
                              `
                            : ""
                    }

                </div>


                <p>
                    ${direccion.calle}
                    ${direccion.numero}
                </p>


                <p>
                    ${direccion.localidad},
                    ${direccion.provincia}
                </p>


                <div class="perfil-direccion-acciones">

                    ${
                        !esPrincipal
                            ? `
                                <button
                                    type="button"
                                    class="direccion-boton-principal"
                                    data-id="${direccion.id}"
                                >
                                    Hacer principal
                                </button>
                              `
                            : ""
                    }


                    <button
                        type="button"
                        class="direccion-boton-editar"
                        data-id="${direccion.id}"
                    >
                        Editar
                    </button>


                    <button
                        type="button"
                        class="direccion-boton-eliminar"
                        data-id="${direccion.id}"
                    >
                        Eliminar
                    </button>

                </div>

            `;


            contenedorDirecciones.appendChild(
                tarjeta
            );

        }
    );


    activarBotonesDireccion();

}

// =========================================
// MODAL ELIMINAR DIRECCIÓN
// =========================================

const modalEliminarDireccionFondo =
    document.getElementById(
        "modal-eliminar-direccion-fondo"
    );

const modalEliminarDireccionCancelar =
    document.getElementById(
        "modal-eliminar-direccion-cancelar"
    );

const modalEliminarDireccionConfirmar =
    document.getElementById(
        "modal-eliminar-direccion-confirmar"
    );

let resolverModalEliminarDireccion =
    null;


function confirmarEliminarDireccion() {

    modalEliminarDireccionFondo.hidden =
        false;

    return new Promise(
        function(resolve) {

            resolverModalEliminarDireccion =
                resolve;

        }
    );
}


function cerrarModalEliminarDireccion(
    confirmado
) {

    modalEliminarDireccionFondo.hidden =
        true;

    if (
        resolverModalEliminarDireccion
    ) {

        resolverModalEliminarDireccion(
            confirmado
        );

        resolverModalEliminarDireccion =
            null;
    }
}


modalEliminarDireccionCancelar
    .addEventListener(
        "click",
        function() {

            cerrarModalEliminarDireccion(
                false
            );

        }
    );


modalEliminarDireccionConfirmar
    .addEventListener(
        "click",
        function() {

            cerrarModalEliminarDireccion(
                true
            );

        }
    );


modalEliminarDireccionFondo
    .addEventListener(
        "click",
        function(evento) {

            if (
                evento.target ===
                modalEliminarDireccionFondo
            ) {

                cerrarModalEliminarDireccion(
                    false
                );

            }

        }
    );


document.addEventListener(
    "keydown",
    function(evento) {

        if (
            evento.key === "Escape"
            &&
            !modalEliminarDireccionFondo.hidden
        ) {

            cerrarModalEliminarDireccion(
                false
            );

        }

    }
);

// =========================================
// BOTONES DE DIRECCIONES
// =========================================

function activarBotonesDireccion() {

    // =========================================
    // HACER PRINCIPAL
    // =========================================

    const botonesPrincipal =
        document.querySelectorAll(
            ".direccion-boton-principal"
        );


    botonesPrincipal.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                async function() {

                    const direccionId =
                        boton.dataset.id;


                    boton.disabled =
                        true;


                    boton.textContent =
                        "Guardando...";


                    try {

                        const respuesta =
                            await fetch(
                                "/api/direcciones/"
                                +
                                direccionId
                                +
                                "/principal",
                                {
                                    method: "PUT"
                                }
                            );


                        const resultado =
                            await respuesta.json();


                        if (
                            !respuesta.ok
                            ||
                            !resultado.ok
                        ) {

                            alert(
                                resultado.mensaje
                                ||
                                "No se pudo cambiar la dirección principal."
                            );

                            return;

                        }


                        await cargarPerfil();


                    } catch (error) {

                        console.error(
                            "Error al cambiar dirección principal:",
                            error
                        );


                        alert(
                            "No se pudo conectar con el servidor."
                        );

                    } finally {

                        boton.disabled =
                            false;


                        boton.textContent =
                            "Hacer principal";

                    }

                }
            );

        }
    );


    // =========================================
    // ELIMINAR DIRECCIÓN
    // =========================================

    const botonesEliminar =
        document.querySelectorAll(
            ".direccion-boton-eliminar"
        );


    botonesEliminar.forEach(
        function(boton) {

            boton.addEventListener(
                "click",
                async function() {

                    const direccionId =
                        boton.dataset.id;


                   const confirmar =
                       await confirmarEliminarDireccion();


                    if (!confirmar) {

                        return;

                    }


                    boton.disabled =
                        true;


                    boton.textContent =
                        "Eliminando...";


                    try {

                        const respuesta =
                            await fetch(
                                "/api/direcciones/"
                                +
                                direccionId,
                                {
                                    method:
                                        "DELETE"
                                }
                            );


                        const resultado =
                            await respuesta.json();


                        if (
                            !respuesta.ok
                            ||
                            !resultado.ok
                        ) {

                            alert(
                                resultado.mensaje
                                ||
                                "No se pudo eliminar la dirección."
                            );

                            return;

                        }


                        await cargarPerfil();


                    } catch (error) {

                        console.error(
                            "Error al eliminar dirección:",
                            error
                        );


                        alert(
                            "No se pudo conectar con el servidor."
                        );

                    } finally {

                        boton.disabled =
                            false;


                        boton.textContent =
                            "Eliminar";

                    }

                }
            );

        }
    );

// =========================================
// EDITAR DIRECCIÓN
// =========================================

const botonesEditar =
    document.querySelectorAll(
        ".direccion-boton-editar"
    );


botonesEditar.forEach(
    function(boton) {

        boton.addEventListener(
            "click",
            async function() {

                const direccionId =
                    boton.dataset.id;


                await abrirEdicionDireccion(
                    direccionId
                );

            }
        );

    }
);

}

// =========================================
// CARGAR PERFIL
// =========================================

async function cargarPerfil() {

    try {

        const respuesta =
            await fetch(
                "/api/perfil"
            );


        const resultado =
            await respuesta.json();


        if (
            respuesta.status === 401
        ) {

            window.location.href =
                "/login.html";

            return;

        }


        if (
            !respuesta.ok
            ||
            !resultado.ok
        ) {

            console.error(
                resultado.mensaje
            );

            return;

        }


        const perfil =
            resultado.perfil;
        
        perfilActual =
              perfil;

        perfilNombrePrincipal.textContent =
            (
                perfil.nombre
                +
                " "
                +
                (
                    perfil.apellido || ""
                )
            )
                .trim();


        perfilRol.textContent =
            obtenerNombreRol(
                perfil.rol
            );


        perfilNombre.textContent =
            perfil.nombre || "-";


        perfilApellido.textContent =
            perfil.apellido
            ||
            "Sin configurar";


        perfilEmail.textContent =
            perfil.email;


        perfilTelefono.textContent =
            perfil.telefono
            ||
            "Sin configurar";


        perfilAvatar.textContent =
            obtenerIniciales(
                perfil.nombre,
                perfil.apellido
            );


direccionesActuales =
    resultado.direcciones || [];


mostrarDirecciones(
    direccionesActuales
);


    } catch (error) {

        console.error(
            "No se pudo cargar el perfil:",
            error
        );

    }

}

// =========================================
// ABRIR EDICIÓN
// =========================================

botonEditarPerfil.addEventListener(
    "click",
    function() {

        if (!perfilActual) {

            return;

        }


        campoEditarNombre.value =
            perfilActual.nombre || "";


        campoEditarApellido.value =
            perfilActual.apellido || "";


        campoEditarEmail.value =
            perfilActual.email || "";


        campoEditarTelefono.value =
            perfilActual.telefono || "";


        mensajeEditarPerfil.textContent =
            "";


        perfilDatosVista.hidden =
            true;


        formularioEditarPerfil.hidden =
            false;

    }
);


// =========================================
// CANCELAR EDICIÓN
// =========================================

botonCancelarEdicion.addEventListener(
    "click",
    function() {

        formularioEditarPerfil.hidden =
            true;


        perfilDatosVista.hidden =
            false;


        mensajeEditarPerfil.textContent =
            "";

    }
);


// =========================================
// GUARDAR CAMBIOS
// =========================================

formularioEditarPerfil.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        const nombre =
            campoEditarNombre.value.trim();


        const apellido =
            campoEditarApellido.value.trim();


        const telefono =
            campoEditarTelefono.value.trim();


        if (nombre.length < 2) {

            mensajeEditarPerfil.textContent =
                "Ingresá un nombre válido.";

            mensajeEditarPerfil.className =
                "perfil-mensaje perfil-mensaje-error";

            return;

        }


        botonGuardarPerfil.disabled =
            true;


        botonGuardarPerfil.textContent =
            "Guardando...";


        mensajeEditarPerfil.textContent =
            "";


        try {

            const respuesta =
                await fetch(
                    "/api/perfil",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                nombre:
                                    nombre,

                                apellido:
                                    apellido,

                                telefono:
                                    telefono
                            })
                    }
                );


            const resultado =
                await respuesta.json();


            if (
                !respuesta.ok
                ||
                !resultado.ok
            ) {

                mensajeEditarPerfil.textContent =
                    resultado.mensaje
                    ||
                    "No se pudo actualizar el perfil.";


                mensajeEditarPerfil.className =
                    "perfil-mensaje perfil-mensaje-error";


                return;

            }


            mensajeEditarPerfil.textContent =
                "✓ Información actualizada correctamente.";


            mensajeEditarPerfil.className =
                "perfil-mensaje perfil-mensaje-correcto";


            await cargarPerfil();


            setTimeout(
                function() {

                    formularioEditarPerfil.hidden =
                        true;


                    perfilDatosVista.hidden =
                        false;


                    mensajeEditarPerfil.textContent =
                        "";

                },
                700
            );


        } catch (error) {

            console.error(
                "Error al actualizar perfil:",
                error
            );


            mensajeEditarPerfil.textContent =
                "No se pudo conectar con el servidor.";


            mensajeEditarPerfil.className =
                "perfil-mensaje perfil-mensaje-error";

        } finally {

            botonGuardarPerfil.disabled =
                false;


            botonGuardarPerfil.textContent =
                "Guardar cambios";

        }

    }
);

// =========================================
// ABRIR FORMULARIO DE DIRECCIÓN
// =========================================

botonAgregarDireccion.addEventListener(
    "click",
    async function() {

        direccionEditandoId =
            null;


        tituloFormularioDireccion.textContent =
            "Agregar dirección";


        botonGuardarDireccion.textContent =
            "Guardar dirección";


        mensajeDireccion.textContent =
            "";


        await restablecerFormularioDireccion();


        formularioDireccion.hidden =
            false;


        botonAgregarDireccion.hidden =
            true;


        campoDireccionAlias.focus();

    }
);


// =========================================
// CANCELAR DIRECCIÓN
// =========================================

botonCancelarDireccion.addEventListener(
    "click",
    async function() {

        direccionEditandoId =
            null;


        await restablecerFormularioDireccion();


        tituloFormularioDireccion.textContent =
            "Agregar dirección";


        botonGuardarDireccion.textContent =
            "Guardar dirección";


        formularioDireccion.hidden =
            true;


        botonAgregarDireccion.hidden =
            false;


        mensajeDireccion.textContent =
            "";

    }
);


// =========================================
// GUARDAR / EDITAR DIRECCIÓN
// =========================================

formularioDireccion.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        const datos = {

            alias:
                campoDireccionAlias.value.trim(),

            calle:
                campoDireccionCalle.value.trim(),

            numero:
                campoDireccionNumero.value.trim(),

            piso:
                campoDireccionPiso.value.trim(),

            departamento:
                campoDireccionDepartamento.value.trim(),

            localidad:
                campoDireccionLocalidad.value.trim(),

            provincia:
                campoDireccionProvincia.value.trim(),

            codigo_postal:
                campoDireccionCodigoPostal.value.trim(),

            referencias:
                campoDireccionReferencias.value.trim(),

            es_principal:
                campoDireccionPrincipal.checked

        };


        const esEdicion =
            direccionEditandoId !== null;


        const direccionId =
            direccionEditandoId;


        const url =
            esEdicion
                ? (
                    "/api/direcciones/"
                    +
                    direccionId
                )
                : "/api/direcciones";


        const metodo =
            esEdicion
                ? "PUT"
                : "POST";


        botonGuardarDireccion.disabled =
            true;


        botonGuardarDireccion.textContent =
            esEdicion
                ? "Guardando cambios..."
                : "Guardando...";


        mensajeDireccion.textContent =
            "";


        try {

            const respuesta =
                await fetch(
                    url,
                    {
                        method:
                            metodo,

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                datos
                            )
                    }
                );


            const resultado =
                await respuesta.json();


            if (
                !respuesta.ok
                ||
                !resultado.ok
            ) {

                mensajeDireccion.textContent =
                    resultado.mensaje
                    ||
                    (
                        esEdicion
                            ? "No se pudo actualizar la dirección."
                            : "No se pudo guardar la dirección."
                    );


                mensajeDireccion.className =
                    "perfil-mensaje perfil-mensaje-error";


                return;

            }


            mensajeDireccion.textContent =
                esEdicion
                    ? "✓ Dirección actualizada correctamente."
                    : "✓ Dirección guardada correctamente.";


            mensajeDireccion.className =
                "perfil-mensaje perfil-mensaje-correcto";


            await cargarPerfil();


            await restablecerFormularioDireccion();


            direccionEditandoId =
                null;


            setTimeout(
                function() {

                    formularioDireccion.hidden =
                        true;


                    botonAgregarDireccion.hidden =
                        false;


                    tituloFormularioDireccion.textContent =
                        "Agregar dirección";


                    botonGuardarDireccion.textContent =
                        "Guardar dirección";


                    mensajeDireccion.textContent =
                        "";

                },
                600
            );


        } catch (error) {

            console.error(
                esEdicion
                    ? "Error al actualizar dirección:"
                    : "Error al guardar dirección:",
                error
            );


            mensajeDireccion.textContent =
                "No se pudo conectar con el servidor.";


            mensajeDireccion.className =
                "perfil-mensaje perfil-mensaje-error";

        } finally {

            botonGuardarDireccion.disabled =
                false;


            if (direccionEditandoId !== null) {

                botonGuardarDireccion.textContent =
                    "Guardar cambios";

            } else {

                botonGuardarDireccion.textContent =
                    "Guardar dirección";

            }

        }

    }
);

cargarPerfil();

cargarProvincias();
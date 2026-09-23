// =========================================
// ELEMENTOS
// =========================================

const formularioEditarProducto =
    document.getElementById(
        "form-editar-producto"
    );


const campoNombre =
    document.getElementById(
        "editar-producto-nombre"
    );


const campoCategoria =
    document.getElementById(
        "editar-producto-categoria"
    );


const campoPrecio =
    document.getElementById(
        "editar-producto-precio"
    );

const campoStock =
    document.getElementById(
        "editar-producto-stock"
    );

const campoDescripcionCorta =
    document.getElementById(
        "editar-producto-descripcion-corta"
    );


const campoDescripcionLarga =
    document.getElementById(
        "editar-producto-descripcion-larga"
    );


const campoEstado =
    document.getElementById(
        "editar-producto-estado"
    );

// =========================================
// ESTADO AUTOMÁTICO SEGÚN STOCK
// =========================================

function actualizarEstadoPorStock() {

    const stock =
        Number(
            campoStock.value
        );


    if (stock > 0) {

        campoEstado.value =
            "Disponible";

    } else {

        campoEstado.value =
            "Agotado";

    }

}


campoStock.addEventListener(
    "input",
    actualizarEstadoPorStock
);

const campoImagenFrente =
    document.getElementById(
        "editar-imagen-frente"
    );


const campoImagenDorso =
    document.getElementById(
        "editar-imagen-dorso"
    );

const campoImagenesExtra =
    document.getElementById(
        "editar-imagenes-extra"
    );


const contenedorImagenesExtra =
    document.getElementById(
        "editor-imagenes-extra-preview"
    );    

const vistaImagenFrente =
    document.getElementById(
        "vista-imagen-frente"
    );


const vistaImagenDorso =
    document.getElementById(
        "vista-imagen-dorso"
    );


const mensajeEditar =
    document.getElementById(
        "mensaje-editar-producto"
    );


const botonGuardar =
    document.getElementById(
        "boton-guardar-edicion"
    );

// =========================================
// OFERTAS
// =========================================

const campoEnOferta =
    document.getElementById(
        "editar-producto-en-oferta"
    );


const camposOferta =
    document.getElementById(
        "editor-oferta-campos"
    );


const campoDescuento =
    document.getElementById(
        "editar-producto-descuento"
    );


const textoPrecioFinal =
    document.getElementById(
        "editor-oferta-precio-final"
    );


const textoAhorro =
    document.getElementById(
        "editor-oferta-ahorro"
    );

// =========================================
// MODAL CONFIRMAR OFERTA
// =========================================

const modalConfirmarOferta =
    document.getElementById(
        "modal-confirmar-oferta"
    );


const modalOfertaCaja =
    modalConfirmarOferta.querySelector(
        ".modal-oferta"
    );


const modalOfertaTitulo =
    document.getElementById(
        "modal-oferta-titulo"
    );


const modalOfertaAviso =
    document.getElementById(
        "modal-oferta-aviso"
    );


const modalPrecioNormal =
    document.getElementById(
        "modal-oferta-precio-normal"
    );


const modalDescuento =
    document.getElementById(
        "modal-oferta-descuento"
    );


const modalPrecioFinal =
    document.getElementById(
        "modal-oferta-precio-final"
    );


const botonCancelarOferta =
    document.getElementById(
        "modal-oferta-cancelar"
    );


const botonConfirmarOferta =
    document.getElementById(
        "modal-oferta-confirmar"
    );

// =========================================
// MODAL ELIMINAR IMAGEN
// =========================================

const modalEliminarImagen =
    document.getElementById(
        "modal-eliminar-imagen"
    );


const botonCancelarEliminarImagen =
    document.getElementById(
        "modal-eliminar-imagen-cancelar"
    );


const botonConfirmarEliminarImagen =
    document.getElementById(
        "modal-eliminar-imagen-confirmar"
    );

// =========================================
// MOSTRAR CONFIRMACIÓN
// =========================================

function confirmarOferta() {

    return new Promise(
        function(resolver) {

            const precioNormal =
                Number(
                    campoPrecio.value
                );


            const descuento =
                Number(
                    campoDescuento.value
                );


            const ahorro =
                Math.round(
                    precioNormal
                    * descuento
                    / 100
                );


            const precioFinal =
                precioNormal - ahorro;


            modalPrecioNormal.textContent =
                "$"
                + precioNormal.toLocaleString(
                    "es-AR"
                );


            modalDescuento.textContent =
                descuento + "%";


            modalPrecioFinal.textContent =
                "$"
                + precioFinal.toLocaleString(
                    "es-AR"
                );


            if (descuento >= 70) {

                modalOfertaCaja.classList.add(
                    "advertencia"
                );


                modalOfertaTitulo.textContent =
                    "⚠ Descuento muy alto";


                modalOfertaAviso.textContent =
                    "El descuento es muy elevado. Revisá cuidadosamente los datos antes de confirmar.";

            } else {

                modalOfertaCaja.classList.remove(
                    "advertencia"
                );


                modalOfertaTitulo.textContent =
                    "Confirmar oferta";


                modalOfertaAviso.textContent =
                    "Revisá los datos antes de guardar la oferta.";

            }


            modalConfirmarOferta.hidden =
                false;


            botonCancelarOferta.onclick =
                function() {

                    modalConfirmarOferta.hidden =
                        true;


                    resolver(false);

                };


            botonConfirmarOferta.onclick =
                function() {

                    modalConfirmarOferta.hidden =
                        true;


                    resolver(true);

                };

        }
    );

}

// =========================================
// CALCULAR OFERTA
// =========================================

function actualizarVistaOferta() {

    const precioNormal =
        Number(
            campoPrecio.value
        );


    const descuento =
        Number(
            campoDescuento.value
        );


    if (
        precioNormal <= 0
        ||
        descuento < 1
        ||
        descuento > 99
    ) {

        textoPrecioFinal.textContent =
            "$0";


        textoAhorro.textContent =
            "$0";


        return;

    }


    const ahorro =
        Math.round(
            precioNormal
            * descuento
            / 100
        );


    const precioFinal =
        precioNormal - ahorro;


    textoPrecioFinal.textContent =
        "$"
        + precioFinal.toLocaleString(
            "es-AR"
        );


    textoAhorro.textContent =
        "$"
        + ahorro.toLocaleString(
            "es-AR"
        );

}


// =========================================
// ACTIVAR / DESACTIVAR OFERTA
// =========================================

campoEnOferta.addEventListener(
    "change",
    function() {

        if (campoEnOferta.checked) {

            camposOferta.hidden =
                false;


            actualizarVistaOferta();

        } else {

            camposOferta.hidden =
                true;


            campoDescuento.value =
                "";


            textoPrecioFinal.textContent =
                "$0";


            textoAhorro.textContent =
                "$0";

        }

    }
);


// Recalcular cuando cambia el porcentaje.

campoDescuento.addEventListener(
    "input",
    actualizarVistaOferta
);


// Recalcular también si cambia
// el precio normal.

campoPrecio.addEventListener(
    "input",
    actualizarVistaOferta
);

// =========================================
// ID DEL PRODUCTO
// =========================================

const partesRuta =
    window.location.pathname.split("/");


const productoId =
    Number(
        partesRuta[
            partesRuta.length - 1
        ]
    );


// =========================================
// NORMALIZAR IMAGEN
// =========================================

function normalizarImagen(ruta) {

    if (!ruta) {

        return "";

    }


    if (
        ruta.startsWith("/")
    ) {

        return ruta;

    }


    return "/" + ruta;

}

// =========================================
// MOSTRAR IMÁGENES EXTRA GUARDADAS
// =========================================

let cantidadImagenesActuales = 0;

let imagenPrincipalId =
    null;


let imagenTraseraId =
    null;

function mostrarImagenesExtra(producto) {

    contenedorImagenesExtra.innerHTML =
        "";


    const imagenes =
        Array.isArray(producto.imagenes)
            ? producto.imagenes
            : [];


    cantidadImagenesActuales =
        imagenes.length;


    // =========================================
    // IDENTIFICAR PRINCIPAL
    // =========================================

    const principal =
        imagenes.find(
            function(imagen) {

                return (
                    imagen.ruta ===
                    producto.imagen_frente
                );

            }
        );


    imagenPrincipalId =
        principal
            ? principal.id
            : null;


    // =========================================
    // IDENTIFICAR TRASERA
    // =========================================

    const trasera =
        imagenes.find(
            function(imagen) {

                return (
                    imagen.ruta ===
                    producto.imagen_dorso
                );

            }
        );


    imagenTraseraId =
        trasera
            ? trasera.id
            : null;


    // =========================================
    // IMÁGENES EXTRA
    // =========================================

    const imagenesExtra =
        imagenes.filter(
            function(imagen) {

                return (
                    imagen.id !==
                        imagenPrincipalId
                    &&
                    imagen.id !==
                        imagenTraseraId
                );

            }
        );


    imagenesExtra.forEach(
        function(imagen, indice) {

            const tarjeta =
                document.createElement(
                    "div"
                );


            tarjeta.classList.add(
                "editor-imagen-tarjeta"
            );


            tarjeta.dataset.imagenId =
                imagen.id;


            const etiqueta =
                document.createElement(
                    "span"
                );


            etiqueta.classList.add(
                "editor-imagen-etiqueta"
            );


            etiqueta.textContent =
                "Imagen "
                + (indice + 3);


            const imagenElemento =
                document.createElement(
                    "img"
                );


            imagenElemento.src =
                normalizarImagen(
                    imagen.ruta
                );


            imagenElemento.alt =
                "Imagen adicional del producto";


            // =========================================
            // OVERLAY
            // =========================================

            const overlay =
                document.createElement(
                    "div"
                );


            overlay.classList.add(
                "editor-imagen-overlay"
            );


            const botonReemplazar =
                document.createElement(
                    "button"
                );


            botonReemplazar.type =
                "button";


            botonReemplazar.classList.add(
                "editor-imagen-accion",
                "editor-imagen-reemplazar"
            );


            botonReemplazar.textContent =
                "🖼 Reemplazar imagen";

                            botonReemplazar.addEventListener(
                "click",
                function() {

                    seleccionarReemplazoImagen(
                        imagen.id
                    );

                }
            );

            const botonEliminar =
                document.createElement(
                    "button"
                );


            botonEliminar.type =
                "button";


            botonEliminar.classList.add(
                "editor-imagen-accion",
                "editor-imagen-eliminar"
            );


            botonEliminar.textContent =
                "🗑 Eliminar imagen";


            botonEliminar.addEventListener(
                "click",
                function() {

                    eliminarImagenGuardada(
                        imagen.id
                    );

                }
            );


            overlay.appendChild(
                botonReemplazar
            );


            overlay.appendChild(
                botonEliminar
            );


            tarjeta.appendChild(
                etiqueta
            );


            tarjeta.appendChild(
                imagenElemento
            );


            tarjeta.appendChild(
                overlay
            );


            contenedorImagenesExtra
                .appendChild(
                    tarjeta
                );

        }
    );

}

// =========================================
// MENSAJE
// =========================================

function mostrarMensajeEditar(
    texto,
    tipo
) {

    mensajeEditar.textContent =
        texto;


    mensajeEditar.className =
        "mensaje-producto";


    if (tipo) {

        mensajeEditar.classList.add(
            tipo
        );

    }

}


// =========================================
// CARGAR PRODUCTO
// =========================================

async function cargarProductoEditar() {

    if (
        !Number.isInteger(productoId)
        ||
        productoId <= 0
    ) {

        mostrarMensajeEditar(
            "Producto no válido.",
            "error"
        );

        return;

    }


    try {

        const respuesta =
            await fetch(
                "/api/productos/"
                + productoId
            );


        const resultado =
            await respuesta.json();


        if (
            !respuesta.ok
            ||
            !resultado.ok
        ) {

            mostrarMensajeEditar(
                resultado.mensaje ||
                "No se pudo cargar el producto.",
                "error"
            );

            return;

        }


        const producto =
            resultado.producto;


        campoNombre.value =
            producto.nombre;


        campoCategoria.value =
            producto.categoria;


         campoPrecio.value =
            producto.precio;


        campoStock.value =
            Number(
                producto.stock
            ) || 0;


        actualizarEstadoPorStock();


        campoDescripcionCorta.value =
            producto.descripcion_corta || "";


        campoDescripcionLarga.value =
            producto.descripcion_larga || "";


// =========================================
// CARGAR OFERTA ACTUAL
// =========================================

const tieneOferta =
    Number(
        producto.en_oferta
    ) === 1;


campoEnOferta.checked =
    tieneOferta;


if (tieneOferta) {

    // Si el producto está en oferta,
    // siempre mostramos el panel.

    camposOferta.hidden =
        false;


    if (
        producto.descuento_porcentaje
    ) {

        campoDescuento.value =
            producto.descuento_porcentaje;


        actualizarVistaOferta();

    } else {

        // Puede pasar con productos que
        // tenían una oferta anterior al
        // nuevo sistema de porcentajes.

        campoDescuento.value =
            "";


        textoPrecioFinal.textContent =
            "$0";


        textoAhorro.textContent =
            "$0";

    }

} else {

    campoDescuento.value =
        "";


    camposOferta.hidden =
        true;


    textoPrecioFinal.textContent =
        "$0";


    textoAhorro.textContent =
        "$0";

}


// =========================================
// IMÁGENES
// =========================================

        vistaImagenFrente.src =
            normalizarImagen(
                producto.imagen_frente
            );


        vistaImagenDorso.src =
            normalizarImagen(
                producto.imagen_dorso
            );


        mostrarImagenesExtra(
            producto
        );


    } catch (error) {

        console.error(error);


        mostrarMensajeEditar(
            "No se pudo conectar con el servidor.",
            "error"
        );

    }

}


// =========================================
// ELIMINAR IMAGEN GUARDADA
// =========================================

async function eliminarImagenGuardada(
    imagenId
) {

// =========================================
// CONFIRMAR ELIMINACIÓN
// =========================================

function confirmarEliminacionImagen() {

    return new Promise(
        function(resolver) {

            modalEliminarImagen.hidden =
                false;


            botonCancelarEliminarImagen.onclick =
                function() {

                    modalEliminarImagen.hidden =
                        true;

                    resolver(false);

                };


            botonConfirmarEliminarImagen.onclick =
                function() {

                    modalEliminarImagen.hidden =
                        true;

                    resolver(true);

                };

        }
    );

}

    if (!imagenId) {

        mostrarMensajeEditar(
            "No se encontró la imagen.",
            "error"
        );

        return;

    }


    const confirmado =
    await confirmarEliminacionImagen();


    if (!confirmado) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                "/api/admin/productos/"
                + productoId
                + "/imagenes/"
                + imagenId,
                {
                    method: "DELETE"
                }
            );


        const resultado =
            await respuesta.json();


        if (
            !respuesta.ok
            ||
            !resultado.ok
        ) {

            mostrarMensajeEditar(
                resultado.mensaje
                ||
                "No se pudo eliminar la imagen.",
                "error"
            );

            return;

        }


        await cargarProductoEditar();


        mostrarMensajeEditar(
            "✓ Imagen eliminada correctamente.",
            "correcto"
        );


    } catch (error) {

        console.error(error);


        mostrarMensajeEditar(
            "No se pudo conectar con el servidor.",
            "error"
        );

    }

}

// =========================================
// REEMPLAZAR IMAGEN GUARDADA
// =========================================

async function reemplazarImagenGuardada(
    imagenId,
    archivo
) {

    if (!imagenId) {

        mostrarMensajeEditar(
            "No se encontró la imagen.",
            "error"
        );

        return false;

    }


    if (!archivo) {

        return false;

    }


    const datos =
        new FormData();


    datos.append(
        "imagen",
        archivo
    );


    mostrarMensajeEditar(
        "Reemplazando imagen...",
        "correcto"
    );


    try {

        const respuesta =
            await fetch(
                "/api/admin/productos/"
                + productoId
                + "/imagenes/"
                + imagenId,
                {
                    method: "PUT",
                    body: datos
                }
            );


        const resultado =
            await respuesta.json();


        if (
            !respuesta.ok
            ||
            !resultado.ok
        ) {

            mostrarMensajeEditar(
                resultado.mensaje
                ||
                "No se pudo reemplazar la imagen.",
                "error"
            );

            return false;

        }


        await cargarProductoEditar();


        mostrarMensajeEditar(
            "✓ Imagen reemplazada correctamente.",
            "correcto"
        );


        return true;


    } catch (error) {

        console.error(error);


        mostrarMensajeEditar(
            "No se pudo conectar con el servidor.",
            "error"
        );


        return false;

    }

}


// =========================================
// SELECCIONAR REEMPLAZO PARA IMAGEN EXTRA
// =========================================

function seleccionarReemplazoImagen(
    imagenId
) {

    const selector =
        document.createElement(
            "input"
        );


    selector.type =
        "file";


    selector.accept =
        ".png,.jpg,.jpeg,.webp";


    selector.addEventListener(
        "change",
        async function() {

            const archivo =
                selector.files[0];


            if (!archivo) {

                return;

            }


            await reemplazarImagenGuardada(
                imagenId,
                archivo
            );

        }
    );


    selector.click();

}

// =========================================
// BOTONES ELIMINAR PRINCIPAL / TRASERA
// =========================================

const botonEliminarPrincipal =
    document.getElementById(
        "eliminar-imagen-principal"
    );


const botonEliminarTrasera =
    document.getElementById(
        "eliminar-imagen-trasera"
    );


if (botonEliminarPrincipal) {

    botonEliminarPrincipal.addEventListener(
        "click",
        function() {

            eliminarImagenGuardada(
                imagenPrincipalId
            );

        }
    );

}


if (botonEliminarTrasera) {

    botonEliminarTrasera.addEventListener(
        "click",
        function() {

            eliminarImagenGuardada(
                imagenTraseraId
            );

        }
    );

}

// =========================================
// REEMPLAZAR PRINCIPAL
// =========================================

campoImagenFrente.addEventListener(
    "change",
    async function() {

        const archivo =
            campoImagenFrente.files[0];


        if (!archivo) {

            return;

        }


        if (!imagenPrincipalId) {

            mostrarMensajeEditar(
                "No se encontró la imagen principal.",
                "error"
            );


            campoImagenFrente.value =
                "";


            return;

        }


        await reemplazarImagenGuardada(
            imagenPrincipalId,
            archivo
        );


        campoImagenFrente.value =
            "";

    }
);


// =========================================
// REEMPLAZAR TRASERA
// =========================================

campoImagenDorso.addEventListener(
    "change",
    async function() {

        const archivo =
            campoImagenDorso.files[0];


        if (!archivo) {

            return;

        }


        if (!imagenTraseraId) {

            mostrarMensajeEditar(
                "No se encontró la imagen trasera.",
                "error"
            );


            campoImagenDorso.value =
                "";


            return;

        }


        await reemplazarImagenGuardada(
            imagenTraseraId,
            archivo
        );


        campoImagenDorso.value =
            "";

    }
);

// =========================================
// AGREGAR IMÁGENES EXTRA
// =========================================

campoImagenesExtra.addEventListener(
    "change",
    async function() {

        const archivos =
            Array.from(
                campoImagenesExtra.files
            );


        if (archivos.length === 0) {

            return;

        }


        const espaciosDisponibles =
            8 - cantidadImagenesActuales;


        if (espaciosDisponibles <= 0) {

            mostrarMensajeEditar(
                "El producto ya tiene el máximo de 8 imágenes.",
                "error"
            );


            campoImagenesExtra.value =
                "";


            return;

        }


        if (
            archivos.length >
            espaciosDisponibles
        ) {

            mostrarMensajeEditar(
                "Solo podés agregar "
                + espaciosDisponibles
                + " imagen/es más.",
                "error"
            );


            campoImagenesExtra.value =
                "";


            return;

        }


        mostrarMensajeEditar(
            "Subiendo imágenes...",
            "correcto"
        );


        try {

            for (
                const archivo
                of archivos
            ) {

                const datos =
                    new FormData();


                datos.append(
                    "imagen",
                    archivo
                );


                const respuesta =
                    await fetch(
                        "/api/admin/productos/"
                        + productoId
                        + "/imagenes",
                        {
                            method: "POST",
                            body: datos
                        }
                    );


                const resultado =
                    await respuesta.json();


                if (
                    !respuesta.ok
                    ||
                    !resultado.ok
                ) {

                    mostrarMensajeEditar(
                        resultado.mensaje
                        ||
                        "No se pudo agregar la imagen.",
                        "error"
                    );


                    campoImagenesExtra.value =
                        "";


                    return;

                }

            }


            campoImagenesExtra.value =
                "";


            await cargarProductoEditar();


            mostrarMensajeEditar(
                "✓ Imágenes agregadas correctamente.",
                "correcto"
            );


        } catch (error) {

            console.error(error);


            mostrarMensajeEditar(
                "No se pudo conectar con el servidor.",
                "error"
            );


            campoImagenesExtra.value =
                "";

        }

    }
);

// =========================================
// GUARDAR CAMBIOS
// =========================================

formularioEditarProducto.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        // =========================================
        // CONFIRMAR OFERTA
        // =========================================

        if (campoEnOferta.checked) {

            const descuento =
                Number(
                    campoDescuento.value
                );


            if (
                descuento < 1
                ||
                descuento > 99
            ) {

                mostrarMensajeEditar(
                    "El descuento debe estar entre 1% y 99%.",
                    "error"
                );


                return;

            }


            const confirmado =
                await confirmarOferta();


            if (!confirmado) {

                return;

            }

        }


        const datos =
            new FormData();


        datos.append(
            "nombre",
            campoNombre.value.trim()
        );


        datos.append(
            "categoria",
            campoCategoria.value
        );


        datos.append(
            "precio",
            campoPrecio.value
        );

        datos.append(
    "stock",
    campoStock.value
);

        datos.append(
            "descripcion_corta",
            campoDescripcionCorta.value.trim()
        );


        datos.append(
            "descripcion_larga",
            campoDescripcionLarga.value.trim()
        );


        datos.append(
            "estado",
            campoEstado.value
        );

if (campoEnOferta.checked) {

    datos.append(
        "en_oferta",
        "1"
    );


    datos.append(
        "descuento_porcentaje",
        campoDescuento.value
    );

} else {

    datos.append(
        "en_oferta",
        "0"
    );

}        

        if (
            campoImagenFrente.files[0]
        ) {

            datos.append(
                "imagen_frente",
                campoImagenFrente.files[0]
            );

        }


        if (
            campoImagenDorso.files[0]
        ) {

            datos.append(
                "imagen_dorso",
                campoImagenDorso.files[0]
            );

        }


        botonGuardar.disabled =
            true;


        botonGuardar.textContent =
            "Guardando...";


        try {

            const respuesta =
                await fetch(
                    "/api/admin/productos/"
                    + productoId,
                    {
                        method: "PUT",
                        body: datos
                    }
                );


            const resultado =
                await respuesta.json();


            if (
                !respuesta.ok
                ||
                !resultado.ok
            ) {

                mostrarMensajeEditar(
                    resultado.mensaje ||
                    "No se pudo actualizar el producto.",
                    "error"
                );

                return;

            }


            mostrarMensajeEditar(
                "✓ Producto actualizado correctamente.",
                "correcto"
            );


            await cargarProductoEditar();


        } catch (error) {

            console.error(error);


            mostrarMensajeEditar(
                "No se pudo conectar con el servidor.",
                "error"
            );


        } finally {

            botonGuardar.disabled =
                false;


            botonGuardar.textContent =
                "Guardar cambios";

        }

    }
);


// =========================================
// INICIAR
// =========================================

cargarProductoEditar();
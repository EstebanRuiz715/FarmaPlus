const formularioProducto =
    document.getElementById("form-producto");


const campoNombre =
    document.getElementById("producto-nombre");


const campoCategoria =
    document.getElementById("producto-categoria");


const campoPrecio =
    document.getElementById("producto-precio");

const campoStock =
    document.getElementById(
        "producto-stock"
    );    

const campoDescripcionCorta =
    document.getElementById(
        "producto-descripcion-corta"
    );


const campoDescripcionLarga =
    document.getElementById(
        "producto-descripcion-larga"
    );


const campoEstado =
    document.getElementById("producto-estado");

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


actualizarEstadoPorStock();


const mensajeProducto =
    document.getElementById("mensaje-producto");


const listaProductos =
    document.getElementById(
        "lista-productos-admin"
    );

const tituloFormularioProducto =
    document.getElementById(
        "titulo-form-producto"
    );


const botonGuardarProducto =
    document.getElementById(
        "boton-guardar-producto"
    );


const botonCancelarEdicion =
    document.getElementById(
        "boton-cancelar-edicion"
    );


let productoEnEdicionId =
    null;    

const campoBuscarProductoAdmin =
    document.getElementById(
        "buscar-producto-admin"
    );


const campoOrdenarProductosAdmin =
    document.getElementById(
        "ordenar-productos-admin"
    );


let productosAdmin = [];

// =========================================
// MOSTRAR MENSAJE DEL PRODUCTO
// =========================================

function mostrarMensajeProducto(
    mensaje,
    tipo
) {

    mensajeProducto.textContent =
        mensaje;

    mensajeProducto.className =
        "mensaje-producto " + tipo;

}

    const campoImagenFrente =
    document.getElementById(
        "producto-imagen-frente"
    );


const campoImagenDorso =
    document.getElementById(
        "producto-imagen-dorso"
    );

// =========================================
// MODO EDICIÓN
// =========================================

function cargarProductoEnFormulario(
    producto
) {

    productoEnEdicionId =
        producto.id;


    campoNombre.value =
        producto.nombre;


    campoCategoria.value =
        producto.categoria;


    campoPrecio.value =
        producto.precio;


    campoDescripcionCorta.value =
        producto.descripcion_corta || "";


    campoDescripcionLarga.value =
        producto.descripcion_larga || "";


    campoEstado.value =
        producto.estado;


    tituloFormularioProducto.textContent =
        "Editar producto";


    botonGuardarProducto.textContent =
        "Guardar cambios";


    botonCancelarEdicion.hidden =
        false;


    campoImagenFrente.required =
        false;


    campoImagenDorso.required =
        false;


    mostrarMensajeProducto(
        "Podés modificar los datos del producto. Las imágenes solo cambian si seleccionás archivos nuevos.",
        "correcto"
    );


    formularioProducto.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================
// VOLVER A MODO AGREGAR
// =========================================

function volverModoAgregar() {

    productoEnEdicionId =
        null;


    tituloFormularioProducto.textContent =
        "Agregar producto";


    botonGuardarProducto.textContent =
        "+ Agregar producto";


    botonCancelarEdicion.hidden =
        true;


    campoImagenFrente.required =
        true;


    campoImagenDorso.required =
        true;


    actualizarEstadoPorStock();

}


// =========================================
// CANCELAR EDICIÓN
// =========================================

botonCancelarEdicion.addEventListener(
    "click",
    function() {

        formularioProducto.reset();

        volverModoAgregar();

        mensajeProducto.textContent =
            "";

    }
);

// =========================================
// AGREGAR PRODUCTO
// =========================================

formularioProducto.addEventListener(
    "submit",
    async function(evento) {

        evento.preventDefault();


        mensajeProducto.textContent =
            "";


        const editando =
            productoEnEdicionId !== null;


        // =========================
        // ARMAR DATOS
        // =========================

        const datosProducto =
            new FormData();


        datosProducto.append(
            "nombre",
            campoNombre.value.trim()
        );


        datosProducto.append(
            "categoria",
            campoCategoria.value
        );


        datosProducto.append(
            "precio",
            campoPrecio.value
        );

        datosProducto.append(
            "stock",
            campoStock.value
        );

        datosProducto.append(
            "descripcion_corta",
            campoDescripcionCorta.value.trim()
        );


        datosProducto.append(
            "descripcion_larga",
            campoDescripcionLarga.value.trim()
        );


        datosProducto.append(
            "estado",
            campoEstado.value
        );


        if (
            campoImagenFrente.files[0]
        ) {

            datosProducto.append(
                "imagen_frente",
                campoImagenFrente.files[0]
            );

        }


        if (
            campoImagenDorso.files[0]
        ) {

            datosProducto.append(
                "imagen_dorso",
                campoImagenDorso.files[0]
            );

        }


        // =========================
        // URL Y MÉTODO
        // =========================

        let url =
            "/api/admin/productos";


        let metodo =
            "POST";


        if (editando) {

            url =
                "/api/admin/productos/"
                + productoEnEdicionId;


            metodo =
                "PUT";

        }


        // =========================
        // ENVIAR
        // =========================

        try {

            const respuesta =
                await fetch(
                    url,
                    {
                        method: metodo,
                        body: datosProducto
                    }
                );


            const resultado =
                await respuesta.json();


            if (!respuesta.ok) {

                mostrarMensajeProducto(
                    resultado.mensaje,
                    "error"
                );

                return;

            }


            if (editando) {

                mostrarMensajeProducto(
                    "✓ Producto actualizado correctamente.",
                    "correcto"
                );

            } else {

                mostrarMensajeProducto(
                    "✓ Producto agregado correctamente.",
                    "correcto"
                );

            }


            formularioProducto.reset();

            volverModoAgregar();

            cargarProductos();


        } catch (error) {

            console.error(error);


            mostrarMensajeProducto(
                "No se pudo conectar con el servidor.",
                "error"
            );

        }

    }
);


// =========================================
// CREAR TARJETA DE PRODUCTO ADMIN
// =========================================

function crearTarjetaProductoAdmin(producto) {

    const tarjeta =
        document.createElement("div");


    tarjeta.classList.add(
        "admin-producto-item"
    );


    tarjeta.innerHTML = `

        <div class="admin-producto-principal">

            ${
                producto.imagen_frente

                    ? `
                        <img
                            src="/${producto.imagen_frente}"
                            alt="${producto.nombre}"
                            class="admin-producto-imagen"
                        >
                      `

                    : `
                        <div class="admin-producto-sin-imagen">
                            Sin imagen
                        </div>
                      `
            }


            <div>

                <strong>
                    ${producto.nombre}
                </strong>

                <span>
                    ${producto.categoria}
                </span>

            </div>

        </div>


        <div class="admin-producto-derecha">

            <div class="admin-producto-datos">

                <strong>
                    $${producto.precio.toLocaleString("es-AR")}
                </strong>

                <span class="${
                    producto.estado === "Disponible"
                        ? "estado-disponible"
                        : "estado-agotado"
                }">
                    ${producto.estado}
                </span>

            </div>


            <button
                type="button"
                class="admin-boton-editar"
            >
                Editar
            </button>

        </div>

    `;


const botonEditar =
    tarjeta.querySelector(
        ".admin-boton-editar"
    );


botonEditar.addEventListener(
    "click",
    function() {

        window.location.href =
            "/admin/productos/editar/"
            + producto.id;

    }
);

    return tarjeta;

}

// =========================================
// NORMALIZAR TEXTO
// =========================================

function normalizarTextoAdmin(texto) {

    return String(
        texto || ""
    )
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .toLowerCase();

}


// =========================================
// FILTRAR Y ORDENAR PRODUCTOS
// =========================================

function obtenerProductosAdminVisibles() {

    const busqueda =
        normalizarTextoAdmin(
            campoBuscarProductoAdmin.value.trim()
        );


    let productos =
        productosAdmin.filter(
            function(producto) {

                const nombre =
                    normalizarTextoAdmin(
                        producto.nombre
                    );


                const categoria =
                    normalizarTextoAdmin(
                        producto.categoria
                    );


                return (
                    nombre.includes(busqueda)
                    ||
                    categoria.includes(busqueda)
                );

            }
        );


    productos =
        [...productos];


    const orden =
        campoOrdenarProductosAdmin.value;


    function compararNombres(
        productoA,
        productoB
    ) {

        return productoA.nombre.localeCompare(
            productoB.nombre,
            "es",
            {
                sensitivity: "base"
            }
        );

    }


    if (orden === "nombre-desc") {

        productos.sort(
            function(productoA, productoB) {

                return compararNombres(
                    productoB,
                    productoA
                );

            }
        );

    } else if (
        orden === "precio-asc"
    ) {

        productos.sort(
            function(productoA, productoB) {

                return (
                    Number(productoA.precio)
                    -
                    Number(productoB.precio)
                );

            }
        );

    } else if (
        orden === "precio-desc"
    ) {

        productos.sort(
            function(productoA, productoB) {

                return (
                    Number(productoB.precio)
                    -
                    Number(productoA.precio)
                );

            }
        );

    } else if (
        orden === "disponibles"
    ) {

        productos.sort(
            function(productoA, productoB) {

                const prioridadA =
                    productoA.estado === "Disponible"
                        ? 0
                        : 1;


                const prioridadB =
                    productoB.estado === "Disponible"
                        ? 0
                        : 1;


                return (
                    prioridadA - prioridadB
                    ||
                    compararNombres(
                        productoA,
                        productoB
                    )
                );

            }
        );

    } else if (
        orden === "agotados"
    ) {

        productos.sort(
            function(productoA, productoB) {

                const prioridadA =
                    productoA.estado === "Agotado"
                        ? 0
                        : 1;


                const prioridadB =
                    productoB.estado === "Agotado"
                        ? 0
                        : 1;


                return (
                    prioridadA - prioridadB
                    ||
                    compararNombres(
                        productoA,
                        productoB
                    )
                );

            }
        );

    } else {

        productos.sort(
            compararNombres
        );

    }


    return productos;

}


// =========================================
// MOSTRAR PRODUCTOS
// =========================================

function renderizarProductosAdmin() {

    listaProductos.innerHTML = "";


    const productosVisibles =
        obtenerProductosAdminVisibles();


    if (productosAdmin.length === 0) {

        listaProductos.innerHTML =
            "<p>Todavía no hay productos cargados desde el panel.</p>";

        return;

    }


    if (
        productosVisibles.length === 0
    ) {

        listaProductos.innerHTML =
            "<p>No se encontraron productos.</p>";

        return;

    }


    productosVisibles.forEach(
        function(producto) {

            const tarjeta =
                crearTarjetaProductoAdmin(
                    producto
                );


            listaProductos.appendChild(
                tarjeta
            );

        }
    );

}


// =========================================
// CARGAR PRODUCTOS
// =========================================

async function cargarProductos() {

    try {

        const respuesta =
            await fetch(
                "/api/admin/productos"
            );


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            listaProductos.innerHTML =
                "<p>No se pudieron cargar los productos.</p>";

            return;

        }


        productosAdmin =
            resultado.productos;


        renderizarProductosAdmin();


    } catch (error) {

        console.error(error);


        listaProductos.innerHTML =
            "<p>Error al cargar los productos.</p>";

    }

}


// =========================================
// BUSCADOR
// =========================================

campoBuscarProductoAdmin.addEventListener(
    "input",
    function() {

        renderizarProductosAdmin();

    }
);


// =========================================
// ORDENAR PRODUCTOS
// =========================================

campoOrdenarProductosAdmin.addEventListener(
    "change",
    function() {

        renderizarProductosAdmin();

    }
);


// =========================================
// INICIAR
// =========================================

cargarProductos();
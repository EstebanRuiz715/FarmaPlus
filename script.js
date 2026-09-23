let carrito =
    JSON.parse(
        localStorage.getItem("carritoFarmaPlus")
    ) || [];


function guardarCarrito() {

    localStorage.setItem(
        "carritoFarmaPlus",
        JSON.stringify(carrito)
    );

}

const contadorCarrito = document.getElementById("contador-carrito");
let contadorCarritoInicializado =
    false;
const botonesAgregar =
    document.querySelectorAll(".producto .agregar-carrito");

const panelCarrito = document.getElementById("panel-carrito");
const enlaceCarrito = document.getElementById("carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");


botonesAgregar.forEach(
    function(boton) {

        boton.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();
                evento.stopPropagation();


                const tarjetaProducto =
                    boton.closest(
                        ".producto"
                    );


                const nombre =
                    tarjetaProducto
                        .querySelector("h3")
                        .textContent;


                const precioTexto =
                    tarjetaProducto
                        .querySelector("span")
                        .textContent;


                const precio =
                    Number(
                        precioTexto.replace(
                            /\D/g,
                            ""
                        )
                    );


                const imagenElemento =
                    tarjetaProducto.querySelector(
                        ".producto-imagen img"
                    );


                let imagenProducto = "";


                if (imagenElemento) {

                    imagenProducto =
                        normalizarRutaImagen(
                            imagenElemento.getAttribute(
                                "src"
                            )
                        );

                }


                const productoExistente =
                    carrito.find(
                        function(producto) {

                            return (
                                producto.nombre ===
                                nombre
                            );

                        }
                    );


                if (productoExistente) {

                    productoExistente.cantidad++;


                    if (imagenProducto) {

                        productoExistente.imagen =
                            imagenProducto;

                    }

                } else {

                    carrito.push({

                        nombre:
                            nombre,

                        precio:
                            precio,

                        cantidad:
                            1,

                        imagen:
                            imagenProducto

                    });

                }


                actualizarCarrito();

            }
        );

    }
);

function obtenerImagenItemCarrito(item) {

    if (!item) {

        return "";

    }


    if (!item.imagen) {

        return "";

    }


    return normalizarRutaImagen(
        item.imagen
    );

}


function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;


carrito.forEach(function(item, indice) {

    const subtotal =
        item.precio * item.cantidad;

        const stockItem =
        Number(
            item.stock
        );


    const tieneStockItem =
        item.stock !== null
        &&
        item.stock !== undefined
        &&
        Number.isFinite(
            stockItem
        );


    const llegoAlMaximo =
        tieneStockItem
        &&
        item.cantidad >=
            stockItem;

    const imagenProducto =
        obtenerImagenItemCarrito(item);


    const elemento =
        document.createElement("div");


    elemento.classList.add(
        "item-carrito"
    );


    elemento.innerHTML = `

        <div class="item-info">

            <div class="producto-carrito-info">

                <strong>
                    ${item.nombre}
                </strong>


                ${
                    imagenProducto
                        ? `
                            <img
                                src="${imagenProducto}"
                                alt="${item.nombre}"
                                class="imagen-carrito"
                            >
                          `
                        : `
                            <div class="imagen-carrito-sin-imagen">
                                Sin imagen
                            </div>
                          `
                }

            </div>


            <span>
                $${item.precio.toLocaleString("es-AR")} c/u
            </span>

        </div>


        <div class="acciones-producto-carrito">

            <div class="control-cantidad">

                <button onclick="restarCantidad(${indice})">
                    -
                </button>

                <span>
                    ${item.cantidad}
                </span>

                <button
    onclick="sumarCantidad(${indice})"
    class="${llegoAlMaximo ? "boton-maximo" : ""}"
    ${llegoAlMaximo ? "disabled" : ""}
>
    ${llegoAlMaximo ? "Max" : "+"}
</button>

            </div>


            <button
                class="boton-eliminar-carrito"
                onclick="eliminarProducto(${indice})"
            >
                Eliminar
            </button>

        </div>


        <div class="subtotal">
            $${subtotal.toLocaleString("es-AR")}
        </div>

    `;  


        listaCarrito.appendChild(elemento);

        total += subtotal;

        cantidadTotal += item.cantidad;

    });


if (carrito.length === 0) {

    listaCarrito.innerHTML =
        "<p>Tu carrito está vacío.</p>";

}

if (carrito.length === 0) {

    botonFinalizarCompra.disabled = true;

    botonFinalizarCompra.textContent =
        "Carrito vacío";

} else {

    botonFinalizarCompra.disabled = false;

    botonFinalizarCompra.textContent =
        "Finalizar compra";

}

const cantidadAnterior =
    Number(
        contadorCarrito.textContent
    );


contadorCarrito.textContent =
    cantidadTotal;


// =========================
// MOSTRAR / OCULTAR BADGE
// =========================

if (cantidadTotal === 0) {

    contadorCarrito.style.display =
        "none";

} else {

    contadorCarrito.style.display =
        "flex";

}


// =========================
// VIBRACIÓN 0 → 1
// =========================

if (
    contadorCarritoInicializado &&
    cantidadAnterior === 0 &&
    cantidadTotal === 1
) {

    contadorCarrito.classList.remove(
        "vibrando"
    );


    void contadorCarrito.offsetWidth;


    contadorCarrito.classList.add(
        "vibrando"
    );

}


contadorCarritoInicializado =
    true;


totalCarrito.textContent =
    total.toLocaleString("es-AR");


guardarCarrito();

}


function sumarCantidad(indice) {

    const item =
        carrito[indice];


    if (!item) {

        return;

    }


    const stock =
        Number(
            item.stock
        );


    const tieneStock =
        item.stock !== null
        &&
        item.stock !== undefined
        &&
        Number.isFinite(
            stock
        );


    if (
        tieneStock
        &&
        item.cantidad >= stock
    ) {

        return;

    }


    item.cantidad++;


    actualizarCarrito();

}


function restarCantidad(indice) {

    carrito[indice].cantidad--;


    if (
        carrito[indice].cantidad <= 0
    ) {

        carrito.splice(
            indice,
            1
        );

    }


    actualizarCarrito();

}


function eliminarProducto(indice) {

    carrito.splice(
        indice,
        1
    );


    actualizarCarrito();

}


enlaceCarrito.addEventListener("click", function(evento) {

    evento.preventDefault();

    panelCarrito.classList.remove("oculto");

});


cerrarCarrito.addEventListener("click", function() {

    panelCarrito.classList.add("oculto");

});

const botonFinalizarCompra =
    document.querySelector(
        ".finalizar-compra"
    );


botonFinalizarCompra.addEventListener(
    "click",
    function() {

        window.location.href =
            "/checkout.html";

    }
);

// =========================
// BUSCADOR Y CATEGORÍAS
// =========================

const campoBusqueda = document.querySelector(".buscador input");

const botonBuscar = document.querySelector(".buscador button");

const productos = document.querySelectorAll(".producto");

const botonesCategoria = document.querySelectorAll(".categoria");


let categoriaSeleccionada = "todos";


function aplicarFiltros() {

    const textoBusqueda =
        campoBusqueda.value
            .toLowerCase()
            .trim();


    const productosActuales =
        document.querySelectorAll(
            ".producto"
        );


    productosActuales.forEach(
        function(producto) {

            const nombre =
                producto
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();


            const descripcion =
                producto
                    .querySelector("p")
                    .textContent
                    .toLowerCase();


            const categoriaProducto =
                producto.dataset.categoria;


            const coincideBusqueda =
                nombre.includes(
                    textoBusqueda
                )
                ||
                descripcion.includes(
                    textoBusqueda
                );


            const coincideCategoria =
                categoriaSeleccionada === "todos"
                ||
                categoriaProducto ===
                    categoriaSeleccionada;


            producto.style.display =
                coincideBusqueda &&
                coincideCategoria
                    ? ""
                    : "none";

        }
    );

}


campoBusqueda.addEventListener("input", function() {

    aplicarFiltros();

});


botonBuscar.addEventListener("click", function() {

    aplicarFiltros();

});


botonesCategoria.forEach(function(boton) {

    boton.addEventListener("click", function() {

        categoriaSeleccionada =
            boton.dataset.categoria;


        botonesCategoria.forEach(function(botonCategoria) {

            botonCategoria.classList.remove("activa");

        });


        boton.classList.add("activa");


        aplicarFiltros();

    });

});

// =========================
// ABRIR DETALLE PRODUCTO
// =========================

productos.forEach(function(producto) {

    producto.addEventListener("click", function(evento) {

        // Si tocamos el botón carrito,
        // NO abrimos el producto

        if (evento.target.closest("button")) {
            return;
        }


        const id = producto.dataset.id;


        window.location.href =
            "producto.html?id=" + id;

    });

});

actualizarCarrito();


// =========================
// GALERÍA DE LAS TARJETAS
// =========================

const imagenesTarjetas = {

    shampoo: [
        "img/shampoo-coco-frente.png",
        "img/shampoo-coco-dorso.png"
    ],

    protector: [
        "img/protector-solar-frente.png",
        "img/protector-solar-dorso.png"
    ],

    alcohol: [
        "img/alcohol-gel-frente.png",
        "img/alcohol-gel-dorso.png"
    ],

  ibudol: [
        "img/ibudol-frente.png",
        "img/ibudol-dorso.png"
    ],

  gripnova: [
        "img/gripnova-frente.png",
        "img/gripnova-dorso.png"
    ],

    nocteris: [
        "img/nocteris-frente.png",
        "img/nocteris-dorso.png"
    ],

    "crema-manos": [
        "img/crema-manos-frente.png",
        "img/crema-manos-dorso.png"
    ],

    "jabon-lunabella": [
    "img/jabon-lunabella-frente.png",
    "img/jabon-lunabella-dorso.png"
],
  
"dentiva-cepillo": [
    "img/cepillo-dental-frente.png",
    "img/cepillo-dental-dorso.png"
],

"limpiador-facial": [
    "img/veluna-limpiador-frente.png",
    "img/veluna-limpiador-dorso.png"
],

"aireva-desodorante": [
    "img/aireva-frente.png",
    "img/aireva-dorso.png"
],

"suavetip-cotonetes": [
    "img/suavetip-frente.png",
    "img/suavetip-dorso.png"
],

};


document
    .querySelectorAll(".producto")
    .forEach(function(producto) {

        const idProducto =
            producto.dataset.id;

        const imagenes =
            imagenesTarjetas[idProducto];


        if (!imagenes) {
            return;
        }


        const imagen =
            producto.querySelector(".producto-imagen img");

        const botonAnterior =
            producto.querySelector(".flecha-anterior");

        const botonSiguiente =
            producto.querySelector(".flecha-siguiente");


        let indiceImagen = 0;


        function mostrarImagen() {

            imagen.src =
                imagenes[indiceImagen];

        }


        botonSiguiente.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();
                evento.stopPropagation();

                indiceImagen++;

                if (indiceImagen >= imagenes.length) {
                    indiceImagen = 0;
                }

                mostrarImagen();

            }
        );


        botonAnterior.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();
                evento.stopPropagation();

                indiceImagen--;

                if (indiceImagen < 0) {
                    indiceImagen =
                        imagenes.length - 1;
                }

                mostrarImagen();

            }
        );

    });

    // =========================================
// PRODUCTOS DESDE LA BASE DE DATOS
// =========================================

const listaProductosBaseDatos =
    document.getElementById(
        "lista-productos"
    );


function convertirCategoriaData(categoria) {

    const categorias = {

        "Cuidado personal":
            "cuidado-personal",

        "Piel":
            "piel",

        "Higiene":
            "higiene",

        "Medicamentos":
            "medicamentos"

    };


    return categorias[categoria] || "otros";

}



// =========================================
// NORMALIZAR RUTA DE IMAGEN
// =========================================

function normalizarRutaImagen(ruta) {

    if (!ruta) {

        return "";

    }


    if (
        ruta.startsWith("http://") ||
        ruta.startsWith("https://") ||
        ruta.startsWith("data:")
    ) {

        return ruta;

    }


    if (ruta.startsWith("/")) {

        return ruta;

    }


    return "/" + ruta;

}

// =========================================
// PRECIOS Y OFERTAS
// =========================================

function productoTieneOferta(producto) {

    const precioNormal =
        Number(
            producto.precio
        );


    const precioOferta =
        Number(
            producto.precio_oferta
        );


    return (
        Number(
            producto.en_oferta
        ) === 1
        &&
        precioOferta > 0
        &&
        precioOferta < precioNormal
    );

}


function obtenerPrecioVenta(producto) {

    if (
        productoTieneOferta(
            producto
        )
    ) {

        return Number(
            producto.precio_oferta
        );

    }


    return Number(
        producto.precio
    );

}


function obtenerPorcentajeOferta(producto) {

    const porcentaje =
        Number(
            producto.descuento_porcentaje
        );


    if (
        porcentaje >= 1
        &&
        porcentaje <= 99
    ) {

        return porcentaje;

    }


    // Compatibilidad con alguna oferta vieja
    // que tenga precio de oferta pero no porcentaje.

    if (
        productoTieneOferta(
            producto
        )
    ) {

        const precioNormal =
            Number(
                producto.precio
            );


        const precioOferta =
            Number(
                producto.precio_oferta
            );


        return Math.round(
            (
                1 -
                precioOferta /
                precioNormal
            )
            * 100
        );

    }


    return 0;

}

// =========================================
// SINCRONIZAR CARRITO CON BASE DE DATOS
// =========================================

function sincronizarCarritoConProductos(
    productosBaseDatos
) {

    const carritoSincronizado = [];


    carrito.forEach(
        function(item) {

            const imagenItem =
                String(
                    item.imagen || ""
                )
                    .replace(
                        /^\/+/,
                        ""
                    )
                    .toLowerCase();


            const productoActual =
                productosBaseDatos.find(
                    function(producto) {

                        const imagenProducto =
                            String(
                                producto.imagen_frente || ""
                            )
                                .replace(
                                    /^\/+/,
                                    ""
                                )
                                .toLowerCase();


                        const mismoId =
                            item.producto_id
                            &&
                            Number(
                                item.producto_id
                            ) ===
                            Number(
                                producto.id
                            );


                        const mismoNombre =
                            String(
                                item.nombre
                            )
                                .toLowerCase()
                                .trim()
                            ===
                            String(
                                producto.nombre
                            )
                                .toLowerCase()
                                .trim();


                        const mismaImagen =
                            imagenItem
                            &&
                            imagenProducto
                            &&
                            imagenItem ===
                                imagenProducto;


                        return (
                            mismoId
                            ||
                            mismoNombre
                            ||
                            mismaImagen
                        );

                    }
                );


            if (!productoActual) {

                return;

            }


            const stockActual =
                Math.max(
                    0,
                    Math.floor(
                        Number(
                            productoActual.stock
                        ) || 0
                    )
                );


            // Si no hay stock,
            // sale automáticamente del carrito.

            if (stockActual <= 0) {

                return;

            }


            const cantidadSolicitada =
                Math.max(
                    1,
                    Math.floor(
                        Number(
                            item.cantidad
                        ) || 1
                    )
                );


            const cantidadAjustada =
                Math.min(
                    cantidadSolicitada,
                    stockActual
                );


            carritoSincronizado.push({

                producto_id:
                    productoActual.id,

                nombre:
                    productoActual.nombre,

                precio:
                    obtenerPrecioVenta(
                        productoActual
                    ),

                cantidad:
                    cantidadAjustada,

                stock:
                    stockActual,

                imagen:
                    normalizarRutaImagen(
                        productoActual.imagen_frente
                    )

            });

        }
    );


    carrito =
        carritoSincronizado;


    guardarCarrito();

    actualizarCarrito();

}

// =========================================
// AGREGAR PRODUCTO DINÁMICO AL CARRITO
// =========================================

function agregarProductoBaseDatosAlCarrito(
    producto
) {

    const stockActual =
        Math.max(
            0,
            Math.floor(
                Number(
                    producto.stock
                ) || 0
            )
        );


    if (stockActual <= 0) {

        return;

    }


    const imagenProducto =
        normalizarRutaImagen(
            producto.imagen_frente
        );


    const precioVenta =
        obtenerPrecioVenta(
            producto
        );


    const productoExistente =
        carrito.find(
            function(item) {

                return (
                    Number(
                        item.producto_id
                    ) ===
                    Number(
                        producto.id
                    )
                    ||
                    (
                        !item.producto_id
                        &&
                        item.nombre ===
                            producto.nombre
                    )
                );

            }
        );


    if (productoExistente) {

        productoExistente.cantidad =
            Math.min(
                Number(
                    productoExistente.cantidad
                ) || 0,
                stockActual
            );


        if (
            productoExistente.cantidad >=
            stockActual
        ) {

            productoExistente.stock =
                stockActual;

            actualizarCarrito();

            return;

        }


        productoExistente.cantidad++;


        productoExistente.producto_id =
            producto.id;


        productoExistente.nombre =
            producto.nombre;


        productoExistente.precio =
            precioVenta;


        productoExistente.stock =
            stockActual;


        productoExistente.imagen =
            imagenProducto;

    } else {

        carrito.push({

            producto_id:
                producto.id,

            nombre:
                producto.nombre,

            precio:
                precioVenta,

            cantidad:
                1,

            stock:
                stockActual,

            imagen:
                imagenProducto

        });

    }


    actualizarCarrito();

}


// =========================================
// CREAR TARJETA
// =========================================

function crearTarjetaBaseDatos(producto) {

    const tarjeta =
        document.createElement("div");


    tarjeta.classList.add(
        "producto",
        "producto-base-datos"
    );


    tarjeta.dataset.categoria =
        convertirCategoriaData(
            producto.categoria
        );


    const imagenes = [];


    if (producto.imagen_frente) {

        imagenes.push(
            normalizarRutaImagen(
                producto.imagen_frente
            )
        );

    }


    if (producto.imagen_dorso) {

        imagenes.push(
            normalizarRutaImagen(
                producto.imagen_dorso
            )
        );

    }


    let indiceImagen = 0;


const stock =
    Number(
        producto.stock
    ) || 0;


const disponible =
    stock > 0;


const tieneOferta =
    productoTieneOferta(
        producto
    );


const precioNormal =
    Number(
        producto.precio
    );


const precioVenta =
    obtenerPrecioVenta(
        producto
    );


const porcentajeOferta =
    obtenerPorcentajeOferta(
        producto
    );


tarjeta.innerHTML = `

    ${
        tieneOferta
            ? `
                <div class="producto-oferta-tira">
                    ${porcentajeOferta}% OFF
                </div>
              `
            : ""
    }


    <div class="producto-db-galeria">

        ${
            imagenes.length > 0
                ? `
                    <img
                        src="${imagenes[0]}"
                        alt="${producto.nombre}"
                        class="producto-db-imagen-principal"
                    >
                  `
                : `
                    <div class="producto-db-sin-imagen">
                        Sin imagen
                    </div>
                  `
        }


        ${
            imagenes.length > 1
                ? `
                    <button
                        type="button"
                        class="producto-db-flecha producto-db-flecha-izquierda"
                    >
                        ‹
                    </button>

                    <button
                        type="button"
                        class="producto-db-flecha producto-db-flecha-derecha"
                    >
                        ›
                    </button>
                  `
                : ""
        }

    </div>


    <h3>
        ${producto.nombre}
    </h3>


    <p>
        ${producto.categoria}
    </p>


    ${
        tieneOferta
            ? `
                <div class="producto-db-precios">

                    <span class="producto-db-precio-normal">
                        $${precioNormal.toLocaleString("es-AR")}
                    </span>

                    <span class="producto-db-precio-oferta">
                        $${precioVenta.toLocaleString("es-AR")}
                    </span>

                </div>
              `
            : `
                <span class="producto-db-precio">
                    $${precioNormal.toLocaleString("es-AR")}
                </span>
              `
    }


    <button
        type="button"
        class="producto-db-boton"
        ${disponible ? "" : "disabled"}
    >
        ${
            disponible
                ? "Agregar al carrito"
                : "Agotado"
        }
    </button>

`;


    // =========================
    // CAMBIAR IMÁGENES
    // =========================

    const imagenPrincipal =
        tarjeta.querySelector(
            ".producto-db-imagen-principal"
        );


    const flechaIzquierda =
        tarjeta.querySelector(
            ".producto-db-flecha-izquierda"
        );


    const flechaDerecha =
        tarjeta.querySelector(
            ".producto-db-flecha-derecha"
        );


    if (flechaIzquierda) {

        flechaIzquierda.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();

                evento.stopPropagation();


                indiceImagen--;


                if (indiceImagen < 0) {

                    indiceImagen =
                        imagenes.length - 1;

                }


                imagenPrincipal.src =
                    imagenes[indiceImagen];

            }
        );

    }


    if (flechaDerecha) {

        flechaDerecha.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();

                evento.stopPropagation();


                indiceImagen++;


                if (
                    indiceImagen >=
                    imagenes.length
                ) {

                    indiceImagen = 0;

                }


                imagenPrincipal.src =
                    imagenes[indiceImagen];

            }
        );

    }


    // =========================
    // AGREGAR AL CARRITO
    // =========================

    const botonAgregar =
        tarjeta.querySelector(
            ".producto-db-boton"
        );


    if (disponible) {

        botonAgregar.addEventListener(
            "click",
            function(evento) {

                evento.preventDefault();

                evento.stopPropagation();


                agregarProductoBaseDatosAlCarrito(
                    producto
                );

            }
        );

    }


    // =========================
    // ABRIR PRODUCTO
    // =========================

    tarjeta.addEventListener(
        "click",
        function(evento) {

            if (
                evento.target.closest("button")
            ) {

                return;

            }


            window.location.href =
                "/producto.html?db="
                + producto.id;

        }
    );


    return tarjeta;

}


// =========================================
// CARGAR PRODUCTOS DE FLASK
// =========================================

async function cargarProductosBaseDatos() {

    if (!listaProductosBaseDatos) {

        return;

    }


    try {

        const respuesta =
            await fetch(
                "/api/productos"
            );


        const resultado =
            await respuesta.json();


if (
    !respuesta.ok ||
    !resultado.ok
) {

    console.error(
        "No se pudieron cargar los productos."
    );

    return;

}


// Sincronizar carrito con los datos actuales
// de la base de datos.

sincronizarCarritoConProductos(
    resultado.productos
);


resultado.productos.forEach(
            function(producto) {

                const tarjeta =
                    crearTarjetaBaseDatos(
                        producto
                    );


                listaProductosBaseDatos
                    .appendChild(
                        tarjeta
                    );

            }
        );


        aplicarFiltros();


    } catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );

    }

}


cargarProductosBaseDatos();
// =========================================
// CHECKOUT - FARMAPLUS
// =========================================


// =========================================
// CONFIGURACIÓN DE ENVÍO
// =========================================

const COSTO_ENVIO_DOMICILIO =
    3500;

const MINIMO_ENVIO_GRATIS =
    50000;


// =========================================
// ELEMENTOS
// =========================================

const contenedorCliente =
    document.getElementById(
        "checkout-datos-cliente"
    );


const contenedorDirecciones =
    document.getElementById(
        "checkout-direcciones"
    );


const listaDirecciones =
    document.getElementById(
        "checkout-lista-direcciones"
    );


const opcionRetiro =
    document.getElementById(
        "entrega-retiro"
    );


const opcionEnvio =
    document.getElementById(
        "entrega-envio"
    );


const contenedorProductos =
    document.getElementById(
        "checkout-productos"
    );


const subtotalElemento =
    document.getElementById(
        "checkout-subtotal"
    );


const envioElemento =
    document.getElementById(
        "checkout-envio"
    );


const totalElemento =
    document.getElementById(
        "checkout-total"
    );

const filaDescuento =
    document.getElementById(
        "checkout-fila-descuento"
    );


const descuentoElemento =
    document.getElementById(
        "checkout-descuento"
    );


const nombreDescuentoElemento =
    document.getElementById(
        "checkout-nombre-descuento"
    );    

const botonContinuar =
    document.getElementById(
        "checkout-confirmar"
    );


const unidadesElemento =
    document.getElementById(
        "checkout-unidades"
    );


const botonVaciar =
    document.getElementById(
        "checkout-vaciar"
    );


const botonAplicarCupon =
    document.getElementById(
        "checkout-aplicar-cupon"
    );


const mensajeCupon =
    document.getElementById(
        "checkout-cupon-mensaje"
    );


const pagoSucursal =
    document.getElementById(
        "checkout-pago-sucursal"
    );


const avisoPago =
    document.getElementById(
        "checkout-pago-aviso"
    );

const avisoPromocion =
    document.getElementById(
        "checkout-promocion-aviso"
    );    

const modalAviso =
    document.getElementById(
        "checkout-modal-aviso"
    );


const modalAvisoTitulo =
    document.getElementById(
        "checkout-modal-titulo"
    );


const modalAvisoTexto =
    document.getElementById(
        "checkout-modal-texto"
    );


const modalAvisoAceptar =
    document.getElementById(
        "checkout-modal-aceptar"
    );

// =========================================
// FORMATEAR PRECIO
// =========================================

function formatearPrecio(valor) {

    return (
        "$"
        +
        Math.round(
            Number(valor) || 0
        ).toLocaleString(
            "es-AR"
        )
    );

}


// =========================================
// OBTENER CARRITO
// =========================================

function obtenerCarritoCheckout() {

    try {

        const carritoGuardado =
            JSON.parse(
                localStorage.getItem(
                    "carritoFarmaPlus"
                )
            );


        if (
            !Array.isArray(
                carritoGuardado
            )
        ) {

            return [];

        }


        return carritoGuardado;

    } catch (error) {

        console.error(
            "Error al leer carrito:",
            error
        );


        return [];

    }

}


// =========================================
// GUARDAR CARRITO
// =========================================

function guardarCarritoCheckout(
    carrito
) {

    localStorage.setItem(
        "carritoFarmaPlus",
        JSON.stringify(
            carrito
        )
    );

}


// =========================================
// MOSTRAR CLIENTE
// =========================================

function mostrarCliente(
    cliente
) {

    const nombreCompleto =
        (
            cliente.nombre
            +
            " "
            +
            (
                cliente.apellido || ""
            )
        ).trim();


    contenedorCliente.innerHTML = `

        <div class="checkout-dato">

            <span>
                Nombre
            </span>

            <strong>
                ${nombreCompleto}
            </strong>

        </div>


        <div class="checkout-dato">

            <span>
                Email
            </span>

            <strong>
                ${cliente.email}
            </strong>

        </div>


        <div class="checkout-dato">

            <span>
                Teléfono
            </span>

            <strong>
                ${
                    cliente.telefono
                    ||
                    "No registrado"
                }
            </strong>

        </div>

    `;

}


// =========================================
// MOSTRAR DIRECCIONES
// =========================================

function mostrarDirecciones(
    direcciones
) {

    listaDirecciones.innerHTML =
        "";


    if (
        !Array.isArray(
            direcciones
        )
        ||
        direcciones.length === 0
    ) {

        listaDirecciones.innerHTML = `

            <p>
                No tenés direcciones guardadas.
            </p>

        `;

        return;

    }


    const existePrincipal =
        direcciones.some(
            function(direccion) {

                return (
                    Number(
                        direccion.es_principal
                    ) === 1
                );

            }
        );


    direcciones.forEach(
        function(
            direccion,
            indice
        ) {

            const seleccionada =
                existePrincipal
                    ?
                    Number(
                        direccion.es_principal
                    ) === 1
                    :
                    indice === 0;


            let extra =
                "";


            if (direccion.piso) {

                extra +=
                    " · Piso "
                    +
                    direccion.piso;

            }


            if (
                direccion.departamento
            ) {

                extra +=
                    " · Depto. "
                    +
                    direccion.departamento;

            }


            const tarjeta =
                document.createElement(
                    "label"
                );


            tarjeta.classList.add(
                "checkout-direccion"
            );


            tarjeta.innerHTML = `

                <input
                    type="radio"
                    name="direccion-entrega"
                    value="${direccion.id}"
                    ${
                        seleccionada
                            ?
                            "checked"
                            :
                            ""
                    }
                >


                <div>

                    <div
                        class="checkout-direccion-superior"
                    >

                        <strong>
                            ${direccion.alias}
                        </strong>


                        ${
                            Number(
                                direccion.es_principal
                            ) === 1
                                ?
                                `
                                <span
                                    class="checkout-principal-badge"
                                >
                                    Principal
                                </span>
                                `
                                :
                                ""
                        }

                    </div>


                    <p>
                        ${direccion.calle}
                        ${direccion.numero}
                        ${extra}
                    </p>


                    <span>
                        ${direccion.localidad},
                        ${direccion.provincia}
                    </span>

                </div>

            `;


            listaDirecciones.appendChild(
                tarjeta
            );

        }
    );

}


// =========================================
// MOSTRAR / OCULTAR DIRECCIONES
// =========================================

function actualizarTipoEntrega() {

    if (
        opcionEnvio.checked
    ) {

        contenedorDirecciones.classList.remove(
            "oculto"
        );


        pagoSucursal.style.display =
            "none";


        avisoPago.textContent =
            "Para envíos a domicilio, el pedido debe pagarse antes del despacho.";


        const metodoSeleccionado =
            document.querySelector(
                'input[name="metodo-pago"]:checked'
            );


        if (
            metodoSeleccionado
            &&
            metodoSeleccionado.value ===
                "sucursal"
        ) {

            document.querySelector(
                'input[name="metodo-pago"][value="mercado_pago"]'
            ).checked =
                true;

        }

    } else {

        contenedorDirecciones.classList.add(
            "oculto"
        );


        pagoSucursal.style.display =
            "";


        avisoPago.textContent =
            "Podés pagar ahora o al retirar tu compra.";

    }


    mostrarCarritoCheckout();

}


// =========================================
// AVISO ENVÍO GRATIS
// =========================================

function mostrarAvisoEnvioGratis(
    subtotal
) {

    let aviso =
        document.getElementById(
            "checkout-aviso-envio"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "checkout-aviso-envio";


        aviso.classList.add(
            "checkout-aviso-envio"
        );


        botonContinuar.before(
            aviso
        );

    }


    if (
        opcionRetiro.checked
    ) {

        aviso.innerHTML = `
            🚚 Retiro gratis en
            FarmaPlus Burzaco
        `;

        return;

    }


    if (
        subtotal >=
        MINIMO_ENVIO_GRATIS
    ) {

        aviso.innerHTML = `
            🚚 ¡Tenés envío gratis!
        `;

        return;

    }


    const faltante =
        MINIMO_ENVIO_GRATIS
        -
        subtotal;


    aviso.innerHTML = `

        🚚 Te faltan

        <strong>
            ${formatearPrecio(faltante)}
        </strong>

        para tener envío gratis.

    `;

}

// =========================================
// CALCULAR PROMOCIÓN
// =========================================

function calcularPromocionCheckout(
    subtotal
) {

    const metodoSeleccionado =
        document.querySelector(
            'input[name="metodo-pago"]:checked'
        );


    if (!metodoSeleccionado) {

        return {
            descuento: 0,
            nombre: ""
        };

    }


    const metodo =
        metodoSeleccionado.value;


    // =====================================
    // SANTANDER - 15%
    // =====================================

    if (
        metodo === "santander"
    ) {

        return {
            descuento:
                Math.round(
                    subtotal * 0.15
                ),

            nombre:
                "Promoción Santander 15%"
        };

    }


    // =====================================
    // CUENTA DNI - 10% LOS SÁBADOS
    // =====================================

    if (
        metodo === "cuenta_dni"
    ) {

        const hoy =
            new Date();


        const esSabado =
            hoy.getDay() === 6;


        if (esSabado) {

            return {
                descuento:
                    Math.round(
                        subtotal * 0.10
                    ),

                nombre:
                    "Cuenta DNI sábado 10%"
            };

        }


        return {
            descuento: 0,
            nombre:
                "Cuenta DNI: promoción válida los sábados"
        };

    }


    // Mercado Pago y pago en sucursal

    return {
        descuento: 0,
        nombre: ""
    };

}

// =========================================
// ACTUALIZAR TOTALES
// =========================================

function actualizarTotalesCheckout(
    subtotal
) {

    subtotal =
        Number(
            subtotal
        ) || 0;


    // =====================================
    // PROMOCIÓN
    // =====================================

    const promocion =
        calcularPromocionCheckout(
            subtotal
        );


    const descuento =
        Math.min(
            subtotal,
            Math.max(
                0,
                promocion.descuento
            )
        );


    const subtotalConDescuento =
        subtotal
        -
        descuento;


    // =====================================
    // ENVÍO
    // =====================================

    let costoEnvio =
        0;


    // El mínimo de envío gratis
    // se calcula sobre los productos
    // antes del descuento.

    if (
        opcionEnvio.checked
        &&
        subtotal <
            MINIMO_ENVIO_GRATIS
    ) {

        costoEnvio =
            COSTO_ENVIO_DOMICILIO;

    }


    // =====================================
    // TOTAL
    // =====================================

    const total =
        subtotalConDescuento
        +
        costoEnvio;


    subtotalElemento.textContent =
        formatearPrecio(
            subtotal
        );


    // =====================================
    // MOSTRAR DESCUENTO
    // =====================================

    if (
        descuento > 0
    ) {

        filaDescuento.hidden =
            false;


        nombreDescuentoElemento.textContent =
            promocion.nombre;


        descuentoElemento.textContent =
            "-"
            +
            formatearPrecio(
                descuento
            );

        } else {

        filaDescuento.hidden =
            true;


        nombreDescuentoElemento.textContent =
            "Promoción";


        descuentoElemento.textContent =
            "-$0";

    }


    // =====================================
    // ENVÍO
    // =====================================

    if (
        opcionRetiro.checked
        ||
        costoEnvio === 0
    ) {

        envioElemento.textContent =
            "Gratis";

    } else {

        envioElemento.textContent =
            formatearPrecio(
                costoEnvio
            );

    }


    totalElemento.textContent =
        formatearPrecio(
            total
        );


    mostrarAvisoEnvioGratis(
        subtotal
    );

}


// =========================================
// MOSTRAR CARRITO
// =========================================

function mostrarCarritoCheckout() {

    const carrito =
        obtenerCarritoCheckout();


    contenedorProductos.innerHTML =
        "";


    if (
        carrito.length === 0
    ) {

        contenedorProductos.innerHTML = `

            <div
                class="checkout-carrito-vacio"
            >

                <h3>
                    Tu carrito está vacío
                </h3>

                <p>
                    Agregá productos para continuar
                    con tu compra.
                </p>

            </div>

        `;


        unidadesElemento.textContent =
            "0 unidades";


        subtotalElemento.textContent =
            "$0";


        envioElemento.textContent =
            "$0";


        totalElemento.textContent =
            "$0";


        botonContinuar.disabled =
            true;


        const aviso =
            document.getElementById(
                "checkout-aviso-envio"
            );


        if (aviso) {

            aviso.remove();

        }


        return;

    }


    let subtotalGeneral =
        0;


    let unidadesTotales =
        0;


    carrito.forEach(
        function(
            item,
            indice
        ) {

            const precio =
                Math.max(
                    0,
                    Number(
                        item.precio
                    ) || 0
                );


            const cantidad =
                Math.max(
                    1,
                    Math.floor(
                        Number(
                            item.cantidad
                        ) || 1
                    )
                );


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


            const llegoAlMaximo =
                tieneStock
                &&
                cantidad >= stock;


            const subtotalProducto =
                precio
                *
                cantidad;


            subtotalGeneral +=
                subtotalProducto;


            unidadesTotales +=
                cantidad;


            const producto =
                document.createElement(
                    "article"
                );


            producto.classList.add(
                "checkout-producto"
            );


            producto.dataset.indice =
                indice;


            producto.innerHTML = `

                <div
                    class="checkout-producto-info"
                >

                    ${
                        item.imagen
                            ?
                            `
                            <img
                                src="${item.imagen}"
                                alt="${item.nombre}"
                            >
                            `
                            :
                            ""
                    }


                    <div
                        class="checkout-producto-datos"
                    >

                        <strong>
                            ${item.nombre}
                        </strong>


                        <span>
                            ${formatearPrecio(precio)}
                            c/u
                        </span>


                        <div
                            class="checkout-producto-acciones"
                        >

                            <div
                                class="checkout-cantidad"
                            >

                                <button
                                    type="button"
                                    data-accion="restar"
                                    data-indice="${indice}"
                                >
                                    −
                                </button>


                                <span>
                                    ${cantidad}
                                </span>


                                <button
                                    type="button"
                                    data-accion="sumar"
                                    data-indice="${indice}"
                                    class="${
                                        llegoAlMaximo
                                            ?
                                            "boton-maximo"
                                            :
                                            ""
                                    }"
                                    ${
                                        llegoAlMaximo
                                            ?
                                            "disabled"
                                            :
                                            ""
                                    }
                                >
                                    ${
                                        llegoAlMaximo
                                            ?
                                            "Max"
                                            :
                                            "+"
                                    }
                                </button>

                            </div>


                            <button
                                type="button"
                                class="checkout-eliminar"
                                data-accion="eliminar"
                                data-indice="${indice}"
                            >
                                Eliminar
                            </button>

                        </div>

                    </div>

                </div>


                <strong
                    class="checkout-producto-subtotal"
                >
                    ${
                        formatearPrecio(
                            subtotalProducto
                        )
                    }
                </strong>

            `;


            contenedorProductos.appendChild(
                producto
            );

        }
    );


    unidadesElemento.textContent =
        unidadesTotales === 1
            ?
            "1 unidad"
            :
            unidadesTotales
            +
            " unidades";


    actualizarTotalesCheckout(
        subtotalGeneral
    );


    // Ya existe un carrito válido.
// Las validaciones finales se hacen
// nuevamente al crear el pedido.

botonContinuar.disabled =
    false;

}


// =========================================
// ACCIONES DE PRODUCTOS
// =========================================

contenedorProductos.addEventListener(
    "click",
    function(evento) {

        const boton =
            evento.target.closest(
                "button[data-accion]"
            );


        if (!boton) {

            return;

        }


        const indice =
            Number(
                boton.dataset.indice
            );


        const accion =
            boton.dataset.accion;


        const carrito =
            obtenerCarritoCheckout();


        const item =
            carrito[indice];


        if (!item) {

            return;

        }


        // =============================
        // SUMAR
        // =============================

        if (
            accion === "sumar"
        ) {

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


            const cantidadActual =
                Math.max(
                    1,
                    Math.floor(
                        Number(
                            item.cantidad
                        ) || 1
                    )
                );


            if (
                tieneStock
                &&
                cantidadActual >= stock
            ) {

                return;

            }


            item.cantidad =
                cantidadActual
                +
                1;

        }


        // =============================
        // RESTAR
        // =============================

        if (
            accion === "restar"
        ) {

            const cantidadActual =
                Math.max(
                    1,
                    Math.floor(
                        Number(
                            item.cantidad
                        ) || 1
                    )
                );


            if (
                cantidadActual > 1
            ) {

                item.cantidad =
                    cantidadActual
                    -
                    1;

            }

        }


        // =============================
        // ELIMINAR
        // =============================

        if (
            accion === "eliminar"
        ) {

            carrito.splice(
                indice,
                1
            );

        }


        guardarCarritoCheckout(
            carrito
        );


        mostrarCarritoCheckout();

    }
);


// =========================================
// VACIAR CARRITO
// =========================================

botonVaciar.addEventListener(
    "click",
    function() {

        const carrito =
            obtenerCarritoCheckout();


        if (
            carrito.length === 0
        ) {

            return;

        }


        const confirmar =
            window.confirm(
                "¿Querés vaciar todo el carrito?"
            );


        if (!confirmar) {

            return;

        }


        guardarCarritoCheckout(
            []
        );


        mostrarCarritoCheckout();

    }
);


// =========================================
// CAMBIAR FORMA DE ENTREGA
// =========================================

opcionRetiro.addEventListener(
    "change",
    actualizarTipoEntrega
);


opcionEnvio.addEventListener(
    "change",
    actualizarTipoEntrega
);

// =========================================
// AVISO DE PROMOCIÓN
// =========================================

function actualizarAvisoPromocion() {

    const metodoSeleccionado =
        document.querySelector(
            'input[name="metodo-pago"]:checked'
        );


    avisoPromocion.hidden =
        true;


    avisoPromocion.innerHTML =
        "";


    if (!metodoSeleccionado) {

        return;

    }


    const metodo =
        metodoSeleccionado.value;


    // =====================================
    // CUENTA DNI
    // =====================================

    if (
        metodo === "cuenta_dni"
    ) {

        const hoy =
            new Date();


        const esSabado =
            hoy.getDay() === 6;


        avisoPromocion.hidden =
            false;


        if (esSabado) {

            avisoPromocion.innerHTML = `
                <strong>
                    ✓ Cuenta DNI
                </strong>

                <span>
                    Hoy tenés 10% de descuento.
                </span>
            `;

        } else {

            avisoPromocion.innerHTML = `
                <strong>
                    Cuenta DNI
                </strong>

                <span>
                    El 10% de descuento está disponible
                    únicamente los sábados.
                </span>
            `;

        }


        return;

    }


    // =====================================
    // SANTANDER
    // =====================================

    if (
        metodo === "santander"
    ) {

        avisoPromocion.hidden =
            false;


        avisoPromocion.innerHTML = `
            <strong>
                ✓ Santander
            </strong>

            <span>
                Se aplicó un 15% de descuento
                a tu compra.
            </span>
        `;

    }

}

// =========================================
// CAMBIAR MÉTODO DE PAGO
// =========================================

document.addEventListener(
    "change",
    function(evento) {

        if (
            evento.target.matches(
                'input[name="metodo-pago"]'
            )
        ) {

            mostrarCarritoCheckout();

            actualizarAvisoPromocion();

        }

    }
);

// =========================================
// CUPÓN
// =========================================

botonAplicarCupon.addEventListener(
    "click",
    function() {

        mensajeCupon.textContent =
            "Los cupones se habilitarán próximamente.";

    }
);

// =========================================
// MODAL DE AVISO
// =========================================

function mostrarAvisoCheckout(
    mensaje,
    titulo = "Falta completar un dato"
) {

    modalAvisoTitulo.textContent =
        titulo;


    modalAvisoTexto.textContent =
        mensaje;


    modalAviso.classList.remove(
        "oculto"
    );

}


function cerrarAvisoCheckout() {

    modalAviso.classList.add(
        "oculto"
    );

}


modalAvisoAceptar.addEventListener(
    "click",
    cerrarAvisoCheckout
);


modalAviso.addEventListener(
    "click",
    function(evento) {

        if (
            evento.target ===
            modalAviso
        ) {

            cerrarAvisoCheckout();

        }

    }
);

// =========================================
// FINALIZAR COMPRA / CREAR PEDIDO
// =========================================

botonContinuar.addEventListener(
    "click",
    async function() {

        const carrito =
            obtenerCarritoCheckout();


        // =================================
        // VALIDAR CARRITO
        // =================================

        if (
            carrito.length === 0
        ) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }


        // =================================
        // TIPO DE ENTREGA
        // =================================

        const tipoEntrega =
            opcionEnvio.checked
                ?
                "envio"
                :
                "retiro";


        // =================================
        // MÉTODO DE PAGO
        // =================================

        const metodoSeleccionado =
            document.querySelector(
                'input[name="metodo-pago"]:checked'
            );


        if (!metodoSeleccionado) {

    mostrarAvisoCheckout(
        "Elegí una forma de pago antes de continuar con tu compra.",
        "Elegí cómo querés pagar"
    );

    return;

}


        const metodoPago =
            metodoSeleccionado.value;


        // =================================
        // DIRECCIÓN
        // =================================

        let direccionId =
            null;


        if (
            tipoEntrega === "envio"
        ) {

            const direccionSeleccionada =
                document.querySelector(
                    'input[name="direccion-entrega"]:checked'
                );


            if (
                !direccionSeleccionada
            ) {

                alert(
                    "Elegí una dirección de entrega."
                );

                return;

            }


            direccionId =
                Number(
                    direccionSeleccionada.value
                );

        }


        // =================================
        // ITEMS
        // =================================

        const itemsPedido =
            carrito.map(
                function(item) {

                    return {

                        producto_id:
                            Number(
                                item.producto_id
                            ),

                        cantidad:
                            Math.max(
                                1,
                                Math.floor(
                                    Number(
                                        item.cantidad
                                    ) || 1
                                )
                            )

                    };

                }
            );


        // =================================
        // VALIDAR IDs
        // =================================

        const itemInvalido =
            itemsPedido.find(
                function(item) {

                    return (
                        !Number.isInteger(
                            item.producto_id
                        )
                        ||
                        item.producto_id <= 0
                    );

                }
            );


        if (itemInvalido) {

            alert(
                "Uno de los productos del carrito no pudo identificarse correctamente. Volvé a Productos y agregalo nuevamente."
            );

            return;

        }


        // =================================
        // PREPARAR BOTÓN
        // =================================

        botonContinuar.disabled =
            true;


        const textoOriginal =
            botonContinuar.textContent;


        botonContinuar.textContent =
            "Creando pedido...";


        try {

            // =================================
            // ENVIAR AL SERVIDOR
            // =================================

            const respuesta =
                await fetch(
                    "/api/pedidos",
                    {
                        method:
                            "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                tipo_entrega:
                                    tipoEntrega,

                                metodo_pago:
                                    metodoPago,

                                direccion_id:
                                    direccionId,

                                items:
                                    itemsPedido
                            })
                    }
                );


            const resultado =
                await respuesta.json();


            // =================================
            // SESIÓN
            // =================================

            if (
                respuesta.status === 401
            ) {

                window.location.href =
                    "/login.html";

                return;

            }


            // =================================
            // ERROR
            // =================================

            if (
                !respuesta.ok
                ||
                !resultado.ok
            ) {

                alert(
                    resultado.mensaje
                    ||
                    "No se pudo crear el pedido."
                );


                botonContinuar.disabled =
                    false;


                botonContinuar.textContent =
                    textoOriginal;


                return;

            }


            // =================================
            // PEDIDO CREADO
            // =================================

                        console.log(
                "Pedido creado:",
                resultado
            );


            // Guardamos los datos
            // del pedido recién creado.

            localStorage.setItem(
                "pedidoPendienteFarmaPlus",
                JSON.stringify(
                    resultado.pedido
                )
            );


            // El pedido ya está guardado
            // en SQLite, así que vaciamos
            // el carrito.

            guardarCarritoCheckout(
                []
            );


            // Ir a la página
            // de confirmación.

            window.location.href =
                "/pedido-confirmado.html";


        } catch (error) {

            console.error(
                "Error al crear pedido:",
                error
            );


            alert(
                "No se pudo conectar con el servidor."
            );


            botonContinuar.disabled =
                false;


            botonContinuar.textContent =
                textoOriginal;

        }

    }
);

// =========================================
// CARGAR CHECKOUT
// =========================================

async function cargarCheckout() {

    const carrito =
        obtenerCarritoCheckout();


    if (carrito.length === 0) {

        window.location.replace(
            "/productos.html"
        );

        return;

    }


    try {

        const respuesta =
            await fetch(
                "/api/checkout/datos"
            );


        if (
            respuesta.status === 401
        ) {

            window.location.href =
                "/login.html";

            return;

        }


        const datos =
            await respuesta.json();


        if (
            !respuesta.ok
            ||
            !datos.ok
        ) {

            throw new Error(
                datos.mensaje
                ||
                "No se pudo cargar el checkout."
            );

        }


        mostrarCliente(
            datos.cliente
        );


        mostrarDirecciones(
            datos.direcciones
        );


        actualizarTipoEntrega();
        actualizarAvisoPromocion();

    } catch (error) {

        console.error(
            "Error al cargar checkout:",
            error
        );


        contenedorCliente.innerHTML = `

            <p>
                No se pudieron cargar
                los datos del checkout.
            </p>

        `;

    }

}


// =========================================
// INICIAR
// =========================================

cargarCheckout();
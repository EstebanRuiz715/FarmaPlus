function formatearDinero(valor) {

    return Number(
        valor || 0
    ).toLocaleString(
        "es-AR",
        {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
        }
    );

}


function agregarDatoPedido(
    contenedor,
    etiqueta,
    valor
) {

    const parrafo =
        document.createElement("p");


    const fuerte =
        document.createElement("strong");


    fuerte.textContent =
        `${etiqueta}: `;


    const texto =
        document.createElement("span");


    texto.textContent =
        valor || "No informado";


    parrafo.appendChild(
        fuerte
    );

    parrafo.appendChild(
        texto
    );


    contenedor.appendChild(
        parrafo
    );

}


async function abrirDetallePedido(
    pedidoId
) {

    const modal =
        document.getElementById(
            "modal-pedido-admin"
        );

    const titulo =
        document.getElementById(
            "modal-pedido-titulo"
        );

    const estado =
        document.getElementById(
            "estado-detalle-pedido"
        );

    const contenido =
        document.getElementById(
            "contenido-detalle-pedido"
        );


    titulo.textContent =
        `Pedido #${pedidoId}`;


    estado.textContent =
        "Cargando pedido...";


    contenido.innerHTML = "";


    if (!modal.open) {

        modal.showModal();

    }


    try {

        const respuesta =
            await fetch(
                `/api/admin/pedidos/${pedidoId}`
            );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            estado.textContent =
                datos.mensaje
                || "No se pudo cargar el pedido.";

            return;

        }


        estado.textContent = "";


        const pedido =
            datos.pedido;


        // =====================================
        // CLIENTE
        // =====================================

        const cliente =
            document.createElement("section");


        const tituloCliente =
            document.createElement("h3");


        tituloCliente.textContent =
            "Cliente";


        cliente.appendChild(
            tituloCliente
        );


        agregarDatoPedido(
            cliente,
            "Nombre",
            pedido.nombre_cliente
        );

        agregarDatoPedido(
            cliente,
            "Email",
            pedido.email_cliente
        );

        agregarDatoPedido(
            cliente,
            "Teléfono",
            pedido.telefono_cliente
        );


        contenido.appendChild(
            cliente
        );


        // =====================================
        // ENTREGA
        // =====================================

        const entrega =
            document.createElement("section");


        const tituloEntrega =
            document.createElement("h3");


        tituloEntrega.textContent =
            "Entrega";


        entrega.appendChild(
            tituloEntrega
        );


        agregarDatoPedido(
            entrega,
            "Tipo",
            pedido.tipo_entrega === "retiro"
                ? "Retiro en sucursal"
                : "Envío a domicilio"
        );


        if (
            pedido.tipo_entrega ===
            "retiro"
        ) {

            agregarDatoPedido(
                entrega,
                "Punto de retiro",
                pedido.punto_retiro
            );

        } else {

            const direccion =
                [
                    [
                        pedido.direccion_calle,
                        pedido.direccion_numero
                    ]
                    .filter(Boolean)
                    .join(" "),

                    pedido.direccion_piso
                        ? `Piso ${pedido.direccion_piso}`
                        : "",

                    pedido.direccion_departamento
                        ? `Depto. ${pedido.direccion_departamento}`
                        : "",

                    pedido.direccion_localidad,

                    pedido.direccion_provincia,

                    pedido.direccion_codigo_postal
                        ? `CP ${pedido.direccion_codigo_postal}`
                        : ""
                ]
                .filter(Boolean)
                .join(", ");


            agregarDatoPedido(
                entrega,
                "Dirección",
                direccion
            );


            if (
                pedido.direccion_referencias
            ) {

                agregarDatoPedido(
                    entrega,
                    "Referencias",
                    pedido.direccion_referencias
                );

            }

        }


        contenido.appendChild(
            entrega
        );


        // =====================================
        // PAGO Y ESTADO
        // =====================================

        const pago =
            document.createElement("section");


        const tituloPago =
            document.createElement("h3");


        tituloPago.textContent =
            "Pago y estado";


        pago.appendChild(
            tituloPago
        );


        const nombresPago = {
            mercado_pago:
                "Mercado Pago",

            cuenta_dni:
                "Cuenta DNI",

            santander:
                "Santander",

            sucursal:
                "Pagar en sucursal"
        };


        agregarDatoPedido(
            pago,
            "Método de pago",
            nombresPago[
                pedido.metodo_pago
            ]
            || pedido.metodo_pago
        );

        agregarDatoPedido(
            pago,
            "Estado del pago",
            pedido.estado_pago
        );

        agregarDatoPedido(
            pago,
            "Estado del pedido",
            pedido.estado
        );


        contenido.appendChild(
            pago
        );


        // =====================================
        // PRODUCTOS
        // =====================================

        const productos =
            document.createElement("section");


        const tituloProductos =
            document.createElement("h3");


        tituloProductos.textContent =
            "Productos";


        productos.appendChild(
            tituloProductos
        );


        const lista =
            document.createElement("ul");


        for (
            const item
            of datos.items
        ) {

            const elemento =
                document.createElement("li");


            elemento.textContent =
                (
                    `${item.nombre_producto}`
                    +
                    ` — ${item.cantidad} x `
                    +
                    formatearDinero(
                        item.precio_unitario
                    )
                    +
                    ` = `
                    +
                    formatearDinero(
                        item.subtotal
                    )
                );


            lista.appendChild(
                elemento
            );

        }


        productos.appendChild(
            lista
        );


        contenido.appendChild(
            productos
        );


        // =====================================
        // TOTALES
        // =====================================

        const totales =
            document.createElement("section");


        const tituloTotales =
            document.createElement("h3");


        tituloTotales.textContent =
            "Resumen";


        totales.appendChild(
            tituloTotales
        );


        agregarDatoPedido(
            totales,
            "Subtotal",
            formatearDinero(
                pedido.subtotal
            )
        );

        agregarDatoPedido(
            totales,
            "Descuento",
            formatearDinero(
                pedido.descuento
            )
        );

        agregarDatoPedido(
            totales,
            "Envío",
            formatearDinero(
                pedido.costo_envio
            )
        );

        agregarDatoPedido(
            totales,
            "Total",
            formatearDinero(
                pedido.total
            )
        );


        contenido.appendChild(
            totales
        );


        // =====================================
        // INFORMACIÓN DEL PEDIDO
        // =====================================

        const informacion =
            document.createElement("section");


        const tituloInformacion =
            document.createElement("h3");


        tituloInformacion.textContent =
            "Información del pedido";


        informacion.appendChild(
            tituloInformacion
        );


        agregarDatoPedido(
            informacion,
            "Fecha",
            new Date(
                pedido.fecha_creacion
                    .replace(
                        " ",
                        "T"
                    )
            ).toLocaleString(
                "es-AR"
            )
        );


        contenido.appendChild(
            informacion
        );


    } catch (error) {

        console.error(
            "Error al cargar detalle:",
            error
        );


        estado.textContent =
            "Ocurrió un error al cargar el pedido.";

    }

}

async function cargarPedidosAdmin() {

    const estadoListado =
        document.getElementById(
            "estado-listado-pedidos"
        );

    const contenedorTabla =
        document.getElementById(
            "contenedor-tabla-pedidos"
        );

    const listaPedidos =
        document.getElementById(
            "lista-pedidos-admin"
        );


    try {

        const respuesta = await fetch(
            "/api/admin/pedidos"
        );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            estadoListado.textContent =
                datos.mensaje
                || "No se pudieron cargar los pedidos.";

            return;

        }


        listaPedidos.innerHTML = "";


        if (datos.pedidos.length === 0) {

            estadoListado.textContent =
                "Todavía no hay pedidos realizados.";

            return;

        }


        for (const pedido of datos.pedidos) {

            const fila =
                document.createElement("tr");


            const celdaPedido =
                document.createElement("td");

            celdaPedido.textContent =
                `#${pedido.id}`;


            const celdaCliente =
                document.createElement("td");

            celdaCliente.textContent =
                pedido.nombre_cliente;


            const celdaEntrega =
                document.createElement("td");

            celdaEntrega.textContent =
                pedido.tipo_entrega === "retiro"
                    ? "Retiro"
                    : "Envío";


            const celdaTotal =
                document.createElement("td");

            celdaTotal.textContent =
                Number(
                    pedido.total
                ).toLocaleString(
                    "es-AR",
                    {
                        style: "currency",
                        currency: "ARS",
                        maximumFractionDigits: 0
                    }
                );


            const celdaPago =
                document.createElement("td");

            celdaPago.textContent =
                pedido.estado_pago;


            const celdaEstado =
                document.createElement("td");

            celdaEstado.textContent =
                pedido.estado;


            const celdaFecha =
                document.createElement("td");


            const fecha =
                new Date(
                    pedido.fecha_creacion
                    .replace(
                        " ",
                        "T"
                    )
                );


            celdaFecha.textContent =
                fecha.toLocaleString(
                    "es-AR"
                );

                const celdaAcciones =
    document.createElement("td");


const botonVerPedido =
    document.createElement("button");


botonVerPedido.type =
    "button";


botonVerPedido.textContent =
    "Ver pedido";


botonVerPedido.addEventListener(
    "click",
    () => {

        abrirDetallePedido(
            pedido.id
        );

    }
);


celdaAcciones.appendChild(
    botonVerPedido
);

            fila.appendChild(
                celdaPedido
            );

            fila.appendChild(
                celdaCliente
            );

            fila.appendChild(
                celdaEntrega
            );

            fila.appendChild(
                celdaTotal
            );

            fila.appendChild(
                celdaPago
            );

            fila.appendChild(
                celdaEstado
            );

            fila.appendChild(
                celdaFecha
            );

            fila.appendChild(
    celdaAcciones
);

            listaPedidos.appendChild(
                fila
            );

        }


        estadoListado.textContent = "";

        contenedorTabla.hidden = false;


    } catch (error) {

        console.error(
            "Error al cargar pedidos:",
            error
        );


        estadoListado.textContent =
            "Ocurrió un error al cargar los pedidos.";

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarPedidosAdmin();


        const modal =
            document.getElementById(
                "modal-pedido-admin"
            );


        const botonCerrar =
            document.getElementById(
                "cerrar-modal-pedido"
            );


        botonCerrar.addEventListener(
            "click",
            () => {

                modal.close();

            }
        );


        modal.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target === modal
                ) {

                    modal.close();

                }

            }
        );

    }
);
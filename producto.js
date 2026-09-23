const productosData = {
    shampoo: {
        id: "shampoo",
        nombre: "Shampoo de Coco PureBliss",
        categoria: "Cuidado personal",
        precio: 5000,
        stock: "Disponible",
        imagenes: [
            "img/shampoo-coco-frente.png",
            "img/shampoo-coco-dorso.png"
        ],
        descripcionCorta: "Nutrición, suavidad y brillo para un cabello visiblemente más saludable.",
        descripcionLarga: `
El Shampoo de Coco PureBliss está especialmente formulado para limpiar, nutrir y fortalecer el cabello desde la raíz hasta las puntas. Su fórmula con extracto natural de coco ayuda a eliminar suavemente las impurezas mientras aporta hidratación, suavidad y un brillo saludable desde los primeros lavados.

Gracias a su fórmula de cuidado intensivo, PureBliss ayuda a mantener el equilibrio natural del cabello y mejora su manejabilidad sin dejar una sensación pesada. Además, está libre de parabenos añadidos y ha sido desarrollado para todo tipo de cabello, incluso para uso frecuente.

En estudios de percepción realizados por PureBliss Laboratories*, el 94% de los participantes afirmó sentir su cabello más suave después de 7 días de uso, mientras que el 89% observó un aumento visible del brillo y el 91% destacó una mayor sensación de hidratación.

Su fórmula cuenta con la certificación ficticia PureCare Natural Formula™, que garantiza el uso de ingredientes seleccionados bajo estándares internos de calidad, cuidado capilar y respeto por el cabello.

Además, PureBliss Shampoo de Coco ha sido dermatológicamente evaluado bajo el protocolo ficticio Dermatest Hair Care 2026™, demostrando una excelente tolerancia cosmética durante su uso regular.

Para obtener mejores resultados, aplicar sobre el cabello mojado, masajear suavemente el cuero cabelludo y distribuir la espuma hacia las puntas. Enjuagar con abundante agua y repetir si es necesario.

PureBliss Shampoo de Coco: nutrición, suavidad y brillo para un cabello visiblemente más saludable.
        `
    },

    protector: {
    id: "protector",
    nombre: "Protector solar",
    categoria: "Cuidado de la piel",
    precio: 12000,
    stock: "Disponible",
    imagenes: [
        "img/protector-solar-frente.png",
        "img/protector-solar-dorso.png"
    ],
    descripcionCorta: "Alta protección FPS 50 para todo tipo de piel.",
    descripcionLarga: `El Protector Solar PureBliss FPS 50 está formulado para brindar una alta protección frente a la radiación UVA y UVB, ayudando a cuidar la piel durante la exposición al sol. Su textura ligera y de rápida absorción permite una aplicación cómoda, sin dejar una sensación pesada sobre la piel.

Su fórmula está diseñada para todo tipo de piel y combina protección solar con ingredientes humectantes que ayudan a mantener la piel suave, hidratada y confortable durante el día. Además, es resistente al agua, lo que lo convierte en una excelente opción para actividades al aire libre, días de playa o uso cotidiano.

En estudios de percepción realizados por PureBliss Laboratories*, el 96% de los participantes afirmó sentir la piel protegida y confortable durante la exposición solar, mientras que el 93% destacó su rápida absorción y el 91% aseguró que no deja una sensación grasosa después de la aplicación.

Su fórmula cuenta con la certificación ficticia PureShield Sun Protection™, desarrollada bajo estándares internos de protección, cuidado e hidratación de la piel. También ha sido dermatológicamente evaluado bajo el protocolo ficticio Dermatest Solar Care 2026™, demostrando una excelente tolerancia cosmética durante su uso regular.

Para una correcta aplicación, distribuir una cantidad abundante y uniforme sobre la piel antes de la exposición al sol. Reaplicar periódicamente, especialmente después de nadar, sudar o secarse con una toalla.

PureBliss Protector Solar FPS 50: alta protección, hidratación y comodidad para disfrutar del sol cuidando tu piel.`
},

   alcohol: {
    id: "alcohol",
    nombre: "Alcohol en gel",
    categoria: "Higiene",
    precio: 3500,
    stock: "Disponible",
    imagenes: [
        "img/alcohol-gel-frente.png",
        "img/alcohol-gel-dorso.png"
    ],
    descripcionCorta: "Higiene práctica para todos los días.",
    descripcionLarga: `El Alcohol en Gel PureBliss está formulado para brindar limpieza e higiene diaria de manera práctica, rápida y efectiva, sin necesidad de enjuague. Su fórmula de secado rápido ayuda a eliminar el 99.9% de las bacterias*, dejando las manos limpias, frescas y protegidas en cualquier momento del día.

Enriquecido con aloe vera, ayuda a mantener la suavidad natural de la piel, evitando la sensación excesiva de resequedad que suelen dejar otros productos de higiene. Su textura ligera se absorbe con facilidad y permite una aplicación cómoda, ideal para el uso cotidiano en el hogar, el trabajo, la escuela o durante tus desplazamientos.

En estudios de percepción realizados por PureBliss Laboratories**, el 95% de los participantes afirmó sentir sus manos limpias y frescas inmediatamente después de su uso, mientras que el 92% destacó su secado rápido y el 89% manifestó una sensación de suavidad superior gracias a su fórmula con aloe vera.

Su fórmula cuenta con la certificación ficticia PureClean Defense Formula™, desarrollada bajo estándares internos de higiene, frescura y cuidado de la piel. Además, fue dermatológicamente evaluada bajo el protocolo ficticio Dermatest Hand Care 2026™, demostrando una excelente tolerancia cosmética en el uso frecuente.

Para un mejor resultado, aplicar una pequeña cantidad sobre las manos secas y frotar hasta su completa absorción. No requiere enjuague.

PureBliss Alcohol en Gel: higiene, frescura y protección práctica para el cuidado diario de tus manos.`
},

ibudol: {
    id: "ibudol",

    nombre: "IBUDOL Ibuprofeno 600 mg",

    categoria: "Medicamentos",

    precio: 7800,

    stock: "Disponible",

    imagenes: [
        "img/ibudol-frente.png",
        "img/ibudol-dorso.png"
    ],

    descripcionCorta:
        "Analgésico y antiinflamatorio de 600 mg.",

    descripcionLarga: `IBUDOL Ibuprofeno 600 mg es un analgésico y antiinflamatorio formulado para ayudar a aliviar dolores leves a moderados y reducir procesos inflamatorios que afectan el bienestar diario. Su acción está pensada para contribuir al alivio del dolor de cabeza, dolor muscular, dolor de espalda, dolor dental, molestias menstruales y otras afecciones inflamatorias comunes.

Gracias a su presentación de 600 mg, IBUDOL ofrece una alternativa eficaz para quienes buscan alivio y una mejor recuperación en su rutina cotidiana. Su fórmula está diseñada para brindar apoyo frente al dolor y la inflamación, ayudando también a mejorar la movilidad y la sensación de confort físico.

En estudios de percepción realizados por NovaSalud Research Institute*, el 94% de los participantes afirmó sentir alivio del dolor dentro de las primeras horas de uso, mientras que el 91% destacó una mejoría en la sensación de inflamación y el 89% manifestó una mayor comodidad en sus actividades diarias.

IBUDOL cuenta con la certificación ficticia NovaRelief Clinical Formula™, desarrollada bajo estándares internos de calidad, eficacia y seguridad farmacéutica. Además, fue evaluado bajo el protocolo ficticio Meditest Pain Relief 2026™, demostrando una excelente aceptación en su uso responsable.

Se recomienda utilizarlo siguiendo las indicaciones del envase o la recomendación de un profesional de la salud. No exceder la dosis diaria indicada y administrar preferentemente después de las comidas.

IBUDOL Ibuprofeno 600 mg: alivio, acción antiinflamatoria y bienestar para acompañarte cuando más lo necesitas.`
},

gripnova: {
    id: "gripnova",
    nombre: "GRIPNOVA Antigripal",
    categoria: "Medicamentos",
    precio: 9200,
    stock: "Disponible",
    imagenes: [
        "img/gripnova-frente.png",
        "img/gripnova-dorso.png"
    ],
    descripcionCorta: "Alivio multisíntoma para resfrío y gripe.",
    descripcionLarga: `
        GRIPNOVA Antigripal está formulado para ayudar a aliviar de manera integral los principales síntomas asociados al resfrío y la gripe, brindando una solución práctica para recuperar el bienestar y continuar con las actividades del día a día.

        Su fórmula multisíntoma ayuda a reducir la congestión nasal, la fiebre, el dolor de cabeza, el dolor de garganta, los dolores musculares y la sensación de malestar general. Gracias a la combinación de sus principios activos, GRIPNOVA actúa sobre distintos síntomas al mismo tiempo, ofreciendo un alivio completo y conveniente.

        En estudios de percepción realizados por VitaFarma Research*, el 93% de los participantes manifestó una mejora general de los síntomas durante las primeras horas de uso, mientras que el 90% destacó una reducción de la congestión nasal y el 88% afirmó sentir mayor bienestar para continuar con sus actividades cotidianas.

        GRIPNOVA cuenta con la certificación ficticia MultiRelief Formula™, desarrollada bajo estándares internos de calidad y eficacia para productos antigripales. Además, fue evaluado bajo el protocolo ficticio VitaFarma Cold & Flu Care 2026™, demostrando una excelente aceptación dentro de las condiciones de uso establecidas.

        Su presentación contiene 20 comprimidos recubiertos, pensados para una administración sencilla por vía oral. Se recomienda utilizar el producto siguiendo las indicaciones del envase y consultar a un profesional de la salud ante cualquier duda, persistencia de los síntomas o condición médica previa.

        GRIPNOVA Antigripal: alivio multisíntoma para que puedas respirar mejor y sentirte bien.
    `
},

nocteris: {
    id: "nocteris",
    nombre: "NOCTERIS Sueño",
    categoria: "Medicamentos",
    precio: 8600,
    stock: "Disponible",
    imagenes: [
        "img/nocteris-frente.png",
        "img/nocteris-dorso.png"
    ],
    descripcionCorta: "Ayuda suave para conciliar el sueño y disfrutar noches de descanso más reparadoras.",
    descripcionLarga: `NOCTERIS Sueño está formulado para ayudar a conciliar el sueño de manera suave, favoreciendo un descanso nocturno más reparador y una sensación de bienestar al despertar. Su propuesta está pensada para acompañar la rutina de descanso de quienes buscan noches más tranquilas y una mejor calidad de sueño.

Gracias a su fórmula de acción suave, NOCTERIS Sueño contribuye a relajar el cuerpo y promover el descanso nocturno sin perder su perfil de uso práctico. Además, está pensado para integrarse a la rutina de la noche, ayudando a crear un momento de calma antes de dormir.

En estudios de percepción realizados por SomnaVida Research Institute*, el 92% de los participantes afirmó sentir mayor facilidad para conciliar el sueño, mientras que el 89% destacó una mejor sensación de descanso al despertar y el 87% manifestó una percepción de rutina nocturna más tranquila y reconfortante.

NOCTERIS Sueño cuenta con la certificación ficticia NightBalance Formula™, desarrollada bajo estándares internos de calidad, bienestar nocturno y descanso progresivo. Además, fue evaluado bajo el protocolo ficticio SomnaVida Sleep Care 2026™, demostrando una excelente aceptación en condiciones de uso regular.

Su presentación contiene 20 comprimidos recubiertos y está diseñada para una administración práctica por vía oral. Se recomienda utilizar el producto siguiendo las indicaciones del envase y acompañarlo con una rutina de descanso adecuada para potenciar la sensación de bienestar nocturno.

NOCTERIS Sueño: ayuda suave para conciliar el sueño y disfrutar noches de descanso más reparadoras.`

},

"crema-manos": {
    id: "crema-manos",
    nombre: "Crema para Manos PureBliss",
    categoria: "Piel",
    precio: 4800,
    stock: "Disponible",
    imagenes: [
        "img/crema-manos-frente.png",
        "img/crema-manos-dorso.png"
    ],
    descripcionCorta: "Hidratación, suavidad y nutrición para el cuidado diario de tus manos.",
    descripcionLarga: `La Crema para Manos PureBliss está formulada para brindar hidratación, suavidad y cuidado diario, ayudando a mantener la piel de las manos nutrida y protegida frente a la resequedad. Su textura ligera y agradable se absorbe fácilmente, dejando una sensación confortable sin efecto graso.

Enriquecida con manteca de karité y aloe vera, su fórmula contribuye a nutrir profundamente la piel, aportando suavidad y ayudando a mejorar su aspecto y elasticidad. Es ideal para el uso diario, especialmente en manos expuestas al frío, al lavado frecuente o a factores externos que puedan provocar sequedad.

En estudios de percepción realizados por PureBliss Laboratories*, el 94% de los participantes afirmó sentir sus manos más suaves desde las primeras aplicaciones, mientras que el 91% destacó una mejora en la hidratación y el 89% señaló una sensación de confort prolongado durante el día.

Su fórmula cuenta con la certificación ficticia PureSoft Hand Care™, desarrollada bajo estándares internos de hidratación, suavidad y cuidado cosmético. Además, fue dermatológicamente evaluada bajo el protocolo ficticio Dermatest Skin Comfort 2026™, demostrando una excelente tolerancia cosmética para el uso frecuente.

Para obtener mejores resultados, aplicar una pequeña cantidad sobre las manos limpias y masajear hasta su completa absorción. Repetir durante el día según sea necesario, especialmente después del lavado de manos o cuando la piel requiera hidratación adicional.

PureBliss Crema para Manos: hidratación, suavidad y nutrición para el cuidado diario de tus manos.`
},

"jabon-lunabella": {
    id: "jabon-lunabella",
    nombre: "Lunabella Jabón de Tocador",
    categoria: "Higiene",
    precio: 2300,
    stock: "Disponible",

    imagenes: [
        "img/jabon-lunabella-frente.png",
        "img/jabon-lunabella-dorso.png"
    ],

    descripcionCorta:
        "Limpieza, suavidad e hidratación para cuidar tu piel todos los días.",

    descripcionLarga: `El Jabón de Tocador Lunabella está formulado para limpiar la piel de manera suave y delicada, ayudando a mantener su hidratación natural y dejándola con una agradable sensación de frescura y suavidad después de cada uso.

Su fórmula con leche de almendras y vitamina E ayuda a nutrir la piel y conservar su aspecto saludable, mientras que su aroma delicado transforma la higiene diaria en una experiencia más agradable y reconfortante. Es ideal para el uso cotidiano y apto para todo tipo de piel.

En estudios de percepción realizados por BellaCare Research*, el 94% de los participantes afirmó sentir su piel más suave luego del uso, mientras que el 91% destacó una mejor sensación de hidratación y el 89% valoró positivamente su aroma suave y duradero.

Lunabella cuenta con la certificación ficticia SoftSkin Care Formula™, desarrollada bajo estándares internos de limpieza, suavidad e hidratación. Además, fue dermatológicamente evaluado bajo el protocolo ficticio BellaCare Skin Comfort 2026™, demostrando una excelente tolerancia cosmética para el uso diario.

Para utilizarlo, humedecer el jabón y frotarlo suavemente sobre la piel hasta formar espuma. Enjuagar con abundante agua. Puede utilizarse diariamente como parte de la rutina habitual de higiene.

Lunabella Jabón de Tocador: limpieza, suavidad e hidratación para cuidar tu piel todos los días.`
},

"dentiva-cepillo": {
    id: "dentiva-cepillo",
    nombre: "Dentiva Cepillo Dental",
    categoria: "Higiene",
    precio: 1900,
    stock: "Disponible",

    imagenes: [
        "img/cepillo-dental-frente.png",
        "img/cepillo-dental-dorso.png"
    ],

    descripcionCorta:
        "Limpieza profunda, cerdas suaves y cuidado diario para una sonrisa más limpia y saludable.",

    descripcionLarga: `El Cepillo Dental Dentiva está diseñado para brindar una limpieza efectiva y delicada en cada cepillado, ayudando a remover la placa bacteriana y los restos de alimentos mientras cuida dientes y encías.

Sus cerdas suaves permiten alcanzar zonas de difícil acceso sin generar una sensación agresiva durante el cepillado. Su diseño ergonómico ofrece un agarre cómodo y mayor control de los movimientos, facilitando una higiene bucal completa como parte de la rutina diaria.

En estudios de percepción realizados por Dentiva Oral Care Research*, el 95% de los participantes afirmó sentir una limpieza más completa después del cepillado, mientras que el 92% destacó la suavidad de las cerdas y el 90% valoró positivamente la comodidad del mango durante el uso.

Dentiva cuenta con la certificación ficticia SoftClean Bristle Technology™, desarrollada bajo estándares internos de limpieza, comodidad y cuidado de las encías. Además, fue evaluado bajo el protocolo ficticio Dentiva Oral Comfort 2026™, demostrando una excelente aceptación para el uso diario.

Para una correcta higiene bucal, se recomienda cepillar los dientes al menos dos veces al día durante aproximadamente dos minutos, utilizando movimientos suaves y circulares. Para mantener un buen rendimiento, se aconseja reemplazar el cepillo cada tres meses o antes si las cerdas presentan desgaste.

Dentiva Cepillo Dental: limpieza profunda, cerdas suaves y cuidado diario para una sonrisa más limpia y saludable.`
},

"limpiador-facial": {
    id: "limpiador-facial",
    nombre: "Veluna Limpiador Facial",
    categoria: "Piel",
    precio: 13500,
    stock: "Disponible",
    imagenes: [
        "img/veluna-limpiador-frente.png",
        "img/veluna-limpiador-dorso.png"
    ],
    descripcionCorta: "Limpieza suave, frescura e hidratación para cuidar tu piel todos los días.",
    descripcionLarga: `Veluna Limpiador Facial está formulado para remover suavemente impurezas, exceso de grasa y restos de maquillaje, ayudando a dejar la piel limpia, fresca y confortable después de cada uso.

Su fórmula con ácido hialurónico y pepino contribuye a mantener la hidratación natural de la piel mientras aporta una agradable sensación de frescura. Su textura ligera lo hace ideal para incorporar a la rutina diaria de cuidado facial, tanto por la mañana como por la noche.

En estudios de percepción realizados por Veluna Skin Research*, el 94% de los participantes afirmó sentir su piel más limpia después del uso, mientras que el 91% destacó una mayor sensación de frescura y el 89% manifestó sentir la piel suave y confortable.

Para utilizarlo, aplicar una pequeña cantidad sobre el rostro húmedo, masajear suavemente con movimientos circulares y enjuagar con abundante agua.

Veluna Limpiador Facial: limpieza suave, frescura e hidratación para cuidar tu piel todos los días.`
},

"aireva-desodorante": {
    id: "aireva-desodorante",
    nombre: "Aireva Desodorante Antitranspirante",
    categoria: "Cuidado personal",
    precio: 2800,
    stock: "Disponible",

    imagenes: [
        "img/aireva-frente.png",
        "img/aireva-dorso.png"
    ],

    descripcionCorta: "Protección y frescura diaria con aloe vera y vitamina E.",

    descripcionLarga: `Aireva Desodorante Antitranspirante está formulado para brindar protección y frescura durante todo el día, ayudando a controlar el mal olor y la transpiración por hasta 48 horas.

Su fórmula con aloe vera y vitamina E ayuda a cuidar la piel de las axilas, dejando una sensación fresca, suave y confortable después de cada aplicación.

Su secado rápido y aroma ligero lo convierten en una opción ideal para el uso diario.

Aireva: frescura y protección para acompañarte todos los días.`
},

"suavetip-cotonetes": {
    id: "suavetip-cotonetes",
    nombre: "SuaveTip Cotonetes",
    categoria: "Cuidado personal",
    precio: 3100,
    stock: "Disponible",
    imagenes: [
        "img/suavetip-frente.png",
        "img/suavetip-dorso.png"
    ],
    descripcionCorta: "Puntas suaves de algodón para higiene diaria y uso cosmético.",
    descripcionLarga: `Los Cotonetes SuaveTip están elaborados con puntas suaves de algodón, ideales para la higiene diaria y el uso cosmético.

Su diseño práctico permite utilizarlos para retoques de maquillaje, limpieza de zonas externas y pequeños cuidados personales con mayor precisión y suavidad.

Presentación de 200 unidades.

SuaveTip: cuidado y suavidad en cada detalle.`
},

};



// =========================
// LEER PRODUCTO DE LA URL
// =========================

const parametros =
    new URLSearchParams(
        window.location.search
    );


const idProducto =
    parametros.get("id");


const idProductoBaseDatos =
    parametros.get("db");


let producto =
    productosData[idProducto] || null;

// =========================================
// PRECIOS Y OFERTAS
// =========================================

function productoTieneOfertaDetalle(
    productoActual
) {

    const precioNormal =
        Number(
            productoActual.precioNormal
            ??
            productoActual.precio
        );


    const precioOferta =
        Number(
            productoActual.precioOferta
            ??
            productoActual.precio_oferta
        );


    const enOferta =
        productoActual.enOferta === true
        ||
        Number(
            productoActual.en_oferta
        ) === 1;


    return (
        enOferta
        &&
        precioNormal > 0
        &&
        precioOferta > 0
        &&
        precioOferta < precioNormal
    );

}


function obtenerPrecioVentaDetalle(
    productoActual
) {

    if (
        productoTieneOfertaDetalle(
            productoActual
        )
    ) {

        return Number(
            productoActual.precioOferta
            ??
            productoActual.precio_oferta
        );

    }


    return Number(
        productoActual.precioNormal
        ??
        productoActual.precio
    );

}


function obtenerPorcentajeOfertaDetalle(
    productoActual
) {

    const porcentaje =
        Number(
            productoActual.descuentoPorcentaje
            ??
            productoActual.descuento_porcentaje
        );


    if (
        porcentaje >= 1
        &&
        porcentaje <= 99
    ) {

        return porcentaje;

    }


    if (
        productoTieneOfertaDetalle(
            productoActual
        )
    ) {

        const precioNormal =
            Number(
                productoActual.precioNormal
                ??
                productoActual.precio
            );


        const precioOferta =
            obtenerPrecioVentaDetalle(
                productoActual
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

// =========================
// MOSTRAR DATOS BÁSICOS
// =========================

function mostrarDatosBasicosProducto(
    productoActual
) {

    document.getElementById(
        "nombre-producto"
    ).textContent =
        productoActual.nombre;


    document.getElementById(
        "categoria-producto"
    ).textContent =
        productoActual.categoria;


    // =========================================
    // PRECIO / OFERTA
    // =========================================

    const elementoPrecio =
        document.getElementById(
            "precio-producto"
        );


    const tieneOferta =
        productoTieneOfertaDetalle(
            productoActual
        );


    if (tieneOferta) {

        const precioNormal =
            Number(
                productoActual.precioNormal
                ??
                productoActual.precio
            );


        const precioOferta =
            obtenerPrecioVentaDetalle(
                productoActual
            );


        const porcentaje =
            obtenerPorcentajeOfertaDetalle(
                productoActual
            );


        elementoPrecio.innerHTML = `

            <span class="detalle-oferta-etiqueta">
                ${porcentaje}% OFF
            </span>

            <span class="detalle-precios-oferta">

                <span class="detalle-precio-normal">
                    $${precioNormal.toLocaleString("es-AR")}
                </span>

                <span class="detalle-precio-oferta">
                    $${precioOferta.toLocaleString("es-AR")}
                </span>

            </span>

        `;

    } else {

        elementoPrecio.textContent =
            "$"
            +
            Number(
                productoActual.precioNormal
                ??
                productoActual.precio
            ).toLocaleString(
                "es-AR"
            );

    }


    // =========================================
    // DISPONIBILIDAD
    // =========================================

    const estadoProducto =
        document.getElementById(
            "estado-producto"
        );


    const descripcionDisponibilidad =
        document.getElementById(
            "descripcion-disponibilidad"
        );


    const botonAgregar =
        document.getElementById(
            "agregar-detalle"
        );


    const botonSumar =
        document.getElementById(
            "sumar-detalle"
        );


    const botonRestar =
        document.getElementById(
            "restar-detalle"
        );


        const stockNumerico =
        Number(
            productoActual.stock
        );


    const tieneStockNumerico =
        Number.isFinite(
            stockNumerico
        );


    const estaAgotado =
        tieneStockNumerico
            ? stockNumerico <= 0
            : productoActual.stock ===
                "Agotado";


    if (estaAgotado) {

        estadoProducto.textContent =
            "● Agotado";


        estadoProducto.classList.add(
            "detalle-agotado"
        );


        descripcionDisponibilidad.textContent =
            "Este producto se encuentra agotado temporalmente.";


        botonAgregar.disabled =
            true;


        botonAgregar.textContent =
            "Producto agotado";


        botonSumar.disabled =
            true;


        botonRestar.disabled =
            true;

    } else {

        estadoProducto.textContent =
            "● Disponible";


        estadoProducto.classList.remove(
            "detalle-agotado"
        );


        descripcionDisponibilidad.textContent =
            "Producto disponible para retiro en FarmaPlus Burzaco.";


        botonAgregar.disabled =
            false;


        botonAgregar.textContent =
            "🛒 Agregar al carrito";


        botonSumar.disabled =
            false;


        botonRestar.disabled =
            false;

    }


    const migaProducto =
        document.getElementById(
            "miga-producto"
        );


    if (migaProducto) {

        migaProducto.textContent =
            productoActual.nombre;

    }


    document.title =
        productoActual.nombre
        +
        " - FarmaPlus";

}

if (producto) {

    mostrarDatosBasicosProducto(
        producto
    );


    // =========================
    // GALERÍA DE IMÁGENES
    // =========================

    const imagenPrincipal =
        document.getElementById("imagen-principal");

    const miniaturas =
        document.getElementById("miniaturas-producto");


    imagenPrincipal.src =
        producto.imagenes[0];

    imagenPrincipal.alt =
        producto.nombre;


    miniaturas.innerHTML = "";


    producto.imagenes.forEach(function(imagen, indice) {

        const miniatura =
            document.createElement("img");

        miniatura.src =
            imagen;

        miniatura.alt =
            producto.nombre + " - imagen " + (indice + 1);

        miniatura.classList.add("miniatura");


        if (indice === 0) {

            miniatura.classList.add("activa");

        }


        miniatura.addEventListener("click", function() {

    imagenPrincipal.src =
        imagen;

    ventanaZoom.style.backgroundImage =
        `url("${imagenPrincipal.src}")`;


    document
        .querySelectorAll(".miniatura")
        .forEach(function(imagenMiniatura) {

            imagenMiniatura.classList.remove("activa");

        });


    miniatura.classList.add("activa");

});


        miniaturas.appendChild(miniatura);

    });

 // =========================
// DESCRIPCIÓN DEL PRODUCTO
// =========================

const descripcionProducto =
    document.getElementById("descripcion-producto-texto");

if (descripcionProducto && producto.descripcionLarga) {

    descripcionProducto.innerHTML = "";

    const parrafos =
        producto.descripcionLarga
            .trim()
            .split("\n\n");


    parrafos.forEach(function(texto) {

        const parrafo =
            document.createElement("p");

        parrafo.textContent =
            texto.trim();

        descripcionProducto.appendChild(parrafo);

    });

}

}

// =========================================
// PRODUCTO DESDE LA BASE DE DATOS
// =========================================

async function cargarProductoBaseDatos() {

    if (!idProductoBaseDatos) {
        return;
    }


    try {

        const respuesta =
            await fetch(
                "/api/productos/" +
                idProductoBaseDatos
            );


        const resultado =
            await respuesta.json();


        if (
            !respuesta.ok ||
            !resultado.ok
        ) {

            console.error(
                "Producto no encontrado."
            );

            return;
        }


const datos =
    resultado.producto;


const imagenes = [];


if (datos.imagen_frente) {

    imagenes.push(
        "/" + datos.imagen_frente
    );

}


if (datos.imagen_dorso) {

    imagenes.push(
        "/" + datos.imagen_dorso
    );

}


// =========================
// CREAR PRODUCTO
// =========================

producto = {

    id:
        datos.id,

    nombre:
        datos.nombre,

    categoria:
        datos.categoria,

    precio:
        Number(
            datos.precio
        ),

    precioNormal:
        Number(
            datos.precio
        ),

    enOferta:
        Number(
            datos.en_oferta
        ) === 1,

    descuentoPorcentaje:
        Number(
            datos.descuento_porcentaje
        ) || 0,

    precioOferta:
        (
            datos.precio_oferta !== null
            &&
            datos.precio_oferta !== undefined
        )
            ? Number(
                datos.precio_oferta
            )
            : null,

        stock:
        Number(
            datos.stock
        ) || 0,

    estado:
        datos.estado,

    imagenes:
        imagenes,

    descripcionCorta:
        datos.descripcion_corta || "",

    descripcionLarga:
        datos.descripcion_larga || ""

};


mostrarDatosBasicosProducto(
    producto
);


// DESCRIPCIÓN

        document.getElementById(
            "descripcion-producto-texto"
        ).textContent =
            producto.descripcionLarga ||
            producto.descripcionCorta;

        // IMAGEN PRINCIPAL

        const imagenPrincipal =
            document.getElementById(
                "imagen-principal"
            );


        if (producto.imagenes.length > 0) {

            imagenPrincipal.src =
                producto.imagenes[0];

            imagenPrincipal.alt =
                producto.nombre;

        }


        // MINIATURAS

        const miniaturas =
            document.getElementById(
                "miniaturas-producto"
            );


        miniaturas.innerHTML = "";


producto.imagenes.forEach(
    function(rutaImagen, indice) {

        const miniatura =
            document.createElement(
                "img"
            );


        miniatura.src =
            rutaImagen;


        miniatura.alt =
            producto.nombre;


        miniatura.classList.add(
            "miniatura-producto-db"
        );


        if (indice === 0) {

            miniatura.classList.add(
                "activa"
            );

        }


        miniatura.addEventListener(
            "click",
            function() {

                imagenPrincipal.src =
                    rutaImagen;


                const todasMiniaturas =
                    miniaturas.querySelectorAll(
                        ".miniatura-producto-db"
                    );


                todasMiniaturas.forEach(
                    function(imagen) {

                        imagen.classList.remove(
                            "activa"
                        );

                    }
                );


                miniatura.classList.add(
                    "activa"
                );

            }
        );


        miniaturas.appendChild(
            miniatura
        );

    }
);


    } catch (error) {

        console.error(
            "Error al cargar el producto:",
            error
        );

    }

}


cargarProductoBaseDatos();

// =========================
// CANTIDAD DEL PRODUCTO
// =========================

let cantidadDetalle = 1;


const mostrarCantidad =
    document.getElementById(
        "cantidad-detalle"
    );


const botonSumar =
    document.getElementById(
        "sumar-detalle"
    );


const botonRestar =
    document.getElementById(
        "restar-detalle"
    );


// =========================
// OBTENER STOCK NUMÉRICO
// =========================

function obtenerStockNumericoDetalle() {

    if (!producto) {

        return null;

    }


    const stock =
        Number(
            producto.stock
        );


    if (!Number.isFinite(stock)) {

        return null;

    }


    return Math.max(
        0,
        Math.floor(stock)
    );

}


// =========================
// CANTIDAD YA EN EL CARRITO
// =========================

function obtenerCantidadEnCarritoActual() {

    if (!producto) {

        return 0;

    }


    const carrito =
        obtenerCarrito();


    const idNumerico =
        Number(
            producto.id
        );


    const tieneIdBaseDatos =
        Number.isInteger(
            idNumerico
        );


    const productoExistente =
        carrito.find(
            function(item) {

                const mismoId =
                    tieneIdBaseDatos
                    &&
                    item.producto_id
                    &&
                    Number(
                        item.producto_id
                    ) ===
                    idNumerico;


                const mismoNombre =
                    item.nombre ===
                    producto.nombre;


                return (
                    mismoId
                    ||
                    mismoNombre
                );

            }
        );


    if (!productoExistente) {

        return 0;

    }


    return (
        Number(
            productoExistente.cantidad
        ) || 0
    );

}


// =========================
// ACTUALIZAR CANTIDAD
// =========================

function actualizarCantidadDetalle() {

    mostrarCantidad.textContent =
        cantidadDetalle;

    actualizarBotonSumarDetalle();

}


// =========================
// SUMAR
// =========================

botonSumar.addEventListener(
    "click",
    function() {

        const stock =
            obtenerStockNumericoDetalle();


        if (stock !== null) {

            const cantidadEnCarrito =
                obtenerCantidadEnCarritoActual();


            const disponiblesParaAgregar =
                Math.max(
                    0,
                    stock - cantidadEnCarrito
                );


            if (
                cantidadDetalle >=
                disponiblesParaAgregar
            ) {

                return;

            }

        }


        cantidadDetalle++;


        actualizarCantidadDetalle();

    }
);


// =========================
// RESTAR
// =========================

botonRestar.addEventListener(
    "click",
    function() {

        if (cantidadDetalle <= 1) {

            return;

        }


        cantidadDetalle--;


        actualizarCantidadDetalle();

    }
);


// =========================
// CARRITO GUARDADO
// =========================

const CLAVE_CARRITO =
    "carritoFarmaPlus";


function obtenerCarrito() {

    return (
        JSON.parse(
            localStorage.getItem(
                CLAVE_CARRITO
            )
        ) || []
    );

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carrito)
    );

}


// =========================
// CONTADOR DEL CARRITO
// =========================

const contadorCarritoDetalle =
    document.getElementById(
        "contador-carrito-detalle"
    );


let contadorDetalleInicializado =
    false;

function actualizarBotonSumarDetalle() {

    if (!producto) {
        return;
    }


    const stock =
        Number(
            producto.stock
        );


    if (!Number.isFinite(stock)) {

        botonSumar.textContent =
            "+";

        botonSumar.classList.remove(
            "boton-maximo"
        );

        botonSumar.disabled =
            false;

        return;

    }


    const cantidadEnCarrito =
        obtenerCantidadEnCarritoActual();


    const disponibles =
        Math.max(
            0,
            stock - cantidadEnCarrito
        );


    const llegoAlMaximo =
        disponibles <= 0
        ||
        cantidadDetalle >= disponibles;


    if (llegoAlMaximo) {

        botonSumar.textContent =
            "Max";

        botonSumar.classList.add(
            "boton-maximo"
        );

        botonSumar.disabled =
            true;

    } else {

        botonSumar.textContent =
            "+";

        botonSumar.classList.remove(
            "boton-maximo"
        );

        botonSumar.disabled =
            false;

    }

}

function actualizarContadorDetalle() {

    const carrito =
        obtenerCarrito();


    const cantidadTotal =
        carrito.reduce(
            function(total, item) {

                return total + item.cantidad;

            },
            0
        );


    const cantidadAnterior =
        Number(
            contadorCarritoDetalle.textContent
        );


    contadorCarritoDetalle.textContent =
        cantidadTotal;


    // =========================
    // MOSTRAR / OCULTAR BADGE
    // =========================

    if (cantidadTotal === 0) {

        contadorCarritoDetalle.style.display =
            "none";

    } else {

        contadorCarritoDetalle.style.display =
            "flex";

    }


    // =========================
    // VIBRACIÓN 0 → 1
    // =========================

    if (
        contadorDetalleInicializado &&
        cantidadAnterior === 0 &&
        cantidadTotal === 1
    ) {

        contadorCarritoDetalle.classList.remove(
            "vibrando"
        );


        void contadorCarritoDetalle.offsetWidth;


        contadorCarritoDetalle.classList.add(
            "vibrando"
        );

    }


    contadorDetalleInicializado =
        true;

}


// =========================
// AGREGAR AL CARRITO
// =========================

const botonAgregarDetalle =
    document.getElementById(
        "agregar-detalle"
    );


botonAgregarDetalle.addEventListener(
    "click",
    function() {

        if (!producto) {

            return;

        }


        const stockTotal =
            obtenerStockNumericoDetalle();


        if (
            stockTotal !== null
            &&
            stockTotal <= 0
        ) {

            return;

        }


        const carrito =
            obtenerCarrito();


        const precioVenta =
            obtenerPrecioVentaDetalle(
                producto
            );


        const idNumerico =
            Number(
                producto.id
            );


        const tieneIdBaseDatos =
            Number.isInteger(
                idNumerico
            );


        const productoExistente =
            carrito.find(
                function(item) {

                    const mismoId =
                        tieneIdBaseDatos
                        &&
                        item.producto_id
                        &&
                        Number(
                            item.producto_id
                        ) ===
                        idNumerico;


                    const mismoNombre =
                        item.nombre ===
                        producto.nombre;


                    return (
                        mismoId
                        ||
                        mismoNombre
                    );

                }
            );


        const imagenProducto =
            producto.imagenes?.[0]
            || "";


        let cantidadAgregar =
            cantidadDetalle;


        // =========================
        // CONTROLAR STOCK
        // =========================

        if (stockTotal !== null) {

            const cantidadActual =
                productoExistente
                    ? (
                        Number(
                            productoExistente.cantidad
                        ) || 0
                    )
                    : 0;


            const stockRestante =
                stockTotal -
                cantidadActual;


            if (stockRestante <= 0) {

                botonAgregarDetalle.textContent =
                    "Stock máximo alcanzado";


                setTimeout(
                    function() {

                        botonAgregarDetalle.textContent =
                            "🛒 Agregar al carrito";

                    },
                    1400
                );


                return;

            }


            cantidadAgregar =
                Math.min(
                    cantidadDetalle,
                    stockRestante
                );

        }


        // =========================
        // ACTUALIZAR CARRITO
        // =========================

        if (productoExistente) {

            productoExistente.cantidad +=
                cantidadAgregar;


            productoExistente.precio =
                precioVenta;


            productoExistente.stock =
                stockTotal;


            if (tieneIdBaseDatos) {

                productoExistente.producto_id =
                    idNumerico;

            }


            if (imagenProducto) {

                productoExistente.imagen =
                    imagenProducto;

            }

        } else {

            carrito.push({

                producto_id:
                    tieneIdBaseDatos
                        ? idNumerico
                        : null,

                nombre:
                    producto.nombre,

                precio:
                    precioVenta,

                cantidad:
                    cantidadAgregar,

                stock:
                    stockTotal,

                imagen:
                    imagenProducto

            });

        }


        guardarCarrito(
            carrito
        );


        actualizarPanelCarritoDetalle();


        cantidadDetalle = 1;


        actualizarCantidadDetalle();


        botonAgregarDetalle.textContent =
            "✓ Agregado al carrito";


        setTimeout(
            function() {

                botonAgregarDetalle.textContent =
                    "🛒 Agregar al carrito";

            },
            1200
        );

    }
);


// =========================
// SINCRONIZAR CARRITO
// CON BASE DE DATOS
// =========================

async function sincronizarCarritoDetalle() {

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
                "No se pudo sincronizar el carrito."
            );

            actualizarContadorDetalle();

            return;

        }


        const carrito =
            obtenerCarrito();


        const carritoSincronizado = [];


        carrito.forEach(
            function(item) {

                const imagenItem =
                    String(
                        item.imagen || ""
                    )
                        .replace(/^\/+/, "")
                        .toLowerCase();


                const productoActual =
                    resultado.productos.find(
                        function(producto) {

                            const imagenProducto =
                                String(
                                    producto.imagen_frente || ""
                                )
                                    .replace(/^\/+/, "")
                                    .toLowerCase();


                            const mismoId =
                                item.producto_id &&
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
                                imagenItem &&
                                imagenProducto &&
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


                let imagenActualizada =
                    productoActual.imagen_frente || "";


                if (
                    imagenActualizada &&
                    !imagenActualizada.startsWith("/")
                ) {

                    imagenActualizada =
                        "/" + imagenActualizada;

                }


                carritoSincronizado.push({

                    producto_id:
                        productoActual.id,

                    nombre:
                        productoActual.nombre,

                    precio:
                         obtenerPrecioVentaDetalle(
                             productoActual
                         ),

                                        cantidad:
                        cantidadAjustada,

                    stock:
                        stockActual,

                    imagen:
                        imagenActualizada

                });

            }
        );


        guardarCarrito(
            carritoSincronizado
        );


        actualizarContadorDetalle();

        actualizarPanelCarritoDetalle();


    } catch (error) {

        console.error(
            "Error al sincronizar carrito:",
            error
        );


        actualizarContadorDetalle();

    }

}


// =========================
// CARGAR CARRITO AL ENTRAR
// =========================

sincronizarCarritoDetalle();

// =========================
// PANEL LATERAL DEL CARRITO
// =========================

const enlaceCarritoDetalle =
    document.getElementById("carrito-detalle");

const panelCarritoDetalle =
    document.getElementById("panel-carrito-detalle");

const cerrarCarritoDetalle =
    document.getElementById("cerrar-carrito-detalle");

const listaCarritoDetalle =
    document.getElementById("lista-carrito-detalle");

const totalCarritoDetalle =
    document.getElementById("total-carrito-detalle");


// ABRIR CARRITO

enlaceCarritoDetalle.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();

        actualizarPanelCarritoDetalle();

        panelCarritoDetalle.classList.remove("oculto");

    }
);


// CERRAR CARRITO

cerrarCarritoDetalle.addEventListener(
    "click",
    function() {

        panelCarritoDetalle.classList.add("oculto");

    }
);


function actualizarPanelCarritoDetalle() {

    const carrito =
        obtenerCarrito();


    listaCarritoDetalle.innerHTML = "";


    let total = 0;


    carrito.forEach(function(item, indice) {

        const subtotal =
            item.precio * item.cantidad;


        const elemento =
            document.createElement("div");

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

        elemento.classList.add("item-carrito");

const imagenProducto =
    item.imagen || "";

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

            <button onclick="restarCantidadDetalle(${indice})">
                -
            </button>

            <span>
                ${item.cantidad}
            </span>

            <button
    onclick="sumarCantidadDetalle(${indice})"
    class="${llegoAlMaximo ? "boton-maximo" : ""}"
    ${llegoAlMaximo ? "disabled" : ""}
>
    ${llegoAlMaximo ? "Max" : "+"}
</button>

        </div>


        <button
            class="boton-eliminar-carrito"
            onclick="eliminarProductoDetalle(${indice})"
        >
            Eliminar
        </button>

    </div>


    <div class="subtotal">
        $${subtotal.toLocaleString("es-AR")}
    </div>

`;


        listaCarritoDetalle.appendChild(elemento);


        total += subtotal;

    });


    if (carrito.length === 0) {

        listaCarritoDetalle.innerHTML =
            "<p>Tu carrito está vacío.</p>";

    }

const botonFinalizarCompraDetalle =
    document.getElementById(
        "finalizar-compra-detalle"
    );


if (carrito.length === 0) {

    botonFinalizarCompraDetalle.disabled = true;

    botonFinalizarCompraDetalle.textContent =
        "Carrito vacío";

} else {

    botonFinalizarCompraDetalle.disabled = false;

    botonFinalizarCompraDetalle.textContent =
        "Finalizar compra";

}    

        totalCarritoDetalle.textContent =
        total.toLocaleString("es-AR");


    actualizarContadorDetalle();


    actualizarBotonSumarDetalle();

}

// =========================
// MODIFICAR CARRITO
// =========================

function guardarYActualizarCarritoDetalle(carrito) {

    guardarCarrito(carrito);

    actualizarPanelCarritoDetalle();

}


function sumarCantidadDetalle(indice) {

    const carrito =
        obtenerCarrito();


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
        Number.isFinite(stock);


    if (
        tieneStock
        &&
        item.cantidad >= stock
    ) {

        return;

    }


    item.cantidad++;


    guardarYActualizarCarritoDetalle(
        carrito
    );

}


function restarCantidadDetalle(indice) {

    const carrito =
        obtenerCarrito();


    carrito[indice].cantidad--;


    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }


    guardarYActualizarCarritoDetalle(
        carrito
    );

}


function eliminarProductoDetalle(indice) {

    const carrito =
        obtenerCarrito();


    carrito.splice(indice, 1);


    guardarYActualizarCarritoDetalle(
        carrito
    );

}

const finalizarCompraDetalle =
    document.getElementById(
        "finalizar-compra-detalle"
    );


finalizarCompraDetalle.addEventListener(
    "click",
    function() {

        window.location.href =
            "/checkout.html";

    }
);

// =========================
// ZOOM DE IMAGEN DEL PRODUCTO
// =========================

const imagenZoom =
    document.getElementById("imagen-principal");

const contenedorZoom =
    document.querySelector(".zoom-contenedor");

const lupaZoom =
    document.getElementById("lupa-zoom");

const ventanaZoom =
    document.getElementById("zoom-producto");


if (
    imagenZoom &&
    contenedorZoom &&
    lupaZoom &&
    ventanaZoom
) {

    contenedorZoom.addEventListener("mouseenter", function() {

        lupaZoom.style.display = "block";

        ventanaZoom.style.display = "block";

        ventanaZoom.style.backgroundImage =
            `url("${imagenZoom.src}")`;

        ventanaZoom.style.backgroundSize =
            "200%";

    });


    contenedorZoom.addEventListener("mouseleave", function() {

        lupaZoom.style.display = "none";

        ventanaZoom.style.display = "none";

    });


    contenedorZoom.addEventListener("mousemove", function(evento) {

        const rectangulo =
            contenedorZoom.getBoundingClientRect();


        let x =
            evento.clientX - rectangulo.left;

        let y =
            evento.clientY - rectangulo.top;


        const anchoLupa =
            lupaZoom.offsetWidth;

        const altoLupa =
            lupaZoom.offsetHeight;


        let posicionX =
            x - anchoLupa / 2;

        let posicionY =
            y - altoLupa / 2;


        posicionX =
            Math.max(
                0,
                Math.min(
                    posicionX,
                    rectangulo.width - anchoLupa
                )
            );


        posicionY =
            Math.max(
                0,
                Math.min(
                    posicionY,
                    rectangulo.height - altoLupa
                )
            );


        lupaZoom.style.left =
            posicionX + "px";

        lupaZoom.style.top =
            posicionY + "px";


        const porcentajeX =
            (x / rectangulo.width) * 100;

        const porcentajeY =
            (y / rectangulo.height) * 100;


        ventanaZoom.style.backgroundPosition =
            porcentajeX + "% " + porcentajeY + "%";

    });

}
"""Carga de productos demo para FarmaPlus.

Este script agrega el catálogo ficticio de demostración a una base
de datos de FarmaPlus ya inicializada.

No duplica productos existentes con el mismo nombre.
También crea su galería inicial de imágenes.

Los nombres, marcas y descripciones del catálogo son ficticios y
se utilizan exclusivamente con fines de demostración y portfolio.
"""

from pathlib import Path
import os
import sqlite3

BASE_DIR = Path(__file__).resolve().parent

RUTA_VOLUMEN = os.environ.get(
    "RAILWAY_VOLUME_MOUNT_PATH"
)

if RUTA_VOLUMEN:
    BASE_DATOS = (
        Path(RUTA_VOLUMEN)
        / "farmaplus.db"
    )
else:
    BASE_DATOS = (
        BASE_DIR
        / "farmaplus.db"
    )

STOCK_INICIAL = 20

PRODUCTOS = [{'nombre': 'Shampoo de Coco PureBliss',
  'categoria': 'Cuidado personal',
  'precio': 5000,
  'descripcion_corta': 'Limpieza suave, aroma a coco y cuidado diario del cabello.',
  'descripcion_larga': 'El Shampoo de Coco PureBliss es un producto ficticio creado para la '
                       'demostración del catálogo de FarmaPlus. Su presentación está inspirada en '
                       'un shampoo de uso cotidiano con aroma a coco y una propuesta de limpieza '
                       'suave para el cabello.\n'
                       '\n'
                       'Dentro de esta demo se presenta como una opción de cuidado personal '
                       'pensada para acompañar la rutina habitual de lavado. La marca, la fórmula '
                       'y la información comercial mostradas son ficticias y se utilizan '
                       'únicamente con fines de portfolio.\n'
                       '\n'
                       'Modo de uso ilustrativo: aplicar sobre el cabello mojado, masajear '
                       'suavemente y enjuagar con abundante agua.',
  'estado': 'Disponible',
  'imagen_frente': 'img/shampoo-coco-frente.png',
  'imagen_dorso': 'img/shampoo-coco-dorso.png'},
 {'nombre': 'Protector solar',
  'categoria': 'Piel',
  'precio': 12000,
  'descripcion_corta': 'Protector solar FPS 50 ficticio para demostración del catálogo.',
  'descripcion_larga': 'PureBliss FPS 50 es un producto ficticio creado exclusivamente para la '
                       'demostración visual y funcional de FarmaPlus. Su presentación representa '
                       'un protector solar de alta protección dentro de un catálogo de farmacia.\n'
                       '\n'
                       'La marca, la fórmula, el nivel de protección y cualquier característica '
                       'comercial mostrada forman parte de la demo y no corresponden a un producto '
                       'real. Para el uso de protectores solares reales, se deben seguir las '
                       'indicaciones de su fabricante y, cuando corresponda, consultar a un '
                       'profesional de la salud.',
  'estado': 'Disponible',
  'imagen_frente': 'img/protector-solar-frente.png',
  'imagen_dorso': 'img/protector-solar-dorso.png'},
 {'nombre': 'Alcohol en gel',
  'categoria': 'Higiene',
  'precio': 3500,
  'descripcion_corta': 'Higiene práctica de manos en una presentación ficticia de demostración.',
  'descripcion_larga': 'El Alcohol en Gel PureBliss es un producto ficticio utilizado para '
                       'demostrar la categoría de higiene de FarmaPlus. Su presentación simula un '
                       'gel de uso cotidiano para la higiene de manos, con textura ligera y '
                       'formato práctico.\n'
                       '\n'
                       'La marca, la composición y las propiedades comerciales del producto son '
                       'ficticias. No se atribuyen porcentajes de eficacia ni certificaciones '
                       'reales. En productos de higiene reales, se deben respetar siempre las '
                       'instrucciones y advertencias del envase.',
  'estado': 'Disponible',
  'imagen_frente': 'img/alcohol-gel-frente.png',
  'imagen_dorso': 'img/alcohol-gel-dorso.png'},
 {'nombre': 'IBUDOL Ibuprofeno 600 mg',
  'categoria': 'Medicamentos',
  'precio': 7800,
  'descripcion_corta': 'Medicamento ficticio de demostración. No corresponde a un producto real.',
  'descripcion_larga': 'IBUDOL Ibuprofeno 600 mg es un producto ficticio creado exclusivamente '
                       'para demostrar el catálogo, el carrito, el stock y el proceso de compra de '
                       'FarmaPlus.\n'
                       '\n'
                       'Su nombre, presentación, marca y descripción no corresponden a un '
                       'medicamento comercial real. La información mostrada no constituye una '
                       'indicación, recomendación médica ni pauta de tratamiento.\n'
                       '\n'
                       'Ante cualquier necesidad de medicación, se debe consultar a un profesional '
                       'de la salud y utilizar únicamente productos reales autorizados siguiendo '
                       'sus indicaciones.',
  'estado': 'Disponible',
  'imagen_frente': 'img/ibudol-frente.png',
  'imagen_dorso': 'img/ibudol-dorso.png'},
 {'nombre': 'GRIPNOVA Antigripal',
  'categoria': 'Medicamentos',
  'precio': 9200,
  'descripcion_corta': 'Antigripal ficticio utilizado únicamente para demostración.',
  'descripcion_larga': 'GRIPNOVA Antigripal es un producto ficticio utilizado exclusivamente con '
                       'fines demostrativos dentro de FarmaPlus.\n'
                       '\n'
                       'Su nombre, presentación, composición y características no corresponden a '
                       'un medicamento comercial real. No se presentan estudios, porcentajes de '
                       'eficacia ni certificaciones clínicas como parte de esta demo.\n'
                       '\n'
                       'La información del producto no constituye una recomendación médica. Ante '
                       'síntomas de gripe o resfrío, se debe consultar a un profesional de la '
                       'salud cuando corresponda.',
  'estado': 'Disponible',
  'imagen_frente': 'img/gripnova-frente.png',
  'imagen_dorso': 'img/gripnova-dorso.png'},
 {'nombre': 'NOCTERIS Sueño',
  'categoria': 'Medicamentos',
  'precio': 8600,
  'descripcion_corta': 'Producto ficticio de demostración asociado a la categoría de descanso.',
  'descripcion_larga': 'NOCTERIS Sueño es un producto ficticio creado exclusivamente para mostrar '
                       'cómo se visualiza y gestiona un artículo de la categoría Medicamentos '
                       'dentro de FarmaPlus.\n'
                       '\n'
                       'No corresponde a un medicamento, suplemento ni tratamiento real. Su '
                       'nombre, presentación y características son parte de la demo y no implican '
                       'eficacia, seguridad o beneficios clínicos comprobados.\n'
                       '\n'
                       'Ante dificultades para dormir o problemas persistentes de descanso, se '
                       'recomienda consultar a un profesional de la salud.',
  'estado': 'Disponible',
  'imagen_frente': 'img/nocteris-frente.png',
  'imagen_dorso': 'img/nocteris-dorso.png'},
 {'nombre': 'Crema para Manos PureBliss',
  'categoria': 'Piel',
  'precio': 4800,
  'descripcion_corta': 'Cuidado cosmético diario para una sensación suave y confortable.',
  'descripcion_larga': 'La Crema para Manos PureBliss es un producto cosmético ficticio creado '
                       'para la demostración de FarmaPlus. Su presentación está inspirada en una '
                       'crema de uso diario con manteca de karité y aloe vera.\n'
                       '\n'
                       'Dentro de la demo se describe como una crema de textura ligera, pensada '
                       'para dejar una sensación suave y confortable en las manos. La marca, la '
                       'fórmula y las características comerciales son ficticias y no corresponden '
                       'a un producto real.\n'
                       '\n'
                       'Modo de uso ilustrativo: aplicar una pequeña cantidad y masajear hasta su '
                       'absorción.',
  'estado': 'Disponible',
  'imagen_frente': 'img/crema-manos-frente.png',
  'imagen_dorso': 'img/crema-manos-dorso.png'},
 {'nombre': 'Lunabella Jabón de Tocador',
  'categoria': 'Higiene',
  'precio': 2300,
  'descripcion_corta': 'Jabón de tocador ficticio para la rutina diaria de higiene.',
  'descripcion_larga': 'Lunabella Jabón de Tocador es un producto ficticio creado para la '
                       'demostración del catálogo de FarmaPlus. Su presentación está inspirada en '
                       'un jabón de uso cotidiano con una propuesta de limpieza suave y aroma '
                       'delicado.\n'
                       '\n'
                       'La marca, los ingredientes destacados y las propiedades comerciales forman '
                       'parte de la demo y no corresponden a un producto real.\n'
                       '\n'
                       'Modo de uso ilustrativo: humedecer, generar espuma sobre la piel y '
                       'enjuagar con agua.',
  'estado': 'Disponible',
  'imagen_frente': 'img/jabon-lunabella-frente.png',
  'imagen_dorso': 'img/jabon-lunabella-dorso.png'},
 {'nombre': 'Dentiva Cepillo Dental',
  'categoria': 'Higiene',
  'precio': 1900,
  'descripcion_corta': 'Cepillo dental ficticio con cerdas suaves y diseño ergonómico.',
  'descripcion_larga': 'El Cepillo Dental Dentiva es un producto ficticio creado para representar '
                       'artículos de higiene bucal dentro de FarmaPlus.\n'
                       '\n'
                       'Su presentación incluye cerdas suaves y un mango de diseño ergonómico como '
                       'parte de la descripción comercial de la demo. La marca y todas sus '
                       'características son ficticias y no corresponden a un producto real.\n'
                       '\n'
                       'Se utiliza únicamente para demostrar la visualización, el stock y la '
                       'compra de un producto de higiene dentro del sitio.',
  'estado': 'Disponible',
  'imagen_frente': 'img/cepillo-dental-frente.png',
  'imagen_dorso': 'img/cepillo-dental-dorso.png'},
 {'nombre': 'Veluna Limpiador Facial',
  'categoria': 'Piel',
  'precio': 13500,
  'descripcion_corta': 'Limpiador facial ficticio para una rutina diaria de cuidado de la piel.',
  'descripcion_larga': 'Veluna Limpiador Facial es un producto cosmético ficticio creado para la '
                       'demostración de FarmaPlus. Su presentación está inspirada en un limpiador '
                       'facial de textura ligera para incorporar a una rutina cotidiana de cuidado '
                       'de la piel.\n'
                       '\n'
                       'La marca, los ingredientes destacados y las propiedades comerciales son '
                       'ficticios y se muestran únicamente con fines de portfolio.\n'
                       '\n'
                       'Modo de uso ilustrativo: aplicar sobre el rostro húmedo, masajear '
                       'suavemente y enjuagar con abundante agua.',
  'estado': 'Disponible',
  'imagen_frente': 'img/veluna-limpiador-frente.png',
  'imagen_dorso': 'img/veluna-limpiador-dorso.png'},
 {'nombre': 'Aireva Desodorante Antitranspirante',
  'categoria': 'Cuidado personal',
  'precio': 2800,
  'descripcion_corta': 'Desodorante antitranspirante ficticio para uso cotidiano.',
  'descripcion_larga': 'Aireva Desodorante Antitranspirante es un producto ficticio creado para la '
                       'demostración del catálogo de FarmaPlus.\n'
                       '\n'
                       'Su presentación está inspirada en un desodorante de uso diario con aloe '
                       'vera y vitamina E como elementos visuales de la propuesta comercial. No se '
                       'atribuyen tiempos de protección, estudios ni resultados clínicos reales.\n'
                       '\n'
                       'La marca, la fórmula y las características del producto son ficticias y se '
                       'utilizan únicamente con fines de portfolio.',
  'estado': 'Disponible',
  'imagen_frente': 'img/aireva-frente.png',
  'imagen_dorso': 'img/aireva-dorso.png'},
 {'nombre': 'SuaveTip Cotonetes',
  'categoria': 'Cuidado personal',
  'precio': 3100,
  'descripcion_corta': 'Puntas suaves de algodón para usos cosméticos y cuidados externos.',
  'descripcion_larga': 'Los Cotonetes SuaveTip son un producto ficticio creado para representar '
                       'artículos de cuidado personal dentro de FarmaPlus.\n'
                       '\n'
                       'Su presentación incluye 200 unidades con puntas de algodón y está pensada '
                       'para usos cosméticos y cuidados externos. La marca y la información '
                       'comercial forman parte de la demo y no corresponden a un producto real.',
  'estado': 'Disponible',
  'imagen_frente': 'img/suavetip-frente.png',
  'imagen_dorso': 'img/suavetip-dorso.png'}]


def asegurar_imagenes(
    cursor,
    producto_id,
    producto
):
    imagenes = [
        (
            producto["imagen_frente"],
            0,
            1
        ),
        (
            producto["imagen_dorso"],
            1,
            0
        )
    ]

    agregadas = 0

    for ruta, orden, es_principal in imagenes:

        if not ruta:
            continue

        cursor.execute(
            """
            INSERT OR IGNORE INTO imagenes_producto (
                producto_id,
                ruta,
                orden,
                es_principal
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                producto_id,
                ruta,
                orden,
                es_principal
            )
        )

        if cursor.rowcount == 1:
            agregadas += 1

    return agregadas


def main():

    if not BASE_DATOS.exists():

        print(
            "ERROR: No se encontró farmaplus.db."
        )

        print(
            "Inicializá primero la aplicación FarmaPlus."
        )

        return


    conexion = sqlite3.connect(
        BASE_DATOS
    )

    conexion.execute(
        "PRAGMA foreign_keys = ON"
    )

    cursor = conexion.cursor()


    tablas = {
        fila[0]
        for fila in cursor.execute(
            """
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
            """
        )
    }


    tablas_necesarias = {
        "productos",
        "imagenes_producto"
    }


    if not tablas_necesarias.issubset(
        tablas
    ):

        print(
            "ERROR: La base de datos todavía "
            "no está inicializada correctamente."
        )

        conexion.close()

        return


    productos_insertados = 0
    productos_existentes = 0
    imagenes_insertadas = 0


    try:

        conexion.execute(
            "BEGIN"
        )


        for producto in PRODUCTOS:

            cursor.execute(
                """
                SELECT id
                FROM productos
                WHERE LOWER(nombre) = LOWER(?)
                LIMIT 1
                """,
                (
                    producto["nombre"],
                )
            )


            producto_existente = (
                cursor.fetchone()
            )


            if producto_existente:

                producto_id = (
                    producto_existente[0]
                )

                productos_existentes += 1

                print(
                    "OMITIDO:",
                    producto["nombre"],
                    "ya existe"
                )

            else:

                cursor.execute(
                    """
                    INSERT INTO productos (
                        nombre,
                        categoria,
                        precio,
                        stock,
                        descripcion_corta,
                        descripcion_larga,
                        estado,
                        imagen_frente,
                        imagen_dorso
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        producto["nombre"],
                        producto["categoria"],
                        producto["precio"],
                        STOCK_INICIAL,
                        producto[
                            "descripcion_corta"
                        ],
                        producto[
                            "descripcion_larga"
                        ],
                        producto["estado"],
                        producto[
                            "imagen_frente"
                        ],
                        producto[
                            "imagen_dorso"
                        ]
                    )
                )


                producto_id = (
                    cursor.lastrowid
                )

                productos_insertados += 1


                print(
                    "AGREGADO:",
                    producto["nombre"]
                )


            imagenes_insertadas += (
                asegurar_imagenes(
                    cursor,
                    producto_id,
                    producto
                )
            )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        print()
        print(
            "ERROR: Se canceló la carga demo."
        )

        print(
            "No se guardaron cambios parciales."
        )

        print(error)

        raise


    finally:

        conexion.close()


    print()
    print(
        "Carga demo terminada correctamente."
    )

    print(
        "Productos agregados:",
        productos_insertados
    )

    print(
        "Productos ya existentes:",
        productos_existentes
    )

    print(
        "Imágenes agregadas:",
        imagenes_insertadas
    )


if __name__ == "__main__":
    main()
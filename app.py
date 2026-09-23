from pathlib import Path
from datetime import datetime
import os
import sqlite3
import uuid

from dotenv import load_dotenv

from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    request,
    send_from_directory,
    session
)

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from werkzeug.utils import secure_filename

load_dotenv()


app = Flask(__name__)


SECRET_KEY = os.environ.get(
    "SECRET_KEY"
)


if not SECRET_KEY:

    raise RuntimeError(
        "Falta configurar SECRET_KEY."
    )


app.config["SECRET_KEY"] = SECRET_KEY

ES_PRODUCCION = (
    os.environ.get("FLASK_DEBUG") != "1"
)


app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=ES_PRODUCCION,
    MAX_CONTENT_LENGTH=5 * 1024 * 1024
)

CARPETA_PROYECTO = Path(__file__).resolve().parent


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
        CARPETA_PROYECTO
        / "farmaplus.db"
    )

if RUTA_VOLUMEN:

    CARPETA_IMAGENES_PRODUCTOS = (
        Path(RUTA_VOLUMEN)
        / "uploads"
        / "productos"
    )

    PREFIJO_IMAGENES_PRODUCTOS = (
        "uploads/productos/"
    )

else:

    CARPETA_IMAGENES_PRODUCTOS = (
        CARPETA_PROYECTO
        / "img"
        / "productos"
    )

    PREFIJO_IMAGENES_PRODUCTOS = (
        "img/productos/"
    )


CARPETA_IMAGENES_PRODUCTOS.mkdir(
    parents=True,
    exist_ok=True
)


EXTENSIONES_IMAGEN = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
}

# =========================================
# BASE DE DATOS
# =========================================

def conectar_db():

    conexion = sqlite3.connect(
        BASE_DATOS
    )

    conexion.execute(
        "PRAGMA foreign_keys = ON"
    )

    return conexion


def crear_base_datos():

    conexion = conectar_db()

    cursor = conexion.cursor()


    # =========================================
    # USUARIOS
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nombre TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            password_hash TEXT NOT NULL,

            rol TEXT NOT NULL DEFAULT 'cliente',

            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP

        )
        """
    )

    # =========================================
    # PERFILES DE USUARIO
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS perfiles_usuario (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL UNIQUE,

            nombre TEXT NOT NULL,

            apellido TEXT NOT NULL DEFAULT '',

            telefono TEXT,

            foto_perfil TEXT,

            fecha_actualizacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (usuario_id)
                REFERENCES usuarios(id)
                ON DELETE CASCADE

        )
        """
    )


    # Crear automáticamente un perfil
    # para los usuarios que ya existían.

    cursor.execute(
        """
        INSERT OR IGNORE INTO perfiles_usuario (
            usuario_id,
            nombre
        )

        SELECT
            id,
            nombre

        FROM usuarios
        """
    )


    # =========================================
    # DIRECCIONES DE USUARIO
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS direcciones_usuario (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            alias TEXT NOT NULL,

            calle TEXT NOT NULL,

            numero TEXT NOT NULL,

            piso TEXT,

            departamento TEXT,

            localidad TEXT NOT NULL,

            provincia TEXT NOT NULL,

            codigo_postal TEXT,

            referencias TEXT,

            es_principal INTEGER
                NOT NULL DEFAULT 0,

            fecha_creacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            fecha_actualizacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (usuario_id)
                REFERENCES usuarios(id)
                ON DELETE CASCADE

        )
        """
    )


    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_direcciones_usuario_usuario_id

        ON direcciones_usuario(usuario_id)
        """
    )


    cursor.execute(
        """
        CREATE UNIQUE INDEX IF NOT EXISTS
        idx_direccion_principal_usuario

        ON direcciones_usuario(usuario_id)

        WHERE es_principal = 1
        """
    )


    # =========================================
    # PRODUCTOS
    # =========================================
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS productos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nombre TEXT NOT NULL,

            categoria TEXT NOT NULL,

            precio INTEGER NOT NULL,

            descripcion_corta TEXT,

            descripcion_larga TEXT,

            estado TEXT NOT NULL DEFAULT 'Disponible',

            imagen_frente TEXT,

            imagen_dorso TEXT,

            en_oferta INTEGER NOT NULL DEFAULT 0,

            descuento_porcentaje INTEGER,

            precio_oferta INTEGER,

            fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP

        )
        """
    )


    # =========================================
    # ACTUALIZAR TABLA PRODUCTOS
    # =========================================

    cursor.execute(
        "PRAGMA table_info(productos)"
    )

    columnas = {
        fila[1]
        for fila in cursor.fetchall()
    }


    if "imagen_frente" not in columnas:

        cursor.execute(
            """
            ALTER TABLE productos
            ADD COLUMN imagen_frente TEXT
            """
        )


    if "imagen_dorso" not in columnas:

        cursor.execute(
            """
            ALTER TABLE productos
            ADD COLUMN imagen_dorso TEXT
            """
        )


    if "en_oferta" not in columnas:

        cursor.execute(
            """
            ALTER TABLE productos
            ADD COLUMN en_oferta INTEGER
            NOT NULL DEFAULT 0
            """
        )

    if "descuento_porcentaje" not in columnas:

        cursor.execute(
        """
        ALTER TABLE productos
        ADD COLUMN descuento_porcentaje INTEGER
        """
    )

    if "precio_oferta" not in columnas:

        cursor.execute(
            """
            ALTER TABLE productos
            ADD COLUMN precio_oferta INTEGER
            """
        )


    if "stock" not in columnas:

        cursor.execute(
            """
            ALTER TABLE productos
            ADD COLUMN stock INTEGER
            NOT NULL DEFAULT 0
            """
        )

    # =========================================
    # IMÁGENES MÚLTIPLES DE PRODUCTOS
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS imagenes_producto (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            producto_id INTEGER NOT NULL,

            ruta TEXT NOT NULL,

            orden INTEGER NOT NULL DEFAULT 0,

            es_principal INTEGER NOT NULL DEFAULT 0,

            fecha_creacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (producto_id)
                REFERENCES productos(id)
                ON DELETE CASCADE,

            UNIQUE(producto_id, ruta)

        )
        """
    )


    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_imagenes_producto_producto_id

        ON imagenes_producto(producto_id)
        """
    )

    # =========================================
    # PEDIDOS
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS pedidos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            estado TEXT NOT NULL
                DEFAULT 'Pendiente',

            tipo_entrega TEXT NOT NULL,

            subtotal INTEGER NOT NULL
                DEFAULT 0,

            costo_envio INTEGER NOT NULL
                DEFAULT 0,

            total INTEGER NOT NULL
                DEFAULT 0,

            estado_pago TEXT NOT NULL
                DEFAULT 'Pendiente',

            metodo_pago TEXT,

            observaciones TEXT,

            nombre_cliente TEXT NOT NULL,

            email_cliente TEXT NOT NULL,

            telefono_cliente TEXT,

            punto_retiro TEXT,

            direccion_alias TEXT,

            direccion_calle TEXT,

            direccion_numero TEXT,

            direccion_piso TEXT,

            direccion_departamento TEXT,

            direccion_localidad TEXT,

            direccion_provincia TEXT,

            direccion_codigo_postal TEXT,

            direccion_referencias TEXT,

            fecha_creacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            fecha_actualizacion DATETIME
                DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (usuario_id)
                REFERENCES usuarios(id)

        )
        """
    )


    # =========================================
    # PRODUCTOS DE CADA PEDIDO
    # =========================================

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS pedido_items (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            pedido_id INTEGER NOT NULL,

            producto_id INTEGER,

            nombre_producto TEXT NOT NULL,

            precio_unitario INTEGER NOT NULL,

            cantidad INTEGER NOT NULL,

            subtotal INTEGER NOT NULL,

            imagen TEXT,

            FOREIGN KEY (pedido_id)
                REFERENCES pedidos(id)
                ON DELETE CASCADE,

            FOREIGN KEY (producto_id)
                REFERENCES productos(id)
                ON DELETE SET NULL

        )
        """
    )


    # =========================================
    # ÍNDICES DE PEDIDOS
    # =========================================

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_pedidos_usuario_id

        ON pedidos(usuario_id)
        """
    )


    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_pedidos_estado

        ON pedidos(estado)
        """
    )


    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS
        idx_pedido_items_pedido_id

        ON pedido_items(pedido_id)
        """
    )

    # =========================================
    # ACTUALIZAR TABLA PEDIDOS
    # =========================================

    cursor.execute(
        "PRAGMA table_info(pedidos)"
    )


    columnas_pedidos = {
        fila[1]
        for fila in cursor.fetchall()
    }


    if "descuento" not in columnas_pedidos:

        cursor.execute(
            """
            ALTER TABLE pedidos
            ADD COLUMN descuento INTEGER
            NOT NULL DEFAULT 0
            """
        )


    if "promocion" not in columnas_pedidos:

        cursor.execute(
            """
            ALTER TABLE pedidos
            ADD COLUMN promocion TEXT
            """
        )

    conexion.commit()

    conexion.close()



def guardar_imagen_producto(archivo):

    if archivo is None:

        return None


    if archivo.filename == "":

        return None


    nombre_seguro = secure_filename(
        archivo.filename
    )


    extension = Path(
        nombre_seguro
    ).suffix.lower()


    if extension not in EXTENSIONES_IMAGEN:

        raise ValueError(
            "Formato de imagen no permitido."
        )


    nombre_nuevo = (
        uuid.uuid4().hex
        + extension
    )


    ruta_destino = (
        CARPETA_IMAGENES_PRODUCTOS
        / nombre_nuevo
    )


    archivo.save(
        ruta_destino
    )


    return (
        PREFIJO_IMAGENES_PRODUCTOS
        + nombre_nuevo
)

# =========================================
# PÁGINA PRINCIPAL
# =========================================

@app.route("/")
def inicio():

    return send_from_directory(
        CARPETA_PROYECTO,
        "index.html"
    )


# =========================================
# REGISTRO DE USUARIOS
# =========================================

@app.route("/api/registro", methods=["POST"])
def registrar_usuario():

    datos = request.get_json()


    if not datos:

        return jsonify({
            "ok": False,
            "mensaje": "No se recibieron datos."
        }), 400


    nombre = datos.get(
        "nombre",
        ""
    ).strip()


    email = datos.get(
        "email",
        ""
    ).strip().lower()


    password = datos.get(
        "password",
        ""
    )


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(nombre) < 3:

        return jsonify({
            "ok": False,
            "mensaje": "Ingresá un nombre válido."
        }), 400


    if (
        "@" not in email
        or "." not in email
    ):

        return jsonify({
            "ok": False,
            "mensaje": "Ingresá un correo electrónico válido."
        }), 400


    if len(password) < 8:

        return jsonify({
            "ok": False,
            "mensaje":
                "La contraseña debe tener al menos 8 caracteres."
        }), 400


    # =========================================
    # PROTEGER CONTRASEÑA
    # =========================================

    password_hash =  generate_password_hash(
            password
        )


    conexion = conectar_db()


    cursor =conexion.cursor()


    try:

        # =========================================
        # CREAR USUARIO
        # =========================================

        cursor.execute(
            """
            INSERT INTO usuarios (
                nombre,
                email,
                password_hash,
                rol
            )
            VALUES (?, ?, ?, ?)
            """,
            (
                nombre,
                email,
                password_hash,
                "cliente"
            )
        )


        usuario_id =     cursor.lastrowid


        # =========================================
        # CREAR PERFIL
        # =========================================

        cursor.execute(
            """
            INSERT INTO perfiles_usuario (
                usuario_id,
                nombre,
                apellido,
                telefono,
                foto_perfil
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                usuario_id,
                nombre,
                "",
                None,
                None
            )
        )


        conexion.commit()


    except sqlite3.IntegrityError:

        conexion.rollback()

        conexion.close()


        return jsonify({
            "ok": False,
            "mensaje":
                "Ya existe una cuenta con ese correo electrónico."
        }), 409


    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Cuenta creada correctamente."
    }), 201

# =========================================
# INICIO DE SESIÓN
# =========================================

@app.route("/api/login", methods=["POST"])
def iniciar_sesion():

    datos = request.get_json()

    if not datos:

        return jsonify({
            "ok": False,
            "mensaje": "No se recibieron datos."
        }), 400


    email = datos.get("email", "").strip().lower()

    password = datos.get("password", "")


    if not email or not password:

        return jsonify({
            "ok": False,
            "mensaje": "Completá el correo y la contraseña."
        }), 400


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    cursor.execute(
        """
        SELECT
            id,
            nombre,
            email,
            password_hash,
            rol
        FROM usuarios
        WHERE email = ?
        """,
        (email,)
    )


    usuario = cursor.fetchone()

    conexion.close()


    # El mismo mensaje para email inexistente
    # o contraseña incorrecta.

    if usuario is None:

        return jsonify({
            "ok": False,
            "mensaje": "Correo o contraseña incorrectos."
        }), 401


    password_correcta = check_password_hash(
        usuario["password_hash"],
        password
    )


    if not password_correcta:

        return jsonify({
            "ok": False,
            "mensaje": "Correo o contraseña incorrectos."
        }), 401


    # Limpiamos cualquier sesión anterior

    session.clear()


    # Guardamos quién inició sesión

    session["usuario_id"] = usuario["id"]

    session["nombre"] = usuario["nombre"]

    session["email"] = usuario["email"]

    session["rol"] = usuario["rol"]


    return jsonify({
        "ok": True,

        "mensaje": "Sesión iniciada correctamente.",

        "usuario": {
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "email": usuario["email"],
            "rol": usuario["rol"]
        }

    }), 200

# =========================================
# CONSULTAR SESIÓN
# =========================================

@app.route("/api/sesion", methods=["GET"])
def consultar_sesion():

    if "usuario_id" not in session:

        return jsonify({
            "logueado": False
        }), 200


    usuario_id = session["usuario_id"]


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    cursor.execute(
        """
        SELECT
            usuarios.id,
            usuarios.email,
            usuarios.rol,

            COALESCE(
                perfiles_usuario.nombre,
                usuarios.nombre
            ) AS nombre,

            COALESCE(
                perfiles_usuario.apellido,
                ''
            ) AS apellido

        FROM usuarios

        LEFT JOIN perfiles_usuario
            ON perfiles_usuario.usuario_id =
               usuarios.id

        WHERE usuarios.id = ?
        """,
        (usuario_id,)
    )


    usuario = cursor.fetchone()


    conexion.close()


    if usuario is None:

        session.clear()

        return jsonify({
            "logueado": False
        }), 200


    session["nombre"] = usuario["nombre"]

    session["email"] = usuario["email"]

    session["rol"] = usuario["rol"]


    return jsonify({
        "logueado": True,

        "usuario": {
            "id":
                usuario["id"],

            "nombre":
                usuario["nombre"],

            "apellido":
                usuario["apellido"],

            "email":
                usuario["email"],

            "rol":
                usuario["rol"]
        }

    }), 200


# =========================================
# OBTENER MI PERFIL
# =========================================

@app.route("/api/perfil", methods=["GET"])
def obtener_perfil():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    usuario_id = session["usuario_id"]


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # PERFIL
    # =========================================

    cursor.execute(
        """
        SELECT
            usuarios.id,
            usuarios.email,
            usuarios.rol,
            perfiles_usuario.nombre,
            perfiles_usuario.apellido,
            perfiles_usuario.telefono,
            perfiles_usuario.foto_perfil

        FROM usuarios

        LEFT JOIN perfiles_usuario
            ON perfiles_usuario.usuario_id =
               usuarios.id

        WHERE usuarios.id = ?
        """,
        (usuario_id,)
    )


    perfil = cursor.fetchone()


    if perfil is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": "No se encontró el usuario."
        }), 404


    # =========================================
    # DIRECCIONES
    # =========================================

    cursor.execute(
        """
        SELECT
            id,
            alias,
            calle,
            numero,
            piso,
            departamento,
            localidad,
            provincia,
            codigo_postal,
            referencias,
            es_principal

        FROM direcciones_usuario

        WHERE usuario_id = ?

        ORDER BY
            es_principal DESC,
            id ASC
        """,
        (usuario_id,)
    )


    direcciones = [
        dict(fila)
        for fila in cursor.fetchall()
    ]


    conexion.close()


    return jsonify({
        "ok": True,

        "perfil":
            dict(perfil),

        "direcciones":
            direcciones

    }), 200


# =========================================
# ACTUALIZAR MI PERFIL
# =========================================

@app.route("/api/perfil", methods=["PUT"])
def actualizar_perfil():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    datos = request.get_json()


    if not datos:

        return jsonify({
            "ok": False,
            "mensaje": "No se recibieron datos."
        }), 400


    usuario_id = session["usuario_id"]


    nombre = datos.get(
        "nombre",
        ""
    ).strip()


    apellido = datos.get(
        "apellido",
        ""
    ).strip()


    telefono = datos.get(
        "telefono",
        ""
    ).strip()


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(nombre) < 2:

        return jsonify({
            "ok": False,
            "mensaje": "Ingresá un nombre válido."
        }), 400


    if len(nombre) > 60:

        return jsonify({
            "ok": False,
            "mensaje": "El nombre es demasiado largo."
        }), 400


    if len(apellido) > 60:

        return jsonify({
            "ok": False,
            "mensaje": "El apellido es demasiado largo."
        }), 400


    if len(telefono) > 30:

        return jsonify({
            "ok": False,
            "mensaje": "El teléfono es demasiado largo."
        }), 400


    conexion = conectar_db()

    cursor = conexion.cursor()


    try:

        # =========================================
        # ACTUALIZAR PERFIL
        # =========================================

        cursor.execute(
            """
            UPDATE perfiles_usuario

            SET
                nombre = ?,
                apellido = ?,
                telefono = ?,
                fecha_actualizacion =
                    CURRENT_TIMESTAMP

            WHERE usuario_id = ?
            """,
            (
                nombre,
                apellido,
                telefono if telefono else None,
                usuario_id
            )
        )


        # =========================================
        # ACTUALIZAR NOMBRE DE LA CUENTA
        # =========================================

        cursor.execute(
            """
            UPDATE usuarios

            SET nombre = ?

            WHERE id = ?
            """,
            (
                nombre,
                usuario_id
            )
        )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        conexion.close()

        print(
            "Error al actualizar perfil:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo actualizar el perfil."
        }), 500


    conexion.close()


    # Actualizar también el nombre
    # guardado en la sesión.

    session["nombre"] = nombre


    return jsonify({
        "ok": True,

        "mensaje":
            "Perfil actualizado correctamente.",

        "perfil": {
            "nombre": nombre,
            "apellido": apellido,
            "telefono":
                telefono if telefono else None
        }

    }), 200

# =========================================
# AGREGAR DIRECCIÓN
# =========================================

@app.route("/api/direcciones", methods=["POST"])
def agregar_direccion():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    datos = request.get_json()


    if not datos:

        return jsonify({
            "ok": False,
            "mensaje": "No se recibieron datos."
        }), 400


    usuario_id = session["usuario_id"]


    alias = datos.get(
        "alias",
        ""
    ).strip()


    calle = datos.get(
        "calle",
        ""
    ).strip()


    numero = datos.get(
        "numero",
        ""
    ).strip()


    piso = datos.get(
        "piso",
        ""
    ).strip()


    departamento = datos.get(
        "departamento",
        ""
    ).strip()


    localidad = datos.get(
        "localidad",
        ""
    ).strip()


    provincia = datos.get(
        "provincia",
        ""
    ).strip()


    codigo_postal = datos.get(
        "codigo_postal",
        ""
    ).strip()


    referencias = datos.get(
        "referencias",
        ""
    ).strip()


    es_principal = (
        datos.get(
            "es_principal",
            False
        ) is True
    )


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(alias) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá un nombre para la dirección."
        }), 400


    if len(calle) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una calle válida."
        }), 400


    if not numero:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá el número de la dirección."
        }), 400


    if len(localidad) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una localidad válida."
        }), 400


    if len(provincia) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una provincia válida."
        }), 400


    conexion = conectar_db()

    cursor = conexion.cursor()


    try:

        # =========================================
        # VER SI YA TIENE DIRECCIONES
        # =========================================

        cursor.execute(
            """
            SELECT COUNT(*)

            FROM direcciones_usuario

            WHERE usuario_id = ?
            """,
            (usuario_id,)
        )


        cantidad_direcciones = (
            cursor.fetchone()[0]
        )


        # La primera dirección se convierte
        # automáticamente en principal.

        if cantidad_direcciones == 0:

            es_principal = True


        # =========================================
        # SI SERÁ PRINCIPAL,
        # DESMARCAR LAS DEMÁS
        # =========================================

        if es_principal:

            cursor.execute(
                """
                UPDATE direcciones_usuario

                SET es_principal = 0

                WHERE usuario_id = ?
                """,
                (usuario_id,)
            )


        # =========================================
        # GUARDAR DIRECCIÓN
        # =========================================

        cursor.execute(
            """
            INSERT INTO direcciones_usuario (

                usuario_id,
                alias,
                calle,
                numero,
                piso,
                departamento,
                localidad,
                provincia,
                codigo_postal,
                referencias,
                es_principal

            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                usuario_id,
                alias,
                calle,
                numero,
                piso if piso else None,
                departamento if departamento else None,
                localidad,
                provincia,
                codigo_postal if codigo_postal else None,
                referencias if referencias else None,
                1 if es_principal else 0
            )
        )


        direccion_id = (
            cursor.lastrowid
        )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        conexion.close()

        print(
            "Error al agregar dirección:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo guardar la dirección."
        }), 500


    conexion.close()


    return jsonify({
        "ok": True,

        "mensaje":
            "Dirección guardada correctamente.",

        "direccion_id":
            direccion_id

    }), 201

# =========================================
# EDITAR DIRECCIÓN
# =========================================

@app.route(
    "/api/direcciones/<int:direccion_id>",
    methods=["PUT"]
)
def editar_direccion(direccion_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    datos = request.get_json()


    if not datos:

        return jsonify({
            "ok": False,
            "mensaje": "No se recibieron datos."
        }), 400


    usuario_id = session["usuario_id"]


    alias = datos.get(
        "alias",
        ""
    ).strip()


    calle = datos.get(
        "calle",
        ""
    ).strip()


    numero = datos.get(
        "numero",
        ""
    ).strip()


    piso = datos.get(
        "piso",
        ""
    ).strip()


    departamento = datos.get(
        "departamento",
        ""
    ).strip()


    localidad = datos.get(
        "localidad",
        ""
    ).strip()


    provincia = datos.get(
        "provincia",
        ""
    ).strip()


    codigo_postal = datos.get(
        "codigo_postal",
        ""
    ).strip()


    referencias = datos.get(
        "referencias",
        ""
    ).strip()


    es_principal = (
        datos.get(
            "es_principal",
            False
        ) is True
    )


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(alias) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá un nombre para la dirección."
        }), 400


    if len(calle) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una calle válida."
        }), 400


    if not numero:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá el número de la dirección."
        }), 400


    if len(localidad) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una localidad válida."
        }), 400


    if len(provincia) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá una provincia válida."
        }), 400


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    try:

        # =========================================
        # COMPROBAR QUE LE PERTENECE AL USUARIO
        # =========================================

        cursor.execute(
            """
            SELECT
                id,
                es_principal

            FROM direcciones_usuario

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                direccion_id,
                usuario_id
            )
        )


        direccion_actual =  cursor.fetchone()


        if direccion_actual is None:

            conexion.close()

            return jsonify({
                "ok": False,
                "mensaje":
                    "La dirección no existe."
            }), 404


        # Si ya era principal y el usuario
        # simplemente la está editando,
        # seguirá siendo principal.

        if (
            direccion_actual[
                "es_principal"
            ] == 1
        ):

            es_principal = True


        # =========================================
        # SI PASA A SER PRINCIPAL,
        # DESMARCAR LAS DEMÁS
        # =========================================

        if es_principal:

            cursor.execute(
                """
                UPDATE direcciones_usuario

                SET es_principal = 0

                WHERE usuario_id = ?
                """,
                (usuario_id,)
            )


        # =========================================
        # ACTUALIZAR
        # =========================================

        cursor.execute(
            """
            UPDATE direcciones_usuario

            SET
                alias = ?,
                calle = ?,
                numero = ?,
                piso = ?,
                departamento = ?,
                localidad = ?,
                provincia = ?,
                codigo_postal = ?,
                referencias = ?,
                es_principal = ?,
                fecha_actualizacion =
                    CURRENT_TIMESTAMP

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                alias,
                calle,
                numero,
                piso if piso else None,
                departamento
                    if departamento
                    else None,
                localidad,
                provincia,
                codigo_postal
                    if codigo_postal
                    else None,
                referencias
                    if referencias
                    else None,
                1 if es_principal else 0,
                direccion_id,
                usuario_id
            )
        )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        conexion.close()

        print(
            "Error al editar dirección:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo actualizar la dirección."
        }), 500


    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Dirección actualizada correctamente."
    }), 200


# =========================================
# HACER DIRECCIÓN PRINCIPAL
# =========================================

@app.route(
    "/api/direcciones/<int:direccion_id>/principal",
    methods=["PUT"]
)
def hacer_direccion_principal(direccion_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    usuario_id = session["usuario_id"]


    conexion = conectar_db()

    cursor = conexion.cursor()


    try:

        # Comprobar que la dirección
        # pertenece al usuario.

        cursor.execute(
            """
            SELECT id

            FROM direcciones_usuario

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                direccion_id,
                usuario_id
            )
        )


        if cursor.fetchone() is None:

            conexion.close()

            return jsonify({
                "ok": False,
                "mensaje":
                    "La dirección no existe."
            }), 404


        # Quitar principal a todas.

        cursor.execute(
            """
            UPDATE direcciones_usuario

            SET es_principal = 0

            WHERE usuario_id = ?
            """,
            (usuario_id,)
        )


        # Marcar solamente la seleccionada.

        cursor.execute(
            """
            UPDATE direcciones_usuario

            SET
                es_principal = 1,
                fecha_actualizacion =
                    CURRENT_TIMESTAMP

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                direccion_id,
                usuario_id
            )
        )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        conexion.close()

        print(
            "Error al cambiar dirección principal:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo cambiar la dirección principal."
        }), 500


    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Dirección principal actualizada."
    }), 200


# =========================================
# ELIMINAR DIRECCIÓN
# =========================================

@app.route(
    "/api/direcciones/<int:direccion_id>",
    methods=["DELETE"]
)
def eliminar_direccion(direccion_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    usuario_id = session["usuario_id"]


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    try:

        # =========================================
        # BUSCAR DIRECCIÓN
        # =========================================

        cursor.execute(
            """
            SELECT
                id,
                es_principal

            FROM direcciones_usuario

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                direccion_id,
                usuario_id
            )
        )


        direccion = cursor.fetchone()


        if direccion is None:

            conexion.close()

            return jsonify({
                "ok": False,
                "mensaje":
                    "La dirección no existe."
            }), 404


        era_principal = (
            direccion[
                "es_principal"
            ] == 1
        )


        # =========================================
        # ELIMINAR
        # =========================================

        cursor.execute(
            """
            DELETE FROM direcciones_usuario

            WHERE
                id = ?
                AND usuario_id = ?
            """,
            (
                direccion_id,
                usuario_id
            )
        )


        # =========================================
        # SI ERA PRINCIPAL,
        # ELEGIR OTRA AUTOMÁTICAMENTE
        # =========================================

        if era_principal:

            cursor.execute(
                """
                SELECT id

                FROM direcciones_usuario

                WHERE usuario_id = ?

                ORDER BY id ASC

                LIMIT 1
                """,
                (usuario_id,)
            )


            siguiente = cursor.fetchone()


            if siguiente is not None:

                cursor.execute(
                    """
                    UPDATE direcciones_usuario

                    SET es_principal = 1

                    WHERE id = ?
                    """,
                    (
                        siguiente["id"],
                    )
                )


        conexion.commit()


    except Exception as error:

        conexion.rollback()

        conexion.close()

        print(
            "Error al eliminar dirección:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo eliminar la dirección."
        }), 500


    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Dirección eliminada correctamente."
    }), 200

# =========================================
# DATOS PARA CHECKOUT
# =========================================

@app.route(
    "/api/checkout/datos",
    methods=["GET"]
)
def obtener_datos_checkout():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje":
                "Tenés que iniciar sesión."
        }), 401


    usuario_id = session["usuario_id"]


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # DATOS DEL CLIENTE
    # =========================================

    cursor.execute(
        """
        SELECT
            usuarios.id,
            usuarios.email,

            COALESCE(
                perfiles_usuario.nombre,
                usuarios.nombre
            ) AS nombre,

            COALESCE(
                perfiles_usuario.apellido,
                ''
            ) AS apellido,

            perfiles_usuario.telefono

        FROM usuarios

        LEFT JOIN perfiles_usuario
            ON perfiles_usuario.usuario_id =
               usuarios.id

        WHERE usuarios.id = ?
        """,
        (usuario_id,)
    )


    cliente = cursor.fetchone()


    if cliente is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje":
                "No se encontró el usuario."
        }), 404


    # =========================================
    # DIRECCIONES
    # =========================================

    cursor.execute(
        """
        SELECT
            id,
            alias,
            calle,
            numero,
            piso,
            departamento,
            localidad,
            provincia,
            codigo_postal,
            referencias,
            es_principal

        FROM direcciones_usuario

        WHERE usuario_id = ?

        ORDER BY
            es_principal DESC,
            id ASC
        """,
        (usuario_id,)
    )


    direcciones = [
        dict(direccion)
        for direccion in
            cursor.fetchall()
    ]


    conexion.close()


    return jsonify({
        "ok": True,

        "cliente":
            dict(cliente),

        "direcciones":
            direcciones,

        "retiro": {
            "nombre":
                "FarmaPlus Burzaco",

            "tipo":
                "retiro"
        }

    }), 200

# =========================================
# CREAR PEDIDO
# =========================================

@app.route(
    "/api/pedidos",
    methods=["POST"]
)
def crear_pedido():

    # =====================================
    # SESIÓN
    # =====================================

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje":
                "Tenés que iniciar sesión."
        }), 401


    usuario_id = session["usuario_id"]


    datos = request.get_json()


    if not datos:

        return jsonify({
            "ok": False,
            "mensaje":
                "No se recibieron datos del pedido."
        }), 400


    tipo_entrega = str(
        datos.get(
            "tipo_entrega",
            ""
        )
    ).strip()


    metodo_pago = str(
        datos.get(
            "metodo_pago",
            ""
        )
    ).strip()


    direccion_id = datos.get(
        "direccion_id"
    )


    items = datos.get(
        "items",
        []
    )


    # =====================================
    # VALIDAR ENTREGA
    # =====================================

    if tipo_entrega not in (
        "retiro",
        "envio"
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "La forma de entrega no es válida."
        }), 400


    # =====================================
    # VALIDAR MÉTODO DE PAGO
    # =====================================

    metodos_retiro = (
        "mercado_pago",
        "cuenta_dni",
        "santander",
        "sucursal"
    )


    metodos_envio = (
        "mercado_pago",
        "cuenta_dni",
        "santander"
    )


    if tipo_entrega == "retiro":

        if metodo_pago not in metodos_retiro:

            return jsonify({
                "ok": False,
                "mensaje":
                    "El método de pago no es válido."
            }), 400


    if tipo_entrega == "envio":

        if metodo_pago not in metodos_envio:

            return jsonify({
                "ok": False,
                "mensaje":
                    "Para envío a domicilio tenés que pagar antes del despacho."
            }), 400


    # =====================================
    # VALIDAR CARRITO
    # =====================================

    if (
        not isinstance(
            items,
            list
        )
        or
        len(items) == 0
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "El carrito está vacío."
        }), 400


    # =====================================
    # CONEXIÓN
    # =====================================

    conexion = conectar_db()


    conexion.row_factory = sqlite3.Row


    cursor = conexion.cursor()


    try:

        # Bloqueamos escrituras mientras
        # validamos y creamos el pedido.

        cursor.execute(
            "BEGIN IMMEDIATE"
        )


        # =================================
        # DATOS DEL CLIENTE
        # =================================

        cursor.execute(
            """
            SELECT
                usuarios.id,
                usuarios.email,

                COALESCE(
                    perfiles_usuario.nombre,
                    usuarios.nombre
                ) AS nombre,

                COALESCE(
                    perfiles_usuario.apellido,
                    ''
                ) AS apellido,

                perfiles_usuario.telefono

            FROM usuarios

            LEFT JOIN perfiles_usuario
                ON perfiles_usuario.usuario_id =
                   usuarios.id

            WHERE usuarios.id = ?
            """,
            (usuario_id,)
        )


        cliente = cursor.fetchone()


        if cliente is None:

            conexion.rollback()

            return jsonify({
                "ok": False,
                "mensaje":
                    "No se encontró el usuario."
            }), 404


        nombre_cliente = (
            str(
                cliente["nombre"]
                or
                ""
            ).strip()
            +
            " "
            +
            str(
                cliente["apellido"]
                or
                ""
            ).strip()
        ).strip()


        email_cliente = (
            cliente["email"]
            or
            ""
        )


        telefono_cliente = (
            cliente["telefono"]
            or
            None
        )


        # =================================
        # DIRECCIÓN / RETIRO
        # =================================

        punto_retiro = None

        direccion = None


        if tipo_entrega == "retiro":

            punto_retiro = (
                "FarmaPlus Burzaco"
            )


        if tipo_entrega == "envio":

            if not direccion_id:

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "Elegí una dirección de entrega."
                }), 400


            cursor.execute(
                """
                SELECT
                    id,
                    alias,
                    calle,
                    numero,
                    piso,
                    departamento,
                    localidad,
                    provincia,
                    codigo_postal,
                    referencias

                FROM direcciones_usuario

                WHERE
                    id = ?
                    AND
                    usuario_id = ?
                """,
                (
                    direccion_id,
                    usuario_id
                )
            )


            direccion = (
                cursor.fetchone()
            )


            if direccion is None:

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "La dirección seleccionada no es válida."
                }), 400


        # =================================
        # VALIDAR PRODUCTOS
        # =================================

        productos_pedido = []

        subtotal = 0


        for item in items:

            if not isinstance(
                item,
                dict
            ):

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "Hay un producto inválido en el carrito."
                }), 400


            try:

                producto_id = int(
                    item.get(
                        "producto_id"
                    )
                )


                cantidad = int(
                    item.get(
                        "cantidad",
                        0
                    )
                )

            except (
                TypeError,
                ValueError
            ):

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "Hay un producto inválido en el carrito."
                }), 400


            if cantidad <= 0:

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "La cantidad de un producto no es válida."
                }), 400


            cursor.execute(
    """
    SELECT
        id,
        nombre,
        precio,
        en_oferta,
        precio_oferta,
        stock,
        estado,
        imagen_frente

    FROM productos

    WHERE id = ?
    """,
    (producto_id,)
)


            producto = (
                cursor.fetchone()
            )


            if producto is None:

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        "Uno de los productos ya no existe."
                }), 400

            if producto["estado"] != "Disponible":

                conexion.rollback()

                return jsonify({
                    "ok": False,
                    "mensaje":
                        (
                            producto["nombre"]
                            + " no está disponible actualmente."
                        ),
                    "producto_id":
                        producto["id"]
                }), 409


            stock_actual = max(
                0,
                int(
                    producto["stock"]
                    or
                    0
                )
            )


            if cantidad > stock_actual:

                conexion.rollback()

                return jsonify({
                    "ok": False,

                    "mensaje":
                        (
                            "No hay suficiente stock de "
                            +
                            producto["nombre"]
                            +
                            "."
                        ),

                    "producto_id":
                        producto["id"],

                    "stock_disponible":
                        stock_actual

                }), 409


            precio_normal = int(
                producto["precio"]
                or
                0
            )


            precio_oferta = int(
                producto["precio_oferta"]
                or
                0
            )


            tiene_oferta = (
                int(
                    producto["en_oferta"]
                    or
                    0
                ) == 1
                and
                precio_oferta > 0
                and
                precio_oferta <
                    precio_normal
            )


            if tiene_oferta:

                precio_unitario = (
                    precio_oferta
                )

            else:

                precio_unitario = (
                    precio_normal
                )


            subtotal_item = (
                precio_unitario
                *
                cantidad
            )


            subtotal += (
                subtotal_item
            )


            productos_pedido.append({
                "producto_id":
                    producto["id"],

                "nombre":
                    producto["nombre"],

                "precio_unitario":
                    precio_unitario,

                "cantidad":
                    cantidad,

                "subtotal":
                    subtotal_item,

                "imagen":
                    producto["imagen_frente"]
            })


        # =================================
        # PROMOCIÓN
        # =================================

        descuento = 0

        promocion = None


        if metodo_pago == "santander":

            descuento = (
                subtotal * 15 + 50
            ) // 100


            promocion = (
                "Santander 15%"
            )


        elif metodo_pago == "cuenta_dni":

            # Python:
            # lunes = 0
            # sábado = 5

            es_sabado = (
                datetime.now().weekday()
                == 5
            )


            if es_sabado:

                descuento = (
                    subtotal * 10 + 50
                ) // 100


                promocion = (
                    "Cuenta DNI sábado 10%"
                )


        # =================================
        # ENVÍO
        # =================================

        costo_envio = 0


        if (
            tipo_entrega == "envio"
            and
            subtotal < 50000
        ):

            costo_envio = 3500


        # =================================
        # TOTAL
        # =================================

        total = (
            subtotal
            -
            descuento
            +
            costo_envio
        )


        # =================================
        # CREAR PEDIDO
        # =================================

        cursor.execute(
            """
            INSERT INTO pedidos (

                usuario_id,
                estado,
                tipo_entrega,

                subtotal,
                descuento,
                promocion,
                costo_envio,
                total,

                estado_pago,
                metodo_pago,

                observaciones,

                nombre_cliente,
                email_cliente,
                telefono_cliente,

                punto_retiro,

                direccion_alias,
                direccion_calle,
                direccion_numero,
                direccion_piso,
                direccion_departamento,
                direccion_localidad,
                direccion_provincia,
                direccion_codigo_postal,
                direccion_referencias

            )

            VALUES (
                ?, ?, ?,
                ?, ?, ?, ?, ?,
                ?, ?,
                ?,
                ?, ?, ?,
                ?,
                ?, ?, ?, ?, ?,
                ?, ?, ?, ?
            )
            """,
            (
                usuario_id,
                "Pendiente",
                tipo_entrega,

                subtotal,
                descuento,
                promocion,
                costo_envio,
                total,

                "Pendiente",
                metodo_pago,

                None,

                nombre_cliente,
                email_cliente,
                telefono_cliente,

                punto_retiro,

                (
                    direccion["alias"]
                    if direccion
                    else None
                ),

                (
                    direccion["calle"]
                    if direccion
                    else None
                ),

                (
                    direccion["numero"]
                    if direccion
                    else None
                ),

                (
                    direccion["piso"]
                    if direccion
                    else None
                ),

                (
                    direccion["departamento"]
                    if direccion
                    else None
                ),

                (
                    direccion["localidad"]
                    if direccion
                    else None
                ),

                (
                    direccion["provincia"]
                    if direccion
                    else None
                ),

                (
                    direccion["codigo_postal"]
                    if direccion
                    else None
                ),

                (
                    direccion["referencias"]
                    if direccion
                    else None
                )
            )
        )


        pedido_id = (
            cursor.lastrowid
        )


        # =================================
        # ITEMS + DESCONTAR STOCK
        # =================================

        for item in productos_pedido:

            cantidad_item = (
                item["cantidad"]
            )


            # =================================
            # DESCONTAR STOCK
            # =================================

            cursor.execute(
                """
                UPDATE productos

                SET
                    stock = stock - ?,

                    estado =
                        CASE

                            WHEN stock - ? <= 0
                                THEN 'Agotado'

                            ELSE 'Disponible'

                        END

                WHERE
                    id = ?
                    AND
                    stock >= ?
                """,
                (
                    cantidad_item,
                    cantidad_item,
                    item["producto_id"],
                    cantidad_item
                )
            )


            # Si por algún motivo el stock
            # cambió antes de terminar,
            # cancelamos TODO el pedido.

            if cursor.rowcount != 1:

                conexion.rollback()

                return jsonify({
                    "ok": False,

                    "mensaje":
                        (
                            "El stock de "
                            +
                            item["nombre"]
                            +
                            " cambió mientras realizabas la compra."
                        )
                }), 409


            # =================================
            # GUARDAR ITEM DEL PEDIDO
            # =================================

            cursor.execute(
                """
                INSERT INTO pedido_items (

                    pedido_id,
                    producto_id,
                    nombre_producto,
                    precio_unitario,
                    cantidad,
                    subtotal,
                    imagen

                )

                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    pedido_id,
                    item["producto_id"],
                    item["nombre"],
                    item["precio_unitario"],
                    item["cantidad"],
                    item["subtotal"],
                    item["imagen"]
                )
            )


        conexion.commit()


        return jsonify({
            "ok": True,

            "mensaje":
                "Pedido creado correctamente.",

            "pedido": {
                "id":
                    pedido_id,

                "estado":
                    "Pendiente",

                "estado_pago":
                    "Pendiente",

                "tipo_entrega":
                    tipo_entrega,

                "metodo_pago":
                    metodo_pago,

                "subtotal":
                    subtotal,

                "descuento":
                    descuento,

                "promocion":
                    promocion,

                "costo_envio":
                    costo_envio,

                "total":
                    total
            }

        }), 201


    except sqlite3.Error as error:

        conexion.rollback()


        print(
            "Error al crear pedido:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo crear el pedido."
        }), 500


    finally:

        conexion.close()

# =========================================
# CERRAR SESIÓN
# =========================================

@app.route("/api/logout", methods=["POST"])
def cerrar_sesion():

    session.clear()

    return jsonify({
        "ok": True,
        "mensaje": "Sesión cerrada correctamente."
    }), 200

# =========================================
# PANEL DE ADMINISTRACIÓN
# =========================================

@app.route("/admin")
def panel_admin():

    if "usuario_id" not in session:

        return redirect("/login.html")


    if session.get("rol") != "admin":

        return redirect("/productos.html")


    return send_from_directory(
        CARPETA_PROYECTO,
        "admin.html"
    )

# =========================================
# ADMINISTRAR PEDIDOS
# =========================================

@app.route("/admin/pedidos")
def administrar_pedidos():

    if "usuario_id" not in session:

        return redirect("/login.html")


    if session.get("rol") != "admin":

        return redirect("/productos.html")


    return send_from_directory(
        CARPETA_PROYECTO,
        "admin-pedidos.html"
    )

# =========================================
# OBTENER PEDIDOS PARA ADMIN
# =========================================

@app.route(
    "/api/admin/pedidos",
    methods=["GET"]
)
def obtener_pedidos_admin():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje":
                "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    try:

        cursor.execute(
            """
            SELECT
                id,
                nombre_cliente,
                email_cliente,
                tipo_entrega,
                total,
                metodo_pago,
                estado,
                estado_pago,
                fecha_creacion

            FROM pedidos

            ORDER BY
                fecha_creacion DESC,
                id DESC
            """
        )


        pedidos = [
            dict(pedido)
            for pedido in cursor.fetchall()
        ]


        return jsonify({
            "ok": True,
            "pedidos": pedidos
        }), 200


    except sqlite3.Error as error:

        print(
            "Error al obtener pedidos:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudieron obtener los pedidos."
        }), 500


    finally:

        conexion.close()

# =========================================
# OBTENER DETALLE DE PEDIDO PARA ADMIN
# =========================================

@app.route(
    "/api/admin/pedidos/<int:pedido_id>",
    methods=["GET"]
)
def obtener_detalle_pedido_admin(pedido_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje":
                "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    try:

        # =====================================
        # DATOS GENERALES DEL PEDIDO
        # =====================================

        cursor.execute(
            """
            SELECT
                id,
                estado,
                tipo_entrega,

                subtotal,
                descuento,
                promocion,
                costo_envio,
                total,

                estado_pago,
                metodo_pago,
                observaciones,

                nombre_cliente,
                email_cliente,
                telefono_cliente,

                punto_retiro,

                direccion_alias,
                direccion_calle,
                direccion_numero,
                direccion_piso,
                direccion_departamento,
                direccion_localidad,
                direccion_provincia,
                direccion_codigo_postal,
                direccion_referencias,

                fecha_creacion,
                fecha_actualizacion

            FROM pedidos

            WHERE id = ?
            """,
            (pedido_id,)
        )


        pedido = cursor.fetchone()


        if pedido is None:

            return jsonify({
                "ok": False,
                "mensaje":
                    "El pedido no existe."
            }), 404


        # =====================================
        # PRODUCTOS DEL PEDIDO
        # =====================================

        cursor.execute(
            """
            SELECT
                id,
                producto_id,
                nombre_producto,
                precio_unitario,
                cantidad,
                subtotal,
                imagen

            FROM pedido_items

            WHERE pedido_id = ?

            ORDER BY id ASC
            """,
            (pedido_id,)
        )


        items = [
            dict(item)
            for item in cursor.fetchall()
        ]


        return jsonify({
            "ok": True,
            "pedido": dict(pedido),
            "items": items
        }), 200


    except sqlite3.Error as error:

        print(
            "Error al obtener detalle del pedido:",
            error
        )


        return jsonify({
            "ok": False,
            "mensaje":
                "No se pudo obtener el detalle del pedido."
        }), 500


    finally:

        conexion.close()

# =========================================
# PÁGINA EDITAR PRODUCTO
# =========================================

@app.route(
    "/admin/productos/editar/<int:producto_id>"
)
def pagina_editar_producto(producto_id):

    if "usuario_id" not in session:

        return redirect(
            "/login.html"
        )


    if session.get("rol") != "admin":

        return redirect(
            "/productos.html"
        )


    return send_from_directory(
        CARPETA_PROYECTO,
        "editar-producto.html"
    )

# =========================================
# ADMINISTRAR PRODUCTOS
# =========================================

@app.route("/api/admin/productos", methods=["POST"])
def crear_producto():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje": "No tenés permisos para realizar esta acción."
        }), 403


    # =========================================
    # DATOS DEL FORMULARIO
    # =========================================

    nombre = request.form.get(
        "nombre",
        ""
    ).strip()


    categoria = request.form.get(
        "categoria",
        ""
    ).strip()


    descripcion_corta = request.form.get(
        "descripcion_corta",
        ""
    ).strip()


    descripcion_larga = request.form.get(
        "descripcion_larga",
        ""
    ).strip()


    estado = request.form.get(
        "estado",
        "Disponible"
    ).strip()

    


    try:

        precio = int(
            request.form.get(
                "precio",
                0
            )
        )

    except (TypeError, ValueError):

        precio = 0

    try:

        stock = int(
            request.form.get(
                "stock",
                0
            )
        )

    except (TypeError, ValueError):

        stock = -1

    # =========================================
    # IMÁGENES
    # =========================================

    imagen_frente_archivo = (
        request.files.get(
            "imagen_frente"
        )
    )


    imagen_dorso_archivo = (
        request.files.get(
            "imagen_dorso"
        )
    )


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(nombre) < 2:

        return jsonify({
            "ok": False,
            "mensaje":
                "Ingresá un nombre válido."
        }), 400


    categorias_validas = [
        "Cuidado personal",
        "Piel",
        "Higiene",
        "Medicamentos"
    ]


    if categoria not in categorias_validas:

        return jsonify({
            "ok": False,
            "mensaje":
                "Seleccioná una categoría válida."
        }), 400


    if precio <= 0:

        return jsonify({
            "ok": False,
            "mensaje":
                "El precio debe ser mayor a $0."
        }), 400

    if stock < 0:

        return jsonify({
            "ok": False,
            "mensaje":
                "El stock no puede ser negativo."
        }), 400

        # =========================================
    # ESTADO AUTOMÁTICO SEGÚN STOCK
    # =========================================

    if stock > 0:

        estado = "Disponible"

    else:

        estado = "Agotado"


    if (
        imagen_frente_archivo is None
        or imagen_frente_archivo.filename == ""
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "Seleccioná la imagen frontal."
        }), 400


    if (
        imagen_dorso_archivo is None
        or imagen_dorso_archivo.filename == ""
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "Seleccioná la imagen trasera."
        }), 400


    # =========================================
    # GUARDAR IMÁGENES
    # =========================================

    try:

        imagen_frente = (
            guardar_imagen_producto(
                imagen_frente_archivo
            )
        )


        imagen_dorso = (
            guardar_imagen_producto(
                imagen_dorso_archivo
            )
        )


    except ValueError as error:

        return jsonify({
            "ok": False,
            "mensaje": str(error)
        }), 400


    # =========================================
    # GUARDAR PRODUCTO
    # =========================================

    conexion = conectar_db()


    cursor = conexion.cursor()


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
    )


    producto_id = cursor.lastrowid


    # =========================================
    # CREAR GALERÍA INICIAL DEL PRODUCTO
    # =========================================

    cursor.execute(
        """
        INSERT INTO imagenes_producto (
            producto_id,
            ruta,
            orden,
            es_principal
        )

        VALUES (?, ?, ?, ?)
        """,
        (
            producto_id,
            imagen_frente,
            0,
            1
        )
    )


    cursor.execute(
        """
        INSERT INTO imagenes_producto (
            producto_id,
            ruta,
            orden,
            es_principal
        )

        VALUES (?, ?, ?, ?)
        """,
        (
            producto_id,
            imagen_dorso,
            1,
            0
        )
    )


    conexion.commit()

    conexion.close()


    return jsonify({
        "ok": True,

        "mensaje":
            "Producto creado correctamente.",

        "producto_id":
            producto_id

    }), 201

# =========================================
# LISTAR PRODUCTOS DEL ADMIN
# =========================================

@app.route("/api/admin/productos", methods=["GET"])
def listar_productos_admin():

    if "usuario_id" not in session:

        return jsonify({
            "ok": False
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False
        }), 403


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    cursor.execute(
        """
        SELECT
            id,
            nombre,
            categoria,
            precio,
            descripcion_corta,
            descripcion_larga,
            estado,
            imagen_frente,
            imagen_dorso,
            en_oferta,
            descuento_porcentaje,
            precio_oferta

        FROM productos

        ORDER BY id DESC
        """
    )


    filas = cursor.fetchall()

    conexion.close()


    productos = []


    for fila in filas:

        productos.append(
            dict(fila)
        )


    return jsonify({
        "ok": True,
        "productos": productos
    }), 200

# =========================================
# EDITAR PRODUCTO
# =========================================

@app.route(
    "/api/admin/productos/<int:producto_id>",
    methods=["PUT"]
)
def editar_producto(producto_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401

    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403

    try:

        stock = int(
            request.form.get(
                "stock",
                0
            )
        )

    except (TypeError, ValueError):

        stock = -1


    if stock < 0:

        return jsonify({
            "ok": False,
            "mensaje":
                "El stock no puede ser negativo."
        }), 400

    # =========================================
    # ESTADO AUTOMÁTICO SEGÚN STOCK
    # =========================================

    if stock > 0:

        estado = "Disponible"

    else:

        estado = "Agotado"    

    # =========================================
    # DATOS DEL PRODUCTO
    # =========================================

    nombre = request.form.get(
        "nombre",
        ""
    ).strip()


    categoria = request.form.get(
        "categoria",
        ""
    ).strip()


    descripcion_corta = request.form.get(
        "descripcion_corta",
        ""
    ).strip()


    descripcion_larga = request.form.get(
        "descripcion_larga",
        ""
    ).strip()


    estado = request.form.get(
        "estado",
        "Disponible"
    ).strip()


    try:

        precio = int(
            request.form.get(
                "precio",
                0
            )
        )

    except (TypeError, ValueError):

        precio = 0


    # =========================================
    # OFERTA
    # =========================================

    en_oferta = (
        request.form.get(
            "en_oferta",
            "0"
        ) == "1"
    )


    descuento_porcentaje = None

    precio_oferta = None


    if en_oferta:

        descuento_texto = request.form.get(
            "descuento_porcentaje",
            ""
        ).strip()


        try:

            descuento_porcentaje = int(
                descuento_texto
            )

        except (TypeError, ValueError):

            descuento_porcentaje = 0


    # =========================================
    # VALIDACIONES
    # =========================================

    if len(nombre) < 2:

        return jsonify({
            "ok": False,
            "mensaje": "Ingresá un nombre válido."
        }), 400


    categorias_validas = [
        "Cuidado personal",
        "Piel",
        "Higiene",
        "Medicamentos"
    ]


    if categoria not in categorias_validas:

        return jsonify({
            "ok": False,
            "mensaje": "Seleccioná una categoría válida."
        }), 400


    if precio <= 0:

        return jsonify({
            "ok": False,
            "mensaje": "El precio debe ser mayor a $0."
        }), 400


    if estado not in [
        "Disponible",
        "Agotado"
    ]:

        return jsonify({
            "ok": False,
            "mensaje": "Estado de producto no válido."
        }), 400


    # =========================================
    # VALIDAR Y CALCULAR OFERTA
    # =========================================

    if en_oferta:

        if (
            descuento_porcentaje is None
            or descuento_porcentaje < 1
            or descuento_porcentaje > 99
        ):

            return jsonify({
                "ok": False,
                "mensaje":
                    "El descuento debe estar entre 1% y 99%."
            }), 400


        descuento_dinero = (
            precio
            * descuento_porcentaje
            / 100
        )


        precio_oferta = round(
            precio - descuento_dinero
        )


        if precio_oferta < 1:

            precio_oferta = 1


    # =========================================
    # BUSCAR PRODUCTO ACTUAL
    # =========================================

    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    cursor.execute(
        """
        SELECT
            id,
            imagen_frente,
            imagen_dorso

        FROM productos

        WHERE id = ?
        """,
        (producto_id,)
    )


    producto_actual = cursor.fetchone()


    if producto_actual is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": "El producto no existe."
        }), 404


    imagen_frente = producto_actual[
        "imagen_frente"
    ]

    imagen_dorso = producto_actual[
        "imagen_dorso"
    ]


    # =========================================
    # NUEVAS IMÁGENES OPCIONALES
    # =========================================

    imagen_frente_archivo = (
        request.files.get(
            "imagen_frente"
        )
    )


    imagen_dorso_archivo = (
        request.files.get(
            "imagen_dorso"
        )
    )


    try:

        if (
            imagen_frente_archivo is not None
            and imagen_frente_archivo.filename != ""
        ):

            imagen_frente = (
                guardar_imagen_producto(
                    imagen_frente_archivo
                )
            )


        if (
            imagen_dorso_archivo is not None
            and imagen_dorso_archivo.filename != ""
        ):

            imagen_dorso = (
                guardar_imagen_producto(
                    imagen_dorso_archivo
                )
            )


    except ValueError as error:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": str(error)
        }), 400


    # =========================================
    # ACTUALIZAR PRODUCTO
    # =========================================

    cursor.execute(
        """
        UPDATE productos

        SET
            nombre = ?,
            categoria = ?,
            precio = ?,
            stock = ?,
            descripcion_corta = ?,
            descripcion_larga = ?,
            estado = ?,
            imagen_frente = ?,
            imagen_dorso = ?,
            en_oferta = ?,
            descuento_porcentaje = ?,
            precio_oferta = ?

        WHERE id = ?
        """,
        (
            nombre,
            categoria,
            precio,
            stock,
            descripcion_corta,
            descripcion_larga,
            estado,
            imagen_frente,
            imagen_dorso,
            1 if en_oferta else 0,
            descuento_porcentaje,
            precio_oferta,
            producto_id
        )
    )


    conexion.commit()

    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje": "Producto actualizado correctamente.",
        "oferta": {
            "activa": en_oferta,
            "descuento_porcentaje":
                descuento_porcentaje,
            "precio_normal":
                precio,
            "precio_oferta":
                precio_oferta
        }
    }), 200

# =========================================
# ADMINISTRAR PRODUCTOS
# =========================================

@app.route("/admin/productos")
def administrar_productos():

    if "usuario_id" not in session:

        return redirect("/login.html")


    if session.get("rol") != "admin":

        return redirect("/productos.html")


    return send_from_directory(
        CARPETA_PROYECTO,
        "admin-productos.html"
    )

@app.route("/api/productos/<int:producto_id>", methods=["GET"])
def obtener_producto_tienda(producto_id):

    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # PRODUCTO
    # =========================================

    cursor.execute(
        """
        SELECT
            id,
            nombre,
            categoria,
            precio,
            stock,
            descripcion_corta,
            descripcion_larga,
            estado,
            imagen_frente,
            imagen_dorso,
            en_oferta,
            descuento_porcentaje,
            precio_oferta

        FROM productos

        WHERE id = ?
        """,
        (producto_id,)
    )


    fila = cursor.fetchone()


    if fila is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": "Producto no encontrado."
        }), 404


# =========================================
# IMÁGENES DEL PRODUCTO
# =========================================

    cursor.execute(
        """
        SELECT
            id,
            ruta,
            orden,
            es_principal

        FROM imagenes_producto

        WHERE producto_id = ?

        ORDER BY
            es_principal DESC,
            orden ASC,
            id ASC
        """,
        (producto_id,)
    )


    imagenes = [
        dict(imagen)
        for imagen in cursor.fetchall()
    ]


    producto = dict(fila)

    producto["imagenes"] = imagenes


    conexion.close()


    return jsonify({
        "ok": True,
        "producto": producto
    }), 200

# =========================================
# AGREGAR IMAGEN A UN PRODUCTO
# =========================================

@app.route(
    "/api/admin/productos/<int:producto_id>/imagenes",
    methods=["POST"]
)
def agregar_imagen_producto(producto_id):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403


    archivo = request.files.get(
        "imagen"
    )


    if (
        archivo is None
        or archivo.filename == ""
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "Seleccioná una imagen."
        }), 400


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # COMPROBAR PRODUCTO
    # =========================================

    cursor.execute(
        """
        SELECT id

        FROM productos

        WHERE id = ?
        """,
        (producto_id,)
    )


    if cursor.fetchone() is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje":
                "El producto no existe."
        }), 404


    # =========================================
    # MÁXIMO 8 IMÁGENES
    # =========================================

    cursor.execute(
        """
        SELECT COUNT(*)

        FROM imagenes_producto

        WHERE producto_id = ?
        """,
        (producto_id,)
    )


    cantidad_imagenes = (
        cursor.fetchone()[0]
    )


    if cantidad_imagenes >= 8:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje":
                "El producto ya tiene el máximo de 8 imágenes."
        }), 400


    # =========================================
    # GUARDAR ARCHIVO
    # =========================================

    try:

        ruta = guardar_imagen_producto(
            archivo
        )

    except ValueError as error:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": str(error)
        }), 400


    # =========================================
    # CALCULAR ORDEN
    # =========================================

    cursor.execute(
        """
        SELECT
            COALESCE(
                MAX(orden),
                -1
            )

        FROM imagenes_producto

        WHERE producto_id = ?
        """,
        (producto_id,)
    )


    ultimo_orden = (
        cursor.fetchone()[0]
    )


    nuevo_orden = (
        ultimo_orden + 1
    )


    # Si por algún motivo el producto
    # todavía no tenía imágenes,
    # la nueva será principal.

    es_principal = (
        1
        if cantidad_imagenes == 0
        else 0
    )


    # =========================================
    # GUARDAR EN LA BASE
    # =========================================

    cursor.execute(
        """
        INSERT INTO imagenes_producto (
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
            nuevo_orden,
            es_principal
        )
    )


    imagen_id = (
        cursor.lastrowid
    )


    # Compatibilidad temporal con
    # imagen_frente del sistema anterior.

    if es_principal == 1:

        cursor.execute(
            """
            UPDATE productos

            SET imagen_frente = ?

            WHERE id = ?
            """,
            (
                ruta,
                producto_id
            )
        )


    conexion.commit()

    conexion.close()


    return jsonify({
        "ok": True,

        "mensaje":
            "Imagen agregada correctamente.",

        "imagen": {
            "id":
                imagen_id,

            "ruta":
                ruta,

            "orden":
                nuevo_orden,

            "es_principal":
                es_principal
        }

    }), 201

# =========================================
# ELIMINAR IMAGEN DE UN PRODUCTO
# =========================================

@app.route(
    "/api/admin/productos/<int:producto_id>/imagenes/<int:imagen_id>",
    methods=["DELETE"]
)
def eliminar_imagen_producto(
    producto_id,
    imagen_id
):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # BUSCAR LA IMAGEN
    # =========================================

    cursor.execute(
        """
        SELECT
            id,
            ruta,
            orden,
            es_principal

        FROM imagenes_producto

        WHERE
            id = ?
            AND producto_id = ?
        """,
        (
            imagen_id,
            producto_id
        )
    )


    imagen_eliminada = cursor.fetchone()


    if imagen_eliminada is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje":
                "La imagen no existe."
        }), 404


    # =========================================
    # ELIMINAR IMAGEN
    # =========================================

    cursor.execute(
        """
        DELETE FROM imagenes_producto

        WHERE
            id = ?
            AND producto_id = ?
        """,
        (
            imagen_id,
            producto_id
        )
    )


    # =========================================
    # OBTENER IMÁGENES RESTANTES
    # =========================================

    cursor.execute(
        """
        SELECT
            id,
            ruta,
            orden,
            es_principal

        FROM imagenes_producto

        WHERE producto_id = ?

        ORDER BY
            es_principal DESC,
            orden ASC,
            id ASC
        """,
        (producto_id,)
    )


    imagenes_restantes = (
        cursor.fetchall()
    )


    # =========================================
    # SI NO QUEDAN IMÁGENES
    # =========================================

    if len(imagenes_restantes) == 0:

        cursor.execute(
            """
            UPDATE productos

            SET
                imagen_frente = NULL,
                imagen_dorso = NULL

            WHERE id = ?
            """,
            (producto_id,)
        )


        conexion.commit()

        conexion.close()


        return jsonify({
            "ok": True,
            "mensaje":
                "Imagen eliminada correctamente."
        }), 200


    # =========================================
    # DETERMINAR IMAGEN PRINCIPAL
    # =========================================

    imagen_principal = None


    for imagen in imagenes_restantes:

        if imagen["es_principal"] == 1:

            imagen_principal = imagen

            break


    # Si eliminamos la principal,
    # elegimos automáticamente otra.

    if imagen_principal is None:

        imagen_principal = (
            imagenes_restantes[0]
        )


    # =========================================
    # PONER PRINCIPAL PRIMERO
    # =========================================

    imagenes_ordenadas = [
        imagen_principal
    ]


    for imagen in imagenes_restantes:

        if (
            imagen["id"]
            != imagen_principal["id"]
        ):

            imagenes_ordenadas.append(
                imagen
            )


    # =========================================
    # REORDENAR 0, 1, 2, 3...
    # Y DEJAR UNA SOLA PRINCIPAL
    # =========================================

    for indice, imagen in enumerate(
        imagenes_ordenadas
    ):

        cursor.execute(
            """
            UPDATE imagenes_producto

            SET
                orden = ?,
                es_principal = ?

            WHERE
                id = ?
                AND producto_id = ?
            """,
            (
                indice,
                1 if indice == 0 else 0,
                imagen["id"],
                producto_id
            )
        )


    # =========================================
    # PRINCIPAL Y TRASERA
    # =========================================

    imagen_principal = (
        imagenes_ordenadas[0]
    )


    imagen_secundaria = None


    if len(imagenes_ordenadas) > 1:

        imagen_secundaria = (
            imagenes_ordenadas[1]
        )


    # =========================================
    # SINCRONIZAR SISTEMA ANTERIOR
    # =========================================

    cursor.execute(
        """
        UPDATE productos

        SET
            imagen_frente = ?,
            imagen_dorso = ?

        WHERE id = ?
        """,
        (
            imagen_principal["ruta"],
            (
                imagen_secundaria["ruta"]
                if imagen_secundaria
                else None
            ),
            producto_id
        )
    )


    conexion.commit()

    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Imagen eliminada correctamente."
    }), 200

# =========================================
# REEMPLAZAR IMAGEN DE UN PRODUCTO
# =========================================

@app.route(
    "/api/admin/productos/<int:producto_id>/imagenes/<int:imagen_id>",
    methods=["PUT"]
)
def reemplazar_imagen_producto(
    producto_id,
    imagen_id
):

    if "usuario_id" not in session:

        return jsonify({
            "ok": False,
            "mensaje": "Tenés que iniciar sesión."
        }), 401


    if session.get("rol") != "admin":

        return jsonify({
            "ok": False,
            "mensaje":
                "No tenés permisos para realizar esta acción."
        }), 403


    archivo = request.files.get(
        "imagen"
    )


    if (
        archivo is None
        or archivo.filename == ""
    ):

        return jsonify({
            "ok": False,
            "mensaje":
                "Seleccioná una imagen."
        }), 400


    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    # =========================================
    # BUSCAR IMAGEN ACTUAL
    # =========================================

    cursor.execute(
        """
        SELECT
            ip.id,
            ip.ruta,
            ip.es_principal,
            p.imagen_frente,
            p.imagen_dorso

        FROM imagenes_producto AS ip

        INNER JOIN productos AS p
            ON p.id = ip.producto_id

        WHERE
            ip.id = ?
            AND ip.producto_id = ?
        """,
        (
            imagen_id,
            producto_id
        )
    )


    imagen_actual = cursor.fetchone()


    if imagen_actual is None:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje":
                "La imagen no existe."
        }), 404


    # =========================================
    # GUARDAR NUEVO ARCHIVO
    # =========================================

    try:

        nueva_ruta = guardar_imagen_producto(
            archivo
        )

    except ValueError as error:

        conexion.close()

        return jsonify({
            "ok": False,
            "mensaje": str(error)
        }), 400


    # =========================================
    # ACTUALIZAR GALERÍA
    # =========================================

    cursor.execute(
        """
        UPDATE imagenes_producto

        SET ruta = ?

        WHERE
            id = ?
            AND producto_id = ?
        """,
        (
            nueva_ruta,
            imagen_id,
            producto_id
        )
    )


    # =========================================
    # SINCRONIZAR SISTEMA ANTERIOR
    # =========================================

    if imagen_actual["es_principal"] == 1:

        cursor.execute(
            """
            UPDATE productos

            SET imagen_frente = ?

            WHERE id = ?
            """,
            (
                nueva_ruta,
                producto_id
            )
        )


    elif (
        imagen_actual["imagen_dorso"]
        ==
        imagen_actual["ruta"]
    ):

        cursor.execute(
            """
            UPDATE productos

            SET imagen_dorso = ?

            WHERE id = ?
            """,
            (
                nueva_ruta,
                producto_id
            )
        )


    conexion.commit()

    conexion.close()


    return jsonify({
        "ok": True,
        "mensaje":
            "Imagen reemplazada correctamente.",
        "imagen": {
            "id": imagen_id,
            "ruta": nueva_ruta,
            "es_principal":
                imagen_actual["es_principal"]
        }
    }), 200

# =========================================
# IMÁGENES PERSISTENTES DE PRODUCTOS
# =========================================

@app.route(
    "/uploads/productos/<path:nombre_archivo>"
)
def imagen_producto_persistente(
    nombre_archivo
):

    if not RUTA_VOLUMEN:

        abort(404)

    return send_from_directory(
        CARPETA_IMAGENES_PRODUCTOS,
        nombre_archivo
    )

# =========================================
# ARCHIVOS DEL PROYECTO
# =========================================

@app.route("/<path:archivo>")
def archivos(archivo):

    archivos_admin = {
        "admin.html",
        "admin-productos.html",
        "admin-pedidos.html",
        "editar-producto.html"
    }


    if archivo.lower() in archivos_admin:

        abort(404)

    extensiones_permitidas = (
        ".html",
        ".css",
        ".js",
        ".png",
        ".jpg",
        ".jpeg",
        ".webp"
    )

    if not archivo.lower().endswith(
        extensiones_permitidas
    ):

        abort(404)


    return send_from_directory(
        CARPETA_PROYECTO,
        archivo
    )

# =========================================
# PRODUCTOS DE LA TIENDA
# =========================================

@app.route("/api/productos", methods=["GET"])
def listar_productos_tienda():

    conexion = conectar_db()

    conexion.row_factory = sqlite3.Row

    cursor = conexion.cursor()


    cursor.execute(
        """
                SELECT
            id,
            nombre,
            categoria,
            precio,
            stock,
            descripcion_corta,
            descripcion_larga,
            estado,
            imagen_frente,
            imagen_dorso,
            en_oferta,
            descuento_porcentaje,
            precio_oferta

        FROM productos

        ORDER BY id DESC
        """
    )


    filas = cursor.fetchall()

    conexion.close()


    productos = []


    for fila in filas:

        productos.append(
            dict(fila)
        )


    return jsonify({
        "ok": True,
        "productos": productos
    }), 200

# =========================================
# INICIAR FARMA PLUS
# =========================================

crear_base_datos()


if __name__ == "__main__":

    app.run(
        debug=os.environ.get("FLASK_DEBUG") == "1"
    )
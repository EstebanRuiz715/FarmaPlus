# FarmaPlus

FarmaPlus es una aplicación web de farmacia desarrollada como proyecto de demostración y portfolio.

El sistema permite navegar por un catálogo de productos, registrarse e iniciar sesión, gestionar un perfil y direcciones, utilizar un carrito de compras, realizar un checkout simulado y administrar productos y pedidos desde un panel de administración.

> **Importante:** FarmaPlus es un proyecto ficticio de demostración. No procesa pagos reales y los productos, marcas y descripciones del catálogo se utilizan únicamente con fines educativos y de portfolio.

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Contraseñas almacenadas mediante hash seguro con Werkzeug.
- Sesiones de usuario con Flask.
- Roles de usuario: cliente, empleado y administrador.
- Perfil de usuario y gestión de direcciones.
- Catálogo de productos conectado a SQLite.
- Detalle de producto con galería de imágenes.
- Stock y estado de disponibilidad.
- Productos con ofertas.
- Carrito de compras persistido en el navegador.
- Checkout con retiro en sucursal o envío a domicilio.
- Cálculo de promociones y costo de envío desde el backend.
- Creación de pedidos con actualización transaccional del stock.
- Panel administrativo de productos.
- Panel administrativo de pedidos y detalle de cada pedido.
- Carga y gestión de imágenes de productos.
- Soporte para almacenamiento persistente mediante un volumen en producción.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- Python
- Flask
- SQLite
- Werkzeug
- python-dotenv
- Gunicorn

## Estructura general

```text
FarmaPlus/
├── app.py
├── seed_demo.py
├── requirements.txt
├── .env.example
├── .gitignore
├── farmaplus.db
├── img/
├── index.html
├── productos.html
├── producto.html
├── login.html
├── registro.html
├── perfil.html
├── checkout.html
├── pedido-confirmado.html
├── admin.html
├── admin-productos.html
├── editar-producto.html
├── admin-pedidos.html
└── archivos JavaScript y CSS
```

## Instalación local

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd FarmaPlus
```

### 2. Crear un entorno virtual

En Windows:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Instalar dependencias

```powershell
pip install -r requirements.txt
```

### 4. Configurar variables de entorno

Crear un archivo `.env` a partir de `.env.example`.

Ejemplo:

```env
SECRET_KEY=tu_clave_secreta_real
FLASK_DEBUG=1
```

Para generar una clave segura se puede utilizar:

```powershell
py -c "import secrets; print(secrets.token_hex(32))"
```

La clave real debe guardarse únicamente en `.env`.

**No subir `.env` al repositorio.**

### 5. Inicializar la aplicación

```powershell
py .\app.py
```

Al iniciarse, FarmaPlus crea las tablas necesarias si todavía no existen.

### 6. Cargar el catálogo de demostración

Con la base ya inicializada:

```powershell
py .\seed_demo.py
```

El script evita duplicar productos existentes con el mismo nombre.

### 7. Ejecutar FarmaPlus

```powershell
py .\app.py
```

Abrir en el navegador:

```text
http://127.0.0.1:5000
```

## Variables de entorno

### `SECRET_KEY`

Clave utilizada por Flask para proteger la sesión.

Debe ser privada y diferente en cada entorno.

### `FLASK_DEBUG`

Para desarrollo local:

```env
FLASK_DEBUG=1
```

En producción no debe habilitarse el modo debug.

### `RAILWAY_VOLUME_MOUNT_PATH`

Cuando la aplicación se ejecuta en Railway con un volumen persistente, FarmaPlus utiliza automáticamente esta ruta para almacenar:

- `farmaplus.db`
- imágenes nuevas cargadas desde el panel administrativo

En local, si esta variable no existe, FarmaPlus continúa utilizando los archivos dentro de la carpeta del proyecto.

## Base de datos

FarmaPlus utiliza SQLite.

Entre las entidades principales se encuentran:

- usuarios
- perfiles de usuario
- direcciones
- productos
- imágenes de productos
- pedidos
- productos de cada pedido

Las claves foráneas de SQLite se habilitan automáticamente en cada conexión.

## Pedidos y stock

El backend vuelve a calcular los precios y valida el stock antes de crear cada pedido.

La creación del pedido y la reducción del stock se realizan dentro de una transacción para evitar guardar operaciones parciales.

El frontend no es la fuente de verdad para precios, descuentos ni disponibilidad.

## Métodos de pago

Los métodos de pago que aparecen en FarmaPlus son **simulados**.

Pueden mostrarse opciones como:

- Mercado Pago
- Cuenta DNI
- Santander
- Pago en sucursal

No existe una integración real con pasarelas de pago y no se procesan transacciones financieras.

## Productos del catálogo

Las marcas y productos utilizados en la demo son ficticios.

Algunos artículos representan categorías farmacéuticas o de cuidado personal únicamente para mostrar las funciones del ecommerce.

Las descripciones de medicamentos ficticios no constituyen indicaciones, diagnósticos, tratamientos ni recomendaciones médicas.

## Seguridad

El proyecto incluye, entre otras medidas:

- hash de contraseñas con Werkzeug;
- validación de permisos administrativos desde el backend;
- cookies de sesión `HttpOnly`;
- `SameSite=Lax`;
- cookies `Secure` en producción;
- validaciones de stock y disponibilidad en el servidor;
- claves foráneas activadas en SQLite;
- variables sensibles fuera del repositorio mediante `.env`.

Las credenciales privadas del administrador no forman parte del repositorio.

## Producción

La aplicación está preparada para ejecutarse con Gunicorn.

El almacenamiento persistente debe incluir tanto la base SQLite como las imágenes subidas durante la ejecución.

Para una aplicación comercial real con mayor concurrencia se recomienda utilizar una base de datos de producción como PostgreSQL y un servicio dedicado de almacenamiento de archivos.

## Estado del proyecto

FarmaPlus v1 está orientado a demostración y portfolio.

Funcionalidades como pagos reales, recuperación de contraseña, notificaciones por correo, administración avanzada de usuarios, gestión compleja de estados de pedidos y devolución automática de stock pueden incorporarse como futuras extensiones.

## Licencia y uso

Este proyecto fue creado con fines educativos, demostrativos y de portfolio.

Los nombres, marcas, imágenes y productos ficticios utilizados dentro de FarmaPlus no representan necesariamente productos comerciales reales.

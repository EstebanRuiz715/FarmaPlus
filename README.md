# FarmaPlus

[English](README.md) | [Español](README.es.md)

## Live Demo

FarmaPlus is deployed and available online:

👉 [Open FarmaPlus](https://farmaplus-production-baa0.up.railway.app)

> FarmaPlus is a portfolio/demo project. Payments are simulated and no real transactions are processed.

FarmaPlus is a pharmacy web application developed as a demonstration and portfolio project.

The system allows users to browse a product catalog, register and log in, manage a profile and delivery addresses, use a shopping cart, complete a simulated checkout, and manage products and orders from an administration panel.

> **Important:** FarmaPlus is a fictional demonstration project. It does not process real payments, and the products, brands, and catalog descriptions are used only for educational and portfolio purposes.

## Features

- User registration and login.
- Password hashing with Werkzeug.
- User sessions with Flask.
- User roles: customer, employee, and administrator.
- User profile and address management.
- Product catalog connected to SQLite.
- Product detail pages with image galleries.
- Stock and availability status.
- Product offers and discounts.
- Shopping cart persisted in the browser.
- Checkout with in-store pickup or home delivery.
- Backend calculation of promotions and shipping costs.
- Order creation with transactional stock updates.
- Product administration panel.
- Order administration panel with order details.
- Product image upload and management.
- Support for persistent storage through a production volume.

## Technologies

- HTML5
- CSS3
- JavaScript
- Python
- Flask
- SQLite
- Werkzeug
- python-dotenv
- Gunicorn

## Project Structure

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
└── JavaScript and CSS files
```

## Local Installation

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd FarmaPlus
```

### 2. Create a virtual environment

On Windows:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
SECRET_KEY=your_real_secret_key
FLASK_DEBUG=1
```

You can generate a secure secret key with:

```powershell
py -c "import secrets; print(secrets.token_hex(32))"
```

The real secret key must only be stored in `.env`.

**Do not commit `.env` to the repository.**

### 5. Initialize the application

```powershell
py .\app.py
```

When the application starts, FarmaPlus creates the required database tables if they do not already exist.

### 6. Load the demo catalog

After the database has been initialized:

```powershell
py .\seed_demo.py
```

The script avoids duplicating products with the same name.

### 7. Run FarmaPlus

```powershell
py .\app.py
```

Open in your browser:

```text
http://127.0.0.1:5000
```

## Environment Variables

### `SECRET_KEY`

Secret key used by Flask to protect sessions.

It must remain private and should be different for each environment.

### `FLASK_DEBUG`

For local development:

```env
FLASK_DEBUG=1
```

Debug mode should not be enabled in production.

### `RAILWAY_VOLUME_MOUNT_PATH`

When the application runs on Railway with a persistent volume, FarmaPlus automatically uses this path to store:

- `farmaplus.db`
- new product images uploaded from the administration panel

When running locally, if this variable does not exist, FarmaPlus continues using files inside the project directory.

## Database

FarmaPlus uses SQLite.

Main entities include:

- users
- user profiles
- addresses
- products
- product images
- orders
- order items

SQLite foreign key support is enabled automatically on every database connection.

## Orders and Stock

The backend recalculates prices and validates stock before creating each order.

Order creation and stock reduction are performed within a transaction to avoid partial updates.

The frontend is not the source of truth for prices, discounts, or product availability.

## Payment Methods

The payment methods displayed in FarmaPlus are **simulated**.

The interface may display options such as:

- Mercado Pago
- Cuenta DNI
- Santander
- In-store payment

There is no real payment gateway integration, and no financial transactions are processed.

## Demo Products

The brands and products used in the demo are fictional.

Some products represent pharmacy, healthcare, personal care, or cosmetic categories only to demonstrate ecommerce functionality.

Descriptions of fictional medication products do not constitute medical advice, diagnosis, treatment, or prescription recommendations.

## Security

The project includes measures such as:

- password hashing with Werkzeug;
- backend authorization checks for administrative actions;
- `HttpOnly` session cookies;
- `SameSite=Lax`;
- `Secure` cookies in production;
- server-side stock and availability validation;
- SQLite foreign keys enabled on every connection;
- sensitive values kept outside the repository through `.env`.

Private administrator credentials are not included in the repository.

## Production

The application is prepared to run with Gunicorn.

Persistent storage should include both the SQLite database and images uploaded while the application is running.

For a real commercial application with higher concurrency, a production database such as PostgreSQL and a dedicated file-storage service would be more appropriate.

## Project Status

FarmaPlus v1 is intended as a demonstration and portfolio project.

Features such as real payments, password recovery, email notifications, advanced user administration, complex order status management, and automatic stock restoration after cancellations can be added as future extensions.

## License and Use

This project was created for educational, demonstration, and portfolio purposes.

The fictional names, brands, images, and products used in FarmaPlus do not necessarily represent real commercial products.

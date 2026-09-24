from pathlib import Path
import os
import sqlite3
import sys


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


def main():

    if len(sys.argv) != 2:

        print()
        print(
            "Uso:"
        )

        print(
            "py promover_admin.py correo@ejemplo.com"
        )

        print()

        return


    email = (
        sys.argv[1]
        .strip()
        .lower()
    )


    if (
        not email
        or "@" not in email
    ):

        print(
            "ERROR: Ingresá un correo válido."
        )

        return


    if not BASE_DATOS.exists():

        print(
            "ERROR: No se encontró farmaplus.db."
        )

        print(
            "Inicializá primero FarmaPlus."
        )

        return


    conexion = sqlite3.connect(
        BASE_DATOS
    )


    try:

        cursor = conexion.cursor()


        cursor.execute(
            """
            SELECT
                id,
                nombre,
                email,
                rol

            FROM usuarios

            WHERE LOWER(email) = LOWER(?)
            """,
            (
                email,
            )
        )


        usuario = cursor.fetchone()


        if usuario is None:

            print(
                "ERROR: No existe un usuario "
                "con ese correo."
            )

            return


        if usuario[3] == "admin":

            print()
            print(
                "El usuario ya es administrador:"
            )

            print(
                usuario[2]
            )

            print()

            return


        cursor.execute(
            """
            UPDATE usuarios

            SET rol = 'admin'

            WHERE id = ?
            """,
            (
                usuario[0],
            )
        )


        conexion.commit()


        print()
        print(
            "Administrador configurado correctamente."
        )

        print(
            "Usuario:",
            usuario[1]
        )

        print(
            "Email:",
            usuario[2]
        )

        print()


    except sqlite3.Error as error:

        conexion.rollback()

        print(
            "ERROR al actualizar el usuario:"
        )

        print(
            error
        )


    finally:

        conexion.close()


if __name__ == "__main__":

    main()
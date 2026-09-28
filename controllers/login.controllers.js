import { getConnection, sql } from "../utils/db.js";

export const login = async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;

        const pool = await getConnection();

        const result = await pool
            .request()
            .input("username", sql.VarChar, username)
            .query(
                "SELECT * FROM Users WHERE username = @username"
            );

        if (result.recordset.length === 0) {

            return res.status(401).json({
                login: false,
                message: "Usuario o contraseña incorrectos"
            });

        }

        const user = result.recordset[0];

        if (user.password === password) {

            res.status(200).json({
                login: true,
                message: "Inicio de sesion correcto",
                user: user
            });

        } else {

            res.status(401).json({
                login: false,
                message: "Usuario o contraseña incorrectos"
            });

        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error en el servidor"
        });

    }
};
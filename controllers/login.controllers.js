import { getConnection, sql } from "../utils/db.js";
import { verifyPassword } from "../utils/crypto.js";


export const login = async (req, res) => {

    try {

        const {
            username,
            password
        } = req.body;


        if (!username || !password) {

            return res.status(400).json({
                login: false,
                message: "Faltan usuario o contraseña"
            });
        }


        const pool =
            await getConnection();


        const result = await pool
            .request()
            .input(
                "username",
                sql.VarChar,
                username
            )
            .query(`
                SELECT *
                FROM Users
                WHERE username = @username
            `);


        if (result.recordset.length === 0) {

            return res.status(401).json({
                login: false,
                message: "Usuario o contraseña incorrectos"
            });
        }


        const user =
            result.recordset[0];


        const passwordCorrecto =
            verifyPassword(
                password,
                user.password
            );


        if (!passwordCorrecto) {

            return res.status(401).json({
                login: false,
                message: "Usuario o contraseña incorrectos"
            });
        }


        res.status(200).json({

            login: true,

            message:
                "Inicio de sesion correcto",

            user: {
                id: user.id,
                name: user.name,
                age: user.age,
                points: user.points,
                username: user.username
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error en el servidor"
        });
    }
};
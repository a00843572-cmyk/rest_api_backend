import { getConnection } from "../utils/db.js";


export const inicio = (req, res) => {

    res.send("Hola desde mi REST API");

};


export const marco = (req, res) => {

    res.send("Ruta marco funcionando");

};


export const ping = async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
            .request()
            .query("SELECT 1 AS resultado");

        res.json(result.recordset);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error de conexion con la base de datos"
        });

    }
};
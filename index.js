import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import loginRoutes from "./routes/login.routes.js";

import { getConnection } from "./utils/db.js";


const app = express();


// MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));


// RUTA INICIAL
app.get("/", (req, res) => {

    res.send("Hola desde mi REST API");

});


// RUTA PARA PROBAR LA BASE DE DATOS
app.get("/ping", async (req, res) => {

    try {

        const pool = await getConnection();

        const result = await pool
            .request()
            .query("SELECT 1 AS resultado");

        res.json(result.recordset);

    } catch (error) {

        res.status(500).json({
            message: "Error de conexion con la base de datos"
        });

    }
});


// RUTAS
app.use(usersRoutes);

app.use(loginRoutes);


// PUERTO
const PORT = process.env.PORT || 4000;


// INICIAR SERVIDOR
app.listen(PORT, () => {

    console.log(
        "Servidor ejecutandose en http://localhost:" + PORT
    );

});
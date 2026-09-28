import "dotenv/config";

import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import loginRoutes from "./routes/login.routes.js";


const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// RUTAS
app.use(indexRoutes);
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
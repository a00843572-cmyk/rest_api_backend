import { Router } from "express";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controllers.js";


const router = Router();


// OBTENER TODOS LOS USUARIOS
router.get("/users", getUsers);


// OBTENER UN USUARIO POR ID
router.get("/users/:id", getUserById);


// CREAR UN USUARIO
router.post("/users", createUser);


// ACTUALIZAR UN USUARIO
router.put("/users/:id", updateUser);


// ELIMINAR UN USUARIO
router.delete("/users/:id", deleteUser);


export default router;
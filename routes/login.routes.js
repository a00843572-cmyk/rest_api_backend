import { Router } from "express";

import {
    login
} from "../controllers/login.controllers.js";


const router = Router();


// RUTA DE LOGIN
router.post("/login", login);


export default router;
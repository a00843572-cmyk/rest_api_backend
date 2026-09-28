import { Router } from "express";

import {
    inicio,
    ping
} from "../controllers/index.controllers.js";


const router = Router();


router.get("/", inicio);

router.get("/ping", ping);


export default router;
import { Router } from "express";

import {
    inicio,
    marco,
    ping
} from "../controllers/index.controllers.js";


const router = Router();


router.get("/", inicio);

router.get("/marco", marco);

router.get("/ping", ping);


export default router;
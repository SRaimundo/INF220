import express from "express";
import controller from "../controllers/consulta2";

const router = express.Router();

router.get("/:camasCasal",controller.ConsultaD);
router.get("/consultaE/:cidade",controller.ConsultaE);
router.get("/",controller.ConsultaF);

export default router;
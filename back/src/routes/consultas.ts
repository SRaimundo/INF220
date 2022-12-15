import express from "express";
import controller from "../controllers/consulta";

const router = express.Router();

router.get("/:cidadeHotel/:dataInicio/:dataFim",controller.ConsultaA);
router.get("/:cidadeHotel/:dataInicio/:dataFim/:numeroQ",controller.ConsultaB);
router.get("/:descricao",controller.ConsultaC);
router.get("/",controller.ConsultaH);

export default router;
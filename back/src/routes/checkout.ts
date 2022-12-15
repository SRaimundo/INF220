import express from "express";
import controller from "../controllers/checkout";

const router = express.Router();

router.get("/gastos/:id/:data",controller.getGasto);
router.get("/diaria/:id",controller.getDiaria);
// router.post("/",controller.create);
// router.get("/",controller.getAll);
// router.put("/:id", controller.update);
// router.delete("/:id", controller.deleteById);


export default router;

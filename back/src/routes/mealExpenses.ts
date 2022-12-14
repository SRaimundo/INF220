import express from "express";
import controller from "../controllers/mealExpenses";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/",controller.getAll);
router.get("/:Id_cliente/:idConta/:codigo",controller.findOne);
router.delete("/:Id_cliente/:idConta/:codigo", controller.remove);
router.put("/:Id_cliente/:idConta/:codigo",controller.update);


export default router;

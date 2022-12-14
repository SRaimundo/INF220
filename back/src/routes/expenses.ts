import express from "express";
import controller from "../controllers/expenses";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:Id_cliente/:idConta/:codigo",controller.findOne);
router.delete("/:Id_cliente/:idConta/:codigo", controller.deleteOne);
router.put("/:Id_cliente/:idConta/:codigo",controller.update);

export default router;

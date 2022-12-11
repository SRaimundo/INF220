import express from "express";
import controller from "../controllers/expenses";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:idCliente/:idConta/:codigo",controller.findOne);
router.delete("/:idCliente/:idConta/:codigo", controller.deleteOne);
router.put("/:idCliente/:idConta/:codigo",controller.update);

export default router;

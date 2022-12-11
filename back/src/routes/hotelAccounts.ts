import express from "express";
import controller from "../controllers/hotelAccounts";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:idCliente/:codigo", controller.findOne);
router.delete("/:idCliente/:codigo", controller.deleteOne);

export default router;

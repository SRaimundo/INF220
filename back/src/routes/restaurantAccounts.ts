import express from "express";
import controller from "../controllers/restaurantAccounts";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:Id_cliente/:codigo", controller.findOne);
router.delete("/:Id_cliente/:codigo", controller.deleteOne);


export default router;

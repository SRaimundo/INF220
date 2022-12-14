import express from "express";
import controller from "../controllers/reservations";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:Id_cliente/:idQuarto/:dataIn", controller.findOne);
router.put("/:Id_cliente/:idQuarto/:dataIn", controller.update);
router.delete("/:Id_cliente/:idQuarto/:dataIn", controller.deleteOne);


export default router;

import express from "express";
import controller from "../controllers/reservations";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:idCliente/:idQuarto/:dataIn", controller.findOne);
router.put("/:idCliente/:idQuarto/:dataIn", controller.update);
router.delete("/:idCliente/:idQuarto/:dataIn", controller.deleteOne);


export default router;

import express from "express";
import controller from "../controllers/employees";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.findById);
router.get("/:cargo/cargos", controller.getAllByCargo);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteById);


export default router;

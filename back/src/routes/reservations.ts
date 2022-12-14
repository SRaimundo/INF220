import express from "express";
import controller from "../controllers/reservations";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteOne);


export default router;

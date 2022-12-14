import express from "express";
import controller from "../controllers/accommodations";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.findOne);
router.delete("/:id", controller.deleteOne);
router.put("/:id", controller.update);


export default router;

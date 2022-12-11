import express from "express";
import controller from "../controllers/rooms";

const router = express.Router();

router.get("/:numero",controller.findOne);
router.get("/",controller.getAll);
router.post("/", controller.create);
router.delete("/:numero", controller.deleteOne);
router.put("/:numero", controller.update)


export default router;

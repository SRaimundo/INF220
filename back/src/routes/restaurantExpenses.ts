import express from "express";
import controller from "../controllers/restaurantExpenses";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/",controller.getAll);
router.get("/:id",controller.findOne);
router.delete("/:id", controller.remove);
router.put("/:id",controller.update);


export default router;

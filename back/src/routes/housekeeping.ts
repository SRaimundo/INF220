import express from "express";
import controller from "../controllers/housekeeping";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:quarto/:hotel/:data/:funcionario",controller.findOne);
router.delete("/:quarto/:hotel/:data/:funcionario",controller.deleteOne);


export default router;

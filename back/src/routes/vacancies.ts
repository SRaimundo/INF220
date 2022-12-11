import express from "express";

import controller from "../controllers/vacancies";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.findOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteOne);

export default router;
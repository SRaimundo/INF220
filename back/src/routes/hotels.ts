import express from "express";

import controller from "../controllers/hotels";

const router = express.Router();

router.post("/", controller.create);
router.get("/",controller.getAll);
router.get("/:id",controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id",controller.remove);


export default router;

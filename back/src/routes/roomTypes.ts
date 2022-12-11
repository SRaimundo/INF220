import express from "express";

import controller from "../controllers/roomTypes";

const router = express.Router();

router.post("/",);
router.get("/",controller.getAll);
router.patch("/");
router.delete("/");


export default router;

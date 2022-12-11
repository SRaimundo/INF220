import express from "express";
import controller from "../controllers/housekeeping";

const router = express.Router();

router.post("/",);
router.get("/",controller.getAll);
router.patch("/");
router.delete("/");


export default router;

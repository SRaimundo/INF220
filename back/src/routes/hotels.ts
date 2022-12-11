import express from "express";

import controller from "../controllers/hotels";

const router = express.Router();

router.post("/", (req,res,next) => res.status(200).send("post hotels"));
router.get("/",controller.getAll);
router.patch("/");
router.delete("/:id",controller.remove);


export default router;

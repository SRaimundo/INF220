import express from "express";
import controller from "../controllers/hotelGuests";

const router = express.Router();

router.post("/",controller.create);
router.get("/",controller.getAll);
router.get("/:id/:hospedagem",controller.findOne);
router.delete("/:id/:hospedagem", controller.deleteOne);
router.put("/:id/:hospedagem",controller.update);

export default router;

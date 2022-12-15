import express from "express";
import controller from "../controllers/hotelGuests";
// import Checkout from "../models/checkout";

const router = express.Router();

router.post("/",controller.create);
router.get("/:id/:data");
router.get("/",controller.getAll);
router.get("/:id/:hospedagem",controller.findOne);
router.delete("/:id", controller.deleteOne);
router.put("/:id/:hospedagem",controller.update);
router.post("/checkout/:id/:data",controller.Checkout);

export default router;

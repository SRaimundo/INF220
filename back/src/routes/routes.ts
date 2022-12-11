import express from "express";

import clienteRouter from "./clients";
import employeesRouter from "./employees";
import expensesRouter from "./expenses";
import hotelAccountsRouter from "./hotelAccounts";
import hotelsRouter from "./hotels";
import housekeepingRouter from "./housekeeping";
import mealExpensesRouter from "./mealExpenses";
import reservationsRouter from "./reservations";
import restaurantAccountsRouter from "./restaurantAccounts";
import roomsRouter from "./rooms";
import roomTypesRouter from "./roomTypes";
import vacanciesRouter from "./vacancies"; 


const router = express.Router();


router.use("/cliente", clienteRouter);
router.use("/employees", employeesRouter);
router.use("/expenses", expensesRouter);
router.use("/hotelAccount", hotelAccountsRouter);
router.use("/hotels", hotelsRouter);
router.use("/arruma", housekeepingRouter);
router.use("/mealExpenses", mealExpensesRouter);
router.use("/reservations", reservationsRouter);
router.use("/restaurantAccounts", restaurantAccountsRouter);
router.use("/rooms", roomsRouter);
router.use("/tipo-apartamento", roomTypesRouter);
router.use("/vacancies", vacanciesRouter);

router.use((req, res, next)=> {
    const error = new Error("Recurso não encontrado");
    return res.status(404).send({message: error.message});
});

export default router;
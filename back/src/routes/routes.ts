import express from "express";

import clienteRouter from "./clients";
import employeesRouter from "./employees";
import expensesRouter from "./expenses";
import hotelExpensesRouter from "./hotelExpenses";
import hotelsRouter from "./hotels";
import housekeepingRouter from "./housekeeping";
import restaurantExpensesRouter from "./restaurantExpenses";
import reservationsRouter from "./reservations";
import AccommodationsRouter from "./accommodations";
import roomsRouter from "./rooms";
import roomTypesRouter from "./roomTypes";
import vacanciesRouter from "./vacancies"; 

import Consulta from "./consultas";
import Consulta2 from "./consultas2";


const router = express.Router();


router.use("/cliente", clienteRouter);
router.use("/employees", employeesRouter);
router.use("/expenses", expensesRouter);
router.use("/hotelExpenses", hotelExpensesRouter);
router.use("/hotels", hotelsRouter);
router.use("/arruma", housekeepingRouter);
router.use("/restaurantExpenses", restaurantExpensesRouter);
router.use("/reservations", reservationsRouter);
router.use("/accommodations", AccommodationsRouter);
router.use("/rooms", roomsRouter);
router.use("/tipo-apartamento", roomTypesRouter);
router.use("/vacancies", vacanciesRouter);

router.use("/consulta",Consulta);
router.use("/consulta2",Consulta2);

router.use((req, res, next)=> {
    const error = new Error("Recurso não encontrado");
    return res.status(404).send({message: error.message});
});

export default router;
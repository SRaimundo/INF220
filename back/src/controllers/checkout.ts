import {Request, Response} from "express";
import Checkout from "../models/checkout";

const getGasto= async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Checkout.Gasto(req.params.id,req.params.data));
    } catch (err) {
        res.status(400);
    }
}

const getDiaria= async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Checkout.Diaria(req.params.id));
    } catch (err) {
        res.status(400);
    }
}



export default {getGasto,getDiaria};
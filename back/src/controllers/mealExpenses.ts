import {Request, Response} from "express";
import MealExpenses from "../models/mealExpenses";


const getAll = async (req: Request , res: Response) =>{
    const hotel = await MealExpenses.getAll();
    return res.status(200).json(hotel);
};

const remove = async (req: Request, res: Response) =>{
    const hotel = await MealExpenses.remove(req.params.Id_cliente, req.params.idConta, req.params.codigo);
    return res.status(200).send();
}

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await MealExpenses.findOne(req.params.Id_cliente, req.params.idConta, req.params.codigo));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await MealExpenses.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await MealExpenses.update(req.params.Id_cliente, req.params.idConta, req.params.codigo, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll,remove, findOne, create, update};
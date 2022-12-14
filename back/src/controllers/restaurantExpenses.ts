import {Request, Response} from "express";
import RestaurantExpenses from "../models/restaurantExpenses";


const getAll = async (req: Request , res: Response) =>{
    const hotel = await RestaurantExpenses.getAll();
    return res.status(200).json(hotel);
};

const remove = async (req: Request, res: Response) => {
    try {
        return res.status(200).send(await RestaurantExpenses.remove(req.params.id));
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await RestaurantExpenses.findOne(req.params.id));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RestaurantExpenses.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await RestaurantExpenses.update(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll,remove, findOne, create, update};
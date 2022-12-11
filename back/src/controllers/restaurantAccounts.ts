import {Request, Response} from "express";
import RestaurantAccount from "../models/restaurantAccounts";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RestaurantAccount.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RestaurantAccount.findOne(req.params.idCliente, req.params.codigo));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RestaurantAccount.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await RestaurantAccount.delete(req.params.idCliente, req.params.codigo));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, create, deleteOne};
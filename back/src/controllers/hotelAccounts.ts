import {Request, Response} from "express";
import HotelAccount from "../models/hotelAccounts";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await HotelAccount.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await HotelAccount.findOne(req.params.Id_cliente, req.params.codigo));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await HotelAccount.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await HotelAccount.delete(req.params.Id_cliente, req.params.codigo));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, create, deleteOne};
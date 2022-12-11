import {Request, Response} from "express";
import Reservation from "../models/reservations";


const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Reservation.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await Reservation.findOne(req.params.idCliente, req.params.idQuarto, req.params.dataIn));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Reservation.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Reservation.delete(req.params.idCliente, req.params.idQuarto, req.params.dataIn));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Reservation.update(req.params.idCliente, req.params.idQuarto, req.params.dataIn, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, create, deleteOne, update};
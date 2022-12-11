import { Request, Response } from "express";
import Room from "../models/rooms";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Room.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await Room.findOne(req.params.numero));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Room.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Room.delete(req.params.numero));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Room.update(req.params.numero, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, create, deleteOne, update};
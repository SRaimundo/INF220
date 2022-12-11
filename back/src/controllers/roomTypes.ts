import {Request, Response} from "express";
import RoomType from "../models/roomTypes";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RoomType.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RoomType.findOne(req.params.id));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await RoomType.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await RoomType.delete(req.params.id));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await RoomType.update(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};


export default {getAll, findOne, create, deleteOne, update};
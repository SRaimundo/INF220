import { Request, Response } from "express";
import Hotel from "../models/hotels";

const getAll = async (req: Request , res: Response) =>{
    const hotel = await Hotel.getAll();
    return res.status(200).json(hotel);
};

const remove = async (req: Request, res: Response) =>{
    const { id } = req.params;
    try {
        return res.status(200).send(await Hotel.remove(Number(id)));
    } catch (error) {
        return res.status(400).send(error);
    }
};

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await Hotel.findOne(req.params.id));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Hotel.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Hotel.update(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll,remove, findOne, create, update};


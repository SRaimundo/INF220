import { Request, Response } from "express";
import Hotel from "../models/hotels";

const getAll = async (req: Request , res: Response) =>{
    const hotel = await Hotel.getAll();
    return res.status(200).json(hotel);
};

const remove = async (req: Request, res: Response) =>{
    const { id } = req.params;
    const hotel = await Hotel.remove(Number(id));
    return res.status(200).send();
}

export default {getAll,remove};


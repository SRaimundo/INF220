import { Request, Response } from "express";
import Hotel from "../models/hotels";

const getAll = async (req: Request , res: Response) =>{
    const hotel = await Hotel.getAll();
    return res.status(200).json(hotel);
};

export default {getAll};


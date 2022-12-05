import { Request, Response } from "express";
import Hotel from "../models/hotels";

const getAll = (req: Request , res: Response) =>{
    const hotel = Hotel.getAll();
    return res.status(200).send(hotel);
};

export default {getAll};


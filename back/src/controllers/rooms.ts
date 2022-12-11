import { Request, Response } from "express";
import Room from "../models/rooms";

const getAll = async (req: Request, res: Response) => {
    const quarto = await Room.getAll();
    return res.status(200).json(quarto);
};


export default {getAll};
import {Request, Response} from "express";
import Housekeeping from "../models/housekeeping";

const getAll = async (req: Request, res: Response) => {
    const hotel = await Housekeeping.getAll();
    return res.status(200).json(hotel);
}

export default {getAll};
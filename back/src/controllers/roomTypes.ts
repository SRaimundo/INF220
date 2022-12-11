import {Request, Response} from "express";
import RoomType from "../models/roomTypes";

const getAll = async (req: Request, res: Response) => {
    const tipo_apartamento = await RoomType.getAll();
    return res.status(200).json(tipo_apartamento);
}




export default {getAll};
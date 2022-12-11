import {Request, Response} from "express";
import Client from "../models/clients";

const getAll = async (req: Request , res: Response) =>{
    const cliente = await Client.getAll();
    return res.status(200).json(cliente);
};


export default {getAll};
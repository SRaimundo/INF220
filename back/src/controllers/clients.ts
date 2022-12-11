import {Request, Response} from "express";
import Client from "../models/clients";

const getAll = async (req: Request , res: Response) =>{
    const cliente = await Client.getAll();
    return res.status(200).json(cliente);
};

const findById = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Client.findById(req.params.id));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const deleteById = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Client.delete(req.params.id));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Client.update(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const create = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Client.create(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};


export default {getAll, findById, deleteById, update, create};
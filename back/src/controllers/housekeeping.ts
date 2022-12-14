import {Request, Response} from "express";
import Housekeeping from "../models/housekeeping";

const getAll = async (req: Request, res: Response) => {
    const hotel = await Housekeeping.getAll();
    return res.status(200).json(hotel);
}

const findOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Housekeeping.findOne(req.params.quarto, req.params.hotel, req.params.data, req.params.funcionario));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Housekeeping.delete(req.params.quarto, req.params.hotel, req.params.data, req.params.funcionario));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const create = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Housekeeping.create(req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, deleteOne, create};
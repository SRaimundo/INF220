import {Request, Response} from "express";
import Expenses from "../models/expenses";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Expenses.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findOne = async (req: Request, res: Response) => {
    console.log(req.params);
    try {
        res.status(200).json(await Expenses.findOne(req.params.Id_cliente, req.params.idConta, req.params.codigo));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Expenses.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteOne = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Expenses.delete(req.params.Id_cliente, req.params.idConta, req.params.codigo));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Expenses.update(req.params.Id_cliente, req.params.idConta, req.params.codigo, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findOne, create, deleteOne, update};
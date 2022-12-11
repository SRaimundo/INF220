import {Request, Response} from "express";
import Employee from "../models/employees";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Employee.getAll());
    } catch (err) {
        res.status(400);
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Employee.findById(req.params.id));
    } catch (err) {
        res.status(400);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Employee.create(req.body));
    } catch (err) {
        res.status(400);
    }
}

const deleteById = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Employee.delete(req.params.id));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

const update = async (req: Request , res: Response) => {
    try {
        return res.status(200).json(await Employee.update(req.params.id, req.body));
    } catch (error) {
        return res.status(500).send({message: error});
    } 
};

export default {getAll, findById, create, deleteById, update};
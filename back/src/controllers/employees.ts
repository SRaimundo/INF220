import {Request, Response} from "express";
import Employee from "../models/employees";

const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await Employee.getAll());
    } catch (err) {
        res.status(400);
    }
}

export default {getAll};
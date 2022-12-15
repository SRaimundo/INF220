import {Request, Response} from "express";
import Consultas from "../models/consulta";

const ConsultaA =  async (req : Request, res : Response) => {

    try {
        const nomeEmail = await Consultas.consultaA(req.params.cidadeHotel, req.params.dataInicio, req.params.dataFim);
        return res.status(200).json( nomeEmail);
    } catch (error) {
        return res.status(500).send({message: error});
    } 

};

const ConsultaB = async (req: Request, res: Response) => {
    try {
        const nomes = await Consultas.consultaB(req.params.cidadeHotel, req.params.dataInicio, req.params.dataFim, Number(req.params.numeroQ));
        return res.status(200).json( nomes);
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

const ConsultaC = async (req: Request, res: Response) => {
    try {
        const resp = await Consultas.consultaC(req.params.descricao);
        return res.status(200).json( resp);
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

const ConsultaH = async (req: Request, res: Response) => {
    try {
        const resp = await Consultas.consultaH();
        return res.status(200).json( resp);
    } catch (error) {
        return res.status(500).send({message: error});
    }
}


export default {ConsultaA,ConsultaB,ConsultaC,ConsultaH};
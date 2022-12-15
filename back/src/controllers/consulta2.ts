import {Request, Response} from "express";
import Consultas2 from "../models/consulta2";


const ConsultaD =  async (req : Request, res : Response) => {

    try {
        const nomes = await Consultas2.consultaD(req.params.camasCasal);
        return res.status(200).json( nomes);
    } catch (error) {
        return res.status(500).send({message: error});
    } 

};

const ConsultaE =  async (req : Request, res : Response) => {

    try {
        const nomes = await Consultas2.consultaE(req.params.cidade);
        return res.status(200).json( nomes);
    } catch (error) {
        return res.status(500).send({message: error});
    } 

};

const ConsultaF =  async (req : Request, res : Response) => {

    try {
        const nomes = await Consultas2.consultaF();
        return res.status(200).json( nomes);
    } catch (error) {
        return res.status(500).send({message: error});
    } 

};



export default {ConsultaD,ConsultaE,ConsultaF};
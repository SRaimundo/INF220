import {Housekeeping as HousekeepingInterface} from "../interfaces/housekeeping";
import { connect } from "../db";

class Housekeeping{
    static getAll = async () => {
        const conn = await connect();
        const q = "SELECT A.Data, F.Nome, H.Nome as Hotel, A.Quarto FROM ARRUMACAO A, FUNCIONARIO F, HOTEL H, QUARTO Q WHERE A.Funcionario = F.Id_funcionario AND A.Quarto = Q.Numero AND H.Id_hotel = Q.Hotel";
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static findOne = async (quarto: any, hotel: any, data: any) => {
        const conn = await connect();
        const q = "SELECT * FROM ARRUMACAO WHERE Quarto = ? AND Hotel = ? AND Data = date(?)";
        const linhas = await conn.query(q, [quarto, hotel, data]);
        return linhas[0];
    };

    static delete = async (quarto: any, hotel: any, data: any) => {
        const conn = await connect();
        const q = "DELETE FROM ARRUMACAO WHERE Quarto = ? AND Hotel = ? AND Data = date(?)";
        const linhas = await conn.query(q, [quarto, hotel, data]);
        return linhas[0];
    };

    static create = async (houseKeeping: HousekeepingInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(
            `INSERT INTO ARRUMACAO (Quarto, Hotel, Data, Funcionario) VALUES (?, ?, ?, ?)`,
            [houseKeeping.Quarto, houseKeeping.Hotel, houseKeeping.Data, houseKeeping.Funcionario]
        );
        return rows;
    }
}

export default Housekeeping;
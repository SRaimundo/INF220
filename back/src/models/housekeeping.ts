import {Housekeeping as HousekeepingInterface} from "../interfaces/housekeeping";
import { connect } from "../db";

class Housekeeping{
    static getAll = async () => {
        const conn = await connect();
        const q = "SELECT A.Data, F.Nome, H.Nome as Hotel, A.Quarto FROM ARRUMACAO A, FUNCIONARIO F, HOTEL H, QUARTO Q WHERE A.Funcionario = F.Id_funcionario AND A.Quarto = Q.Numero AND H.Id_hotel = Q.Hotel";
        const linhas = await conn.query(q);
        return linhas[0];
    };
}

export default Housekeeping;
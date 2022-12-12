import {RoomType as RoomTypeInterface} from "../interfaces/roomTypes";
import { connect } from "../db";

class RoomType{
    static getAll = async ()=>{
        const conn = await connect();
        const q = 'SELECT * FROM TIPO_QUARTO';
        const linhas = await conn.query(q);
        // console.log(linhas[0]);
        return linhas[0];
    };

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM TIPO_QUARTO WHERE idTipo = ${id}`);
        return rows;
    }

    static create = async (RoomType: RoomTypeInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO TIPO_QUARTO (Valor, Tem_TV, Adaptado, Numero_camas_solteiro, Numero_camas_casal)
            VALUES (${RoomType.Valor}, ${RoomType.Tem_TV}, ${RoomType.Adaptado}, ${RoomType.Numero_camas_solteiro}, ${RoomType.Numero_camas_casal})`);
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM TIPO_QUARTO WHERE idTipo = ${id}`);
        return rows;
    }

    static update = async (id: any, RoomType: RoomTypeInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE TIPO_QUARTO 
            SET Valor = ${RoomType.Valor},
            Tem_TV = ${RoomType.Tem_TV},
            Adaptado = ${RoomType.Adaptado},
            Numero_camas_solteiro = ${RoomType.Numero_camas_solteiro},
            Numero_camas_casal = ${RoomType.Numero_camas_casal}
            WHERE idTipo = ${id}`
        );
        return rows;
    }
}

export default RoomType;
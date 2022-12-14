import { connect } from "../db";
import {hotelExpenses as HotelExpensesInterface} from "../interfaces/hotelExpenses";

class HotelExpenses{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM DESPESA_HOTEL");
        return rows;
    }

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM DESPESA_HOTEL WHERE Id_despesa = ?`, id);
        return rows;
    }

    static create = async (hotelExpenses: HotelExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`
            INSERT INTO DESPESA_HOTEL (Hospedagem, Data, Descricao, Valor) 
            VALUES (?, date(?), ?, ?)`, 
            [hotelExpenses.Hospedagem, hotelExpenses.Data, hotelExpenses.Descricao, hotelExpenses.Valor]);
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM DESPESA_HOTEL WHERE Id_despesa = ?`, id);
        return rows;
    }

    static update = async (id: any, hotelExpenses: HotelExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE DESPESA_HOTEL 
            SET Hospedagem = ?,
            Data = ?,
            Descricao = ?,
            Valor = ?
            WHERE Id_despesa = ?`,
            [hotelExpenses.Hospedagem, hotelExpenses.Data, hotelExpenses.Descricao, hotelExpenses.Valor, id]
        );
        return rows;
    }
}

export default HotelExpenses;
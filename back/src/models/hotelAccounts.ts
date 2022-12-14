import { connect } from "../db";
import {HotelAccount as HotelAccountInterface} from "../interfaces/hotelAccounts";

class HotelAccount{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM CONTA_HOTEL");
        return rows;
    }

    static findOne = async (Id_cliente: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM CONTA_HOTEL WHERE Cliente = ${Id_cliente} and Codigo = ${codigo}`);
        return rows;
    }

    static create = async (hotelAccount: HotelAccountInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO CONTA_HOTEL (Cliente, Codigo) VALUES ("${hotelAccount.Cliente}", "${hotelAccount.Codigo}")`);
        return rows;
    }

    static delete = async (Id_cliente: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM CONTA_HOTEL WHERE Cliente = ${Id_cliente} and Codigo = ${codigo}`);
        return rows;
    }
}

export default HotelAccount;
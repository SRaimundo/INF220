import {Room as RoomInterface} from "../interfaces/rooms";
import{connect} from "../db";

class Room{
    static getAll = async () => {
        const conn = await connect();
        const q = 'SELECT * FROM QUARTO';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static findOne = async (numero: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM QUARTO WHERE Numero = ${numero}`);
        return rows;
    }

    static create = async (room: RoomInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO QUARTO (Numero, Tipo, Hotel) 
            VALUES ("${room.Numero}", "${room.Tipo}", "${room.Hotel}")`);
        return rows;
    }

    static delete = async (numero: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM QUARTO WHERE Numero = ${numero}`);
        return rows;
    }

    static update = async (numero: any, room: RoomInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE QUARTO 
            SET Tipo = "${room.Tipo}",
            Hotel = "${room.Hotel}"
            WHERE Numero = ${numero}`
        );
        return rows;
    }
}

export default Room;
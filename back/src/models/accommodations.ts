import { connect } from "../db";
import { Accommodation as AccommodationInterface} from "../interfaces/accommodations";

class Accommodation{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM HOSPEDAGEM");
        return rows;
    }

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM HOSPEDAGEM WHERE Id_hospedagem = ?`, id);
        return rows;
    }

    static create = async (accommodation: AccommodationInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out) VALUES (?, ?, ?, date(?), date(?))`,[accommodation.Reserva, accommodation.Quarto, accommodation.Hotel, accommodation.Check_in, accommodation.Check_out]);
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM HOSPEDAGEM WHERE Id_hospedagem = ?`, id);
        return rows;
    }

    static update = async (id: any, accommodation: AccommodationInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE HOSPEDAGEM  
            SET Reserva = ?,
            Quarto = ?,
            Hotel = ?,
            Check_in = date(?),
            Check_out = date(?)
            WHERE Id_hospedagem = ?`,
            [accommodation.Reserva, accommodation.Quarto, accommodation.Hotel, accommodation.Check_in, accommodation.Check_out, id]
        );
        return rows;
    }
}

export default Accommodation;
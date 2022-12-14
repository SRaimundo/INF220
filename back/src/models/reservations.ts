import { connect } from "../db";
import {Reservation as ReservationInterface} from "../interfaces/reservations";

class Reservation{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM RESERVA");
        return rows;
    }

    static findOne = async (Id_cliente: any, idQuarto: any, dataIn: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM RESERVA WHERE Cliente = ${Id_cliente} and Quarto = ${idQuarto} and Data_in = date("${dataIn}")`);
        return rows;
    }

    static create = async (reservation: ReservationInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO RESERVA (Cliente, Quarto, Data_in, Data_out, Check_in, Check_out) 
            VALUES ("${reservation.Cliente}", "${reservation.Quarto}", date("${reservation.Data_in}"), date("${reservation.Data_out}"), "${reservation.Check_in}", "${reservation.Check_out}")`);
        return rows;
    }

    static delete = async (Id_cliente: any, idQuarto: any, dataIn: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM RESERVA WHERE Cliente = ${Id_cliente} and Quarto = ${idQuarto} and Data_in = date("${dataIn}")`);
        return rows;
    }

    static update = async (Id_cliente: any, idQuarto: any, dataIn: any, reservation: ReservationInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE RESERVA 
            SET Data_out = date("${reservation.Data_out}"),
            Check_in = "${reservation.Check_in}",
            Check_out = ${reservation.Check_out}
            WHERE Cliente = ${Id_cliente} and Quarto = ${idQuarto} and Data_in = date("${dataIn}")`
        );
        return rows;
    }
}

export default Reservation;
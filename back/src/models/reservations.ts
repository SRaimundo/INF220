import { connect } from "../db";
import {Reservation as ReservationInterface} from "../interfaces/reservations";

class Reservation{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM RESERVA");
        return rows;
    }

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM RESERVA WHERE Id_reserva = ?`, id);
        return rows;
    }

    static create = async (reservation: ReservationInterface) => {
        const conn = await connect();
        // console.log(reservation);
        const [rows, fields] = await conn.query(`INSERT INTO RESERVA (Cliente, Tipo, Num_hospedes, Data_prevista_entrada, Data_prevista_saida)
            VALUES (?, ?, ?, ?, ?)`,
            [reservation.Cliente, reservation.Tipo, reservation.Num_hospedes, reservation.Data_prevista_entrada, reservation.Data_prevista_saida]
        );
        console.log("aqui");
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM RESERVA WHERE Id_reserva = ?`, id);
        return rows;
    }

    static update = async (id: any, reservation: ReservationInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE RESERVA 
            SET Cliente = ?,
            Tipo = ?,
            Num_hospedes = ?,
            Data_prevista_entrada = date(?),
            Data_prevista_saida = date(?)
            WHERE Id_reserva = ?`,
            [reservation.Cliente, reservation.Tipo, reservation.Num_hospedes, reservation.Data_prevista_entrada, reservation.Data_prevista_saida, id]
        );
        return rows;
    }
}

export default Reservation;
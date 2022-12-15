import { connect } from "../db";
import { Client as ClientInterface} from "../interfaces/clients";

class Checkout{

    static Gasto = async (id: any ,data: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`
        SELECT SUM(DH.Valor) + SUM(CRE.Valor)*1.1 + SUM(CRNE.Valor) as 'Soma', H.Id_hospedagem as Hospedagem
        FROM DESPESA_HOTEL DH,CONSUMO_RESTAURANTE CRE, CONSUMO_RESTAURANTE CRNE, HOSPEDAGEM H
        WHERE H.Id_hospedagem = DH.Hospedagem AND DH.Data >= '${data} 00:00:00' AND DH.Data <= '${data} 23:59:59' AND ((H.Id_hospedagem = CRE.Hospedagem AND CRE.Data >= '${data} 00:00:00' AND CRE.Data <= '${data} 23:59:59') OR (H.Id_hospedagem = CRNE.Hospedagem AND CRNE.Data >= '${data} 00:00:00' AND CRNE.Data <= '${data} 23:59:59')) AND Id_Hospedagem = ?
        GROUP BY H.Id_hospedagem;
        `, id);
        return rows;
    }

    static Diaria = async (id: any ) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`
        SELECT T.Valor, H.Id_hospedagem as Hospedagem
        FROM HOSPEDAGEM H, QUARTO Q, TIPO_QUARTO T
        WHERE H.Quarto = Q.Numero AND Q.Tipo = T.Id_tipo AND H.Id_hospedagem = ?;
        `, id);
        return rows;
    }


    
    
    // static getAll = async () => {
    //     const conn = await connect();
    //     const [rows, fields] = await conn.query("SELECT * FROM HOSPEDAGEM");
    //     return rows;
    // }

    // static findOne = async (id: any) => {
    //     const conn = await connect();
    //     const [rows, fields] = await conn.query(`SELECT * FROM HOSPEDAGEM WHERE Id_hospedagem = ?`, id);
    //     return rows;
    // }

    // static create = async (accommodation: AccommodationInterface) => {
    //     const conn = await connect();
    //     const [rows, fields] = await conn.query(`INSERT INTO HOSPEDAGEM (Reserva, Quarto, Hotel, Check_in, Check_out) VALUES (?, ?, ?, date(?), date(?))`,[accommodation.Reserva, accommodation.Quarto, accommodation.Hotel, accommodation.Check_in, accommodation.Check_out]);
    //     return rows;
    // }

    // static delete = async (id: any) => {
    //     const conn = await connect();
    //     const [rows, fields] = await conn.query(`DELETE FROM HOSPEDAGEM WHERE Id_hospedagem = ?`, id);
    //     return rows;
    // }

    // static update = async (id: any, accommodation: AccommodationInterface) => {
    //     const conn = await connect();
    //     const [rows, fields] = await conn.query(`UPDATE HOSPEDAGEM  
    //         SET Reserva = ?,
    //         Quarto = ?,
    //         Hotel = ?,
    //         Check_in = date(?),
    //         Check_out = date(?)
    //         WHERE Id_hospedagem = ?`,
    //         [accommodation.Reserva, accommodation.Quarto, accommodation.Hotel, accommodation.Check_in, accommodation.Check_out, id]
    //     );
    //     return rows;
    // }
}

export default Checkout;
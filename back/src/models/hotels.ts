import {Hotel as HotelInterface} from "../interfaces/hotels";
import{connect} from "../db";

class Hotel{
    static getAll = async () => {

        const conn = await connect();
        const q = 'SELECT * FROM HOTEL';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static remove = async (id:number) => {
        const conn = await connect();
        const q = 'DELETE FROM HOTEL WHERE Id_hotel = ?';
        const [rows, fields] = await conn.query(q,id);
        return rows;
    };

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM HOTEL WHERE Id_hotel = ${id}`);
        return rows;
    };

    static create = async (hotel: HotelInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO HOTEL (Nome, Rua, Numero, Complemento, Bairro, Cidade, UF)
            VALUES ("${hotel.Nome}", "${hotel.Rua}", "${hotel.Numero}", "${hotel.Complemento}", "${hotel.Bairro}", "${hotel.Cidade}", "${hotel.UF}")`);
        return rows;
    };

    static update = async (id: any, hotel: HotelInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE HOTEL 
            SET Nome = "${hotel.Nome}",
            Rua = "${hotel.Rua}",
            Numero = "${hotel.Numero}",
            Complemento = "${hotel.Complemento}",
            Bairro = "${hotel.Bairro}",
            Cidade = "${hotel.Cidade}",
            UF = "${hotel.UF}"
            WHERE Id_hotel = ${id}`
        );
        return rows;
    };

};

export default Hotel;
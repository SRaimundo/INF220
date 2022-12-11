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
        const q = 'DELETE FROM HOTEL WHERE idHotel = ?';
        const remover = await conn.query(q,id);

    }
} 

export default Hotel;
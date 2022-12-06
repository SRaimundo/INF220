import {Hotel as HotelInterface} from "../interfaces/hotels";
import{connect} from "../db";

class Hotel{
    static getAll = async () => {

        const conn = await connect();
        const q = 'SELECT * FROM HOTEL';
        const linhas = await conn.query(q);
        return linhas[0];
        // return [{id : 1}];
    };
} 

export default Hotel;
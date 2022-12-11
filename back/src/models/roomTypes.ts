import {RoomType as RoomTypeInterface} from "../interfaces/roomTypes";
import { connect } from "../db";

class RoomType{
    static getAll = async ()=>{
        const conn = await connect();
        const q = 'SELECT * FROM TIPO_QUARTO';
        const linhas = await conn.query(q);
        return linhas[0];
    };

}

export default RoomType;
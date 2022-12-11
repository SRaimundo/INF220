import {Room as RoomInterface} from "../interfaces/rooms";
import{connect} from "../db";

class Room{
    static getAll = async () => {
        const conn = await connect();
        const q = 'SELECT * FROM QUARTO';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    
}

export default Room;
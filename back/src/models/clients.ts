import {Client as ClientInterface} from "../interfaces/clients";

import{connect} from "../db";

class Client{
    static getAll = async () => {

        const conn = await connect();
        const q = 'SELECT * FROM CLIENTE';
        const linhas = await conn.query(q);
        return linhas[0];
    };
}

export default Client;
import {createPool} from "mysql2/promise";


export const connect = async () => {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        database: 'BOM_SONO',
        password: ''
    });
    return connection;
}

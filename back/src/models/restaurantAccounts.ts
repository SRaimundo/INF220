import { connect } from "../db";
import { RestaurantAccount as RestaurantAccountInterface} from "../interfaces/restaurantAccounts";

class RestaurantAccount{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM CONTA_RESTAURANTE");
        return rows;
    }

    static findOne = async (idCliente: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM CONTA_RESTAURANTE WHERE Cliente = ${idCliente} and Codigo = ${codigo}`);
        return rows;
    }

    static create = async (restaurantAccount: RestaurantAccountInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO CONTA_RESTAURANTE (Cliente, Codigo) VALUES ("${restaurantAccount.Cliente}", "${restaurantAccount.Codigo}")`);
        return rows;
    }

    static delete = async (idCliente: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM CONTA_RESTAURANTE WHERE Cliente = ${idCliente} and Codigo = ${codigo}`);
        return rows;
    }
}

export default RestaurantAccount;
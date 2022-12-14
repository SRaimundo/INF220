import {RestaurantExpenses as RestaurantExpensesInterface} from "../interfaces/restaurantExpenses";
import {connect} from "../db";

class MealExpenses{
    static getAll = async () => {
        const conn = await connect();
        const q = 'SELECT * FROM CONSUMO_RESTAURANTE';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static remove = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM CONSUMO_RESTAURANTE WHERE Id_consumo = ?`, id);
        return rows;
    }

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM CONSUMO_RESTAURANTE WHERE Id_consumo = ?`, id);
        return rows;
    }

    static create = async (restaurantExpenses: RestaurantExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO CONSUMO_RESTAURANTE (Hospedagem, Data, Descricao, Valor, Entregue) 
            VALUES (?, date(?), ?, ?, ?)`, [restaurantExpenses.Hospedagem, restaurantExpenses.Data, restaurantExpenses.Descricao, restaurantExpenses.Valor, restaurantExpenses.Entregue]);
        return rows;
    }

    static update = async (id: any, restaurantExpenses: RestaurantExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE CONSUMO_RESTAURANTE 
            SET Hospedagem = ?,
            Data = ?,
            Descricao = ?,
            Valor = ?,
            Entregue = ?
            WHERE Id_consumo = ?`,
            [restaurantExpenses.Hospedagem, restaurantExpenses.Data, restaurantExpenses.Descricao, restaurantExpenses.Valor, restaurantExpenses.Entregue, id]
        );
        return rows;
    }
}

export default MealExpenses;
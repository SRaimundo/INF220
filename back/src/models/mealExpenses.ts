import {MealExpenses as MealExpensesInterface} from "../interfaces/mealExpenses";
import {connect} from "../db";

class MealExpenses{
    static getAll = async () => {
        const conn = await connect();
        const q = 'SELECT * FROM DESPESA_REFEICAO';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static remove = async (idCliente: any, idConta: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM DESPESA_REFEICAO WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`);
        return rows;
    }

    static findOne = async (idCliente: any, idConta: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM DESPESA_REFEICAO WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`);
        return rows;
    }

    static create = async (mealExpenses: MealExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO DESPESA_REFEICAO (Cliente, Conta, Codigo, Data, Descricao, Valor, Entregue)
            VALUES ("${mealExpenses.Cliente}", "${mealExpenses.Conta}", "${mealExpenses.Codigo}", date("${mealExpenses.Data}"), "${mealExpenses.Descricao}", ${mealExpenses.Valor}, "${mealExpenses.Entregue}")`);
        return rows;
    }

    static update = async (idCliente: any, idConta: any, codigo: any, mealExpenses: MealExpensesInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE DESPESA_REFEICAO 
            SET Data = date("${mealExpenses.Data}"),
            Descricao = "${mealExpenses.Descricao}",
            Valor = "${mealExpenses.Valor}",
            Entregue = "${mealExpenses.Entregue}"
            WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`
        );
        return rows;
    }
}

export default MealExpenses;
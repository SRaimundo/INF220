import { connect } from "../db";
import {Expenses as ExpensesInterface} from "../interfaces/expenses";

class Expenses{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM DESPESA");
        return rows;
    }

    static findOne = async (idCliente: any, idConta: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM DESPESA WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`);
        return rows;
    }

    static create = async (expense: ExpensesInterface) => {
        console.log(expense)
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO DESPESA (Cliente, Conta, Codigo, Data, Descricao, Valor) 
            VALUES ("${expense.Cliente}", "${expense.Conta}", "${expense.Codigo}", date("${expense.Data}"), "${expense.Descricao}", ${expense.Valor})`);
        return rows;
    }

    static delete = async (idCliente: any, idConta: any, codigo: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM DESPESA WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`);
        return rows;
    }

    static update = async (idCliente: any, idConta: any, codigo: any, expense: ExpensesInterface) => {
        console.log(expense);
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE DESPESA 
            SET Data = date("${expense.Data}"),
            Descricao = "${expense.Descricao}",
            Valor = ${expense.Valor}
            WHERE Cliente = ${idCliente} and Conta = ${idConta} and Codigo = ${codigo}`
        );
        return rows;
    }
}

export default Expenses;
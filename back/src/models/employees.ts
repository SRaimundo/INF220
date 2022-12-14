import { connect } from "../db";
import {Employee as EmployeeInterface} from "../interfaces/employees";

class Employee{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM FUNCIONARIO");
        return rows;
    }

    static getAllByCargo = async (Cargo: string) => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM FUNCIONARIO WHERE Cargo = ?", Cargo);
        return rows;
    }

    static findById = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM FUNCIONARIO WHERE Id_funcionario = ${id}`);
        return rows;
    }

    static create = async (employee: EmployeeInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO FUNCIONARIO (Nome, Cargo) VALUES ("${employee.Nome}", "${employee.Cargo}")`);
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM FUNCIONARIO WHERE Id_funcionario = ${id}`);
        return rows;
    }

    static update = async (id: any, employee: EmployeeInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE FUNCIONARIO 
            SET Nome = "${employee.Nome}",
            Cargo = "${employee.Cargo}"
            WHERE Id_funcionario = ${id}`
        );
        return rows;
    }
}

export default Employee;
import { connect } from "../db";
import {Employee as EmployeeInterface} from "../interfaces/employees";

class Employee{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM FUNCIONARIO");
        return rows;
    }
}

export default Employee;
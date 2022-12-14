import {Vacancy as VacancyInterface} from "../interfaces/vacancies";
import { connect } from "../db";

class Vacanciy{
    static getAll = async ()=>{
        const conn = await connect();
        const q = 'SELECT * FROM VAGA';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static findOne = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM VAGA WHERE Id_vaga = ${id}`);
        return rows;
    }

    static create = async (vacancy: VacancyInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO VAGA (Status, Cliente, Hotel)
            VALUES (${vacancy.Status}, ${vacancy.Cliente}, ${vacancy.Hotel})`);
        return rows;
    }

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM VAGA WHERE Id_vaga = ${id}`);
        return rows;
    }

    static update = async (id: any, vacancy: VacancyInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE VAGA 
            SET Status = ${vacancy.Status},
            Cliente = ${vacancy.Cliente},
            Hotel = ${vacancy.Hotel}
            WHERE Id_vaga = ${id}`
        );
        return rows;
    }
}

export default Vacanciy;
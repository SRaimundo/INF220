import { connect } from "../db";
import {hotelGuest as HotelGuestInterface} from "../interfaces/hotelGuests";

class HotelGuest{
    static getAll = async () => {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT * FROM HOSPEDE");
        return rows;
    }

    static findOne = async (id: any, hospedagem: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM HOSPEDE WHERE Id_hospede = ? and Hospedagem = ?`,[id, hospedagem]);
        return rows;
    }

    static create = async (hotelGuest: HotelGuestInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO HOSPEDE (
                Id_hospede, 
                Hospedagem, 
                Nome, 
                Email, 
                CPF,
                Nascimento, 
                Sexo, 
                Profissao, 
                Nacionalidade, 
                Descricao_documento, 
                Tipo_documento, 
                Orgao_exp, 
                DDI_celular, 
                DDD_celular, 
                Numero_celular, 
                DDI_telefone, 
                DDD_telefone, 
                Numero_telefone, 
                Endereco, 
                Numero, 
                Bairro, 
                Cidade, 
                Estado, 
                Pais, 
                CEP, 
                Ultima_cidade, 
                Ultima_estado, 
                Ultima_pais, 
                Proxima_cidade, 
                Proxima_estado, 
                Proxima_pais, 
                Motivo, 
                Meio_transporte, 
                Observacoes
            ) VALUES (
                ?, ?, ?, 
                ?, ?, date(?), 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?, ?, ?, 
                ?
            )`,
            [
                hotelGuest.Id_hospede, hotelGuest.Hospedagem, hotelGuest.Nome, 
                hotelGuest.Email, hotelGuest.CPF, hotelGuest.Nascimento, 
                hotelGuest.Sexo, hotelGuest.Profissao, hotelGuest.Nacionalidade, 
                hotelGuest.Descricao_documento, hotelGuest.Tipo_documento, hotelGuest.Orgao_exp, 
                hotelGuest.DDI_celular, hotelGuest.DDD_celular, hotelGuest.Numero_celular, 
                hotelGuest.DDI_telefone, hotelGuest.DDD_telefone, hotelGuest.Numero_telefone, 
                hotelGuest.Endereco, hotelGuest.Numero, hotelGuest.Bairro, 
                hotelGuest.Cidade, hotelGuest.Estado, hotelGuest.Pais, 
                hotelGuest.CEP, hotelGuest.Ultima_cidade, hotelGuest.Ultima_estado, 
                hotelGuest.Ultima_pais, hotelGuest.Proxima_cidade, hotelGuest.Proxima_estado, 
                hotelGuest.Proxima_pais, hotelGuest.Motivo, hotelGuest.Meio_transporte, 
                hotelGuest.Observacoes
            ]
        );
        return rows;
        
    }

    static delete = async (id: any, hospedagem: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM HOSPEDE WHERE Id_hospede = ? and Hospedagem = ?`,[id, hospedagem]);
        return rows;
    }

    static update = async (id: any, hospedagem: any, hotelGuest: HotelGuestInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE HOSPEDE 
        SET Hospedagem = ?, 
            Nome = ?, 
            Email = ?, 
            CPF = ?, 
            Nascimento = ?, 
            Sexo = ?, 
            Profissao = ?, 
            Nacionalidade = ?, 
            Descricao_documento = ?, 
            Tipo_documento = ?, 
            Orgao_exp = ?, 
            DDI_celular = ?, 
            DDD_celular = ?, 
            Numero_celular = ?,
            DDI_telefone = ?, 
            DDD_telefone = ?, 
            Numero_telefone = ?, 
            Endereco = ?, 
            Numero = ?, 
            Bairro = ?, 
            Cidade = ?, 
            Estado = ?, 
            Pais = ?, 
            CEP = ?, 
            Ultima_cidade = ?, 
            Ultima_estado = ?, 
            Ultima_pais = ?, 
            Proxima_cidade = ?, 
            Proxima_estado = ?, 
            Proxima_pais = ?, 
            Motivo = ?, 
            Meio_transporte = ?, 
            Observacoes = ?
            WHERE Id_hospede = ? and Hospedagem = ?`,
            [hotelGuest.Hospedagem, hotelGuest.Nome, hotelGuest.Email, hotelGuest.CPF, hotelGuest.Nascimento, hotelGuest.Sexo, hotelGuest.Profissao, hotelGuest.Nacionalidade, hotelGuest.Descricao_documento, hotelGuest.Tipo_documento, hotelGuest.Orgao_exp, hotelGuest.DDI_celular, hotelGuest.DDD_celular, hotelGuest.Numero_celular, hotelGuest.DDI_telefone, hotelGuest.DDD_telefone, hotelGuest.Numero_telefone, hotelGuest.Endereco, hotelGuest.Numero, hotelGuest.Bairro, hotelGuest.Cidade, hotelGuest.Estado, hotelGuest.Pais, hotelGuest.CEP, hotelGuest.Ultima_cidade, hotelGuest.Ultima_estado, hotelGuest.Ultima_pais, hotelGuest.Proxima_cidade, hotelGuest.Proxima_estado, hotelGuest.Proxima_pais, hotelGuest.Motivo, hotelGuest.Meio_transporte, hotelGuest.Observacoes, id, hospedagem]
        );
        return rows;
    }
}

export default HotelGuest;
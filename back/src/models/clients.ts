import {Client as ClientInterface} from "../interfaces/clients";

import{connect} from "../db";

class Client{
    static getAll = async () => {

        const conn = await connect();
        const q = 'SELECT * FROM CLIENTE';
        const linhas = await conn.query(q);
        return linhas[0];
    };

    static findById = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`SELECT * FROM CLIENTE WHERE idCliente = ${id}`);
        return rows;
    };

    static delete = async (id: any) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`DELETE FROM CLIENTE WHERE idCliente = ${id}`);
        return rows;
    }

    static update = async (id: any, cliente: ClientInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`UPDATE CLIENTE 
            SET Nome = "${cliente.Nome}",
            Telefone = "${cliente.Telefone}",
            Pais_origem = "${cliente.Pais_origem}",
            Email = "${cliente.Email}",
            Senha = "${cliente.Senha}",
            Rua = "${cliente.Rua}",
            Numero = "${cliente.Numero}",
            Complemento = "${cliente.Complemento}",
            Bairro = "${cliente.Bairro}",
            Cidade = "${cliente.Cidade}",
            UF = "${cliente.UF}"
            WHERE idCliente = ${id}`
        );
        return rows;
    };

    static create = async (cliente: ClientInterface) => {
        const conn = await connect();
        const [rows, fields] = await conn.query(`INSERT INTO CLIENTE (Nome, Telefone, Pais_origem, Email, Senha, Rua, Numero, Complemento, Bairro, Cidade, UF)
            VALUES ("${cliente.Nome}", "${cliente.Telefone}", "${cliente.Pais_origem}", "${cliente.Email}", "${cliente.Senha}", "${cliente.Rua}", "${cliente.Numero}", "${cliente.Complemento}", "${cliente.Bairro}", "${cliente.Cidade}", "${cliente.UF}")`
        );
        return rows;
    }
}

export default Client;
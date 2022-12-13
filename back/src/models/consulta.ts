import { connect } from "../db";


class Consultas{
    static consultaA = async (cidadeHotel: string, dataInicio: string, dataFim: string) =>{
        const conn = await connect();
        const q = `SELECT  DISTINCT C.Nome, C.Email FROM CLIENTE C, RESERVA R, QUARTO Q, HOTEL H WHERE R.Data_in <= '${dataFim}' AND R.Data_out >= '${dataInicio}' AND C.idCliente = R.Cliente AND R.Quarto = Q.Numero AND Q.HOTEL = H.idHotel AND H.Cidade = '${cidadeHotel}'`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaB = async (cidadeHotel: string, dataInicio: string, dataFim: string, numeroQ: number) =>{
        const conn = await connect();
        // console.log(cidadeHotel, dataInicio,dataFim, numeroQ);
        const q = `SELECT DISTINCT F.Nome FROM FUNCIONARIO F, ARRUMACAO A, HOTEL H, QUARTO Q WHERE F.idFuncionario = A.Funcionario AND A.Quarto = Q.Numero AND Q.Hotel = H.idHotel and H.Cidade = '${cidadeHotel}' AND Q.Numero = '${numeroQ}' AND A.Data >='${dataInicio}' AND A.Data <= '${dataFim}'`; 
        const linhas = await conn.query(q);
        return linhas[0]; 
    };

    static consultaC = async (descricao: string) => {
        const conn = await connect();
        // console.log(cidadeHotel, dataInicio,dataFim, numeroQ);
        const q =`SELECT DISTINCT H.Nome AS Hotel, Q.Numero, C.Nome FROM HOTEL H, QUARTO Q, CLIENTE C, DESPESA D, RESERVA R WHERE D.Descricao = '${descricao}' AND  D.Cliente = C.idCliente AND R.Cliente = C.idCliente AND R.Data_in <= D.Data AND R.Data_out >= D.Data AND R.Quarto = Q.Numero AND Q.Hotel = H.idHotel`;
        const linhas = await conn.query(q);
        return linhas[0]; 
    }
    
};


export default Consultas;
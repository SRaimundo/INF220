import { connect } from "../db";


class Consultas{
    static consultaA = async (cidadeHotel: string, dataInicio: string, dataFim: string) =>{
        const conn = await connect();
        const q = `SELECT DISTINCT C.Nome,C.Email FROM CLIENTE C, HOTEL H, RESERVA R, HOSPEDAGEM HP WHERE HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente AND HP.Check_in <= '${dataFim}' AND (HP.Check_out IS NULL OR HP.Check_out >= '${dataInicio}') AND HP.Quarto IN (SELECT QUARTO.Numero FROM HOTEL, QUARTO WHERE QUARTO.Hotel = Id_hotel AND Cidade = '${cidadeHotel}')`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaB = async (cidadeHotel: string, dataInicio: string, dataFim: string, numeroQ: number) =>{
        const conn = await connect();
        // console.log(cidadeHotel, dataInicio,dataFim, numeroQ);
        const q = `SELECT F.Nome
            FROM FUNCIONARIO F, ARRUMACAO A, QUARTO Q, HOTEL H
            WHERE A.Funcionario = F.Id_funcionario AND A.Quarto = '${numeroQ}' AND A.Quarto = Q.Numero AND H.Id_hotel = Q.Hotel AND H.Cidade = '${cidadeHotel}' AND A.Data >= '${dataInicio}' AND A.Data <= '${dataFim}'`;
        const linhas = await conn.query(q);
        return linhas[0]; 
    };

    static consultaC = async (descricao: string) => {
        const conn = await connect();
        // console.log(cidadeHotel, dataInicio,dataFim, numeroQ);
        const q =
        `SELECT DISTINCT H.Nome as Hotel, HP.Quarto as Numero, C.Nome
        FROM HOTEL H, HOSPEDAGEM HP, DESPESA_HOTEL DH, CLIENTE C, RESERVA R
        WHERE HP.Hotel = H.Id_hotel AND HP.Reserva = R.Id_reserva AND C.Id_cliente = R.Cliente AND DH.Hospedagem = HP.Id_hospedagem AND DH.Descricao = '${descricao}'`;
        const linhas = await conn.query(q);
        return linhas[0]; 
    }

    static consultaH = async () => {
        const conn = await connect();
        const q =
        `SELECT V.Id_vaga as Vaga, H.Nome as Hotel
        FROM VAGA V, HOTEL H
        WHERE V.Hotel = 2 AND V.Hotel = H.Id_hotel AND V.Hospedagem IS NULL`;
        const linhas = await conn.query(q);
        return linhas[0]; 
    }

    
};


export default Consultas;
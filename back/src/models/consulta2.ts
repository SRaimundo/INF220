import { connect } from "../db";


class Consultas2{

    static consultaD = async (camasCasal: string) =>{
        const conn = await connect();
        const q =
        `SELECT H.Nome as Cidade, COUNT(Q.Numero) as count
        FROM QUARTO Q, HOTEL H, TIPO_QUARTO T
        WHERE Q.Hotel = H.Id_hotel AND Q.Tipo = T.Id_tipo AND T.Numero_camas_casal = ${camasCasal}
        GROUP BY Q.Hotel`;
        
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaE = async (cidade: string) =>{
        const conn = await connect();
        const q = 
        `SELECT DISTINCT C.Nome
        FROM RESERVA R, CLIENTE C, QUARTO Q, HOTEL H
        WHERE R.Cliente = C.Id_cliente AND Q.Hotel = H.Id_Hotel AND Q.Tipo = R.Tipo AND H.Cidade = "${cidade}" AND R.Id_reserva NOT IN (
        SELECT Reserva
        FROM HOSPEDAGEM);`;
        
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaF = async () =>{

        const conn = await connect();
        const q = 
        `SELECT SUM(DH.Valor) as Fatura, H.Nome as Cidade, C.Nome
        FROM DESPESA_HOTEL DH, HOSPEDAGEM HP, RESERVA R, CLIENTE C, HOTEL H
        WHERE DH.Hospedagem = HP.Id_hospedagem AND HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente AND HP.Hotel = H.Id_hotel
        GROUP BY DH.Hospedagem`;
        const linhas = await conn.query(q);
        return linhas[0];

    }
    
};


export default Consultas2;
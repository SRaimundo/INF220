import { connect } from "../db";


class Consultas2{

    static consultaD = async (camasCasal: string) =>{
        const conn = await connect();
        const q = `SELECT H.Cidade , count(*) AS count FROM HOTEL H, QUARTO Q, TIPO_QUARTO T WHERE H.idHotel = Q.Hotel AND Q.Tipo = T.idTipo AND T.Numero_camas_casal = ${camasCasal} GROUP BY H.Cidade`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaE = async (cidade: string, data: string) =>{
        const conn = await connect();
        const q = `SELECT C.Nome, C.Email FROM CLIENTE C, RESERVA R, HOTEL H, QUARTO Q WHERE R.Data_in <= '${data}' AND R.Check_in = false AND C.idCliente = R.Cliente AND R.Quarto = Q.Numero AND Q.Hotel = H.idHotel AND H.Cidade = "${cidade}"`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaF = async () =>{

        const conn = await connect();
        const q = 
        `SELECT SUM(DH.Valor) as Fatura, H.Cidade, C.Nome
        FROM DESPESA_HOTEL DH, HOSPEDAGEM HP, RESERVA R, CLIENTE C, HOTEL H
        WHERE DH.Hospedagem = HP.Id_hospedagem AND HP.Reserva = R.Id_reserva AND R.Cliente = C.Id_cliente AND HP.Hotel = H.Id_hotel
        GROUP BY DH.Hospedagem`;
        const linhas = await conn.query(q);
        return linhas[0];

    }
    
};


export default Consultas2;
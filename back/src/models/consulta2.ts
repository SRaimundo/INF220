import { connect } from "../db";


class Consultas2{

    static consultaD = async (camasCasal: string) =>{
        const conn = await connect();
        const q = `SELECT H.Cidade , count(*) AS count FROM HOTEL H, QUARTO Q, TIPO_QUARTO T WHERE H.Id_hotel = Q.Hotel AND Q.Tipo = T.Id_tipo AND T.Numero_camas_casal = ${camasCasal} GROUP BY H.Cidade`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };

    static consultaE = async (cidade: string, data: string) =>{
        const conn = await connect();
        const q = `SELECT C.Nome, C.Email FROM CLIENTE C, RESERVA R, HOTEL H, QUARTO Q WHERE R.Data_in <= '${data}' AND R.Check_in = false AND C.Id_cliente = R.Cliente AND R.Quarto = Q.Numero AND Q.Hotel = H.Id_hotel AND H.Cidade = "${cidade}"`;
        const linhas = await conn.query(q);
        return linhas[0];
        
    };
    
};


export default Consultas2;
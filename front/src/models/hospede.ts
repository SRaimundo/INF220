import { number, string } from "prop-types";

export interface Hospede {
    Id_hospede: number;
    Hospedagem: number;
    Nome: string;
    Email: string;
    CPF: string;
    Nascimento: string;
    Sexo: string;
    Profissao:string;
    Nacionalidade: string;
    Descricao_documento: string;
    Tipo_documento: string;
    Orgao_exp: string;
    DDI_celular: string;
    DDD_celular: string;
    Numero_celular: string;
    DDD_telefone: string;
    DDI_telefone: string;
    Numero_telefone: string;
    Endereco: string;
    Bairro: string;
    Numero: string;
    Cidade: string;
    Estado: string;
    Pais: string;
    CEP: string;
    Ultima_cidade: string;
    Ultima_estado: string;
    Ultima_pais: string;
    Proxima_cidade: string;
    Proxima_estado: string;
    Proxima_pais: string;
    Motivo:number;
    Meio_transporte:number;
    Observacoes: string;
}

  
import api from './api';

export interface ConsultaA {
  Nome: string;
  Email: string;
}

export const consultaA = async (cidadeHotel:string, dataInicio:string, dataFim:string) => {
  try {
    const response = await api.get(`/consulta/${cidadeHotel}/${dataInicio}/${dataFim}`);
    return response.data as ConsultaA[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaB {
  Nome: string;
}

export const consultaB = async (
  cidadeHotel,
  numeroQuarto,
  dataInicio,
  dataFim
) => {
  try {
    const response = await api.get(`/consulta/${cidadeHotel}/${dataInicio}/${dataFim}/${numeroQuarto}`);
    return response.data as ConsultaB[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaC {
  Hotel: string;
  Numero: string;
  Nome: string;
}

export const consultaC = async (descricao) => {
  try {
    const response = await api.get(`/consulta/${descricao}`);
    return response.data as ConsultaC[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaD {
  Cidade: string;
  count: string;
}

export const consultaD = async (camasCasal) => {
  try {
    const response = await api.get(`/consulta2/${camasCasal}`);
    return response.data as ConsultaD[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const consultaE = async (cidade) => {
  try {
    const response = await api.get(`/consulta2/consultaE/${cidade}`);
    return response.data as ConsultaA[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaF {
  Fatura: number;
  Cidade: string;
  Nome: string;
}

export const consultaF = async () => {
  try {
    const response = await api.get('/consulta2');
    return response.data as ConsultaF[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaH {
  Vaga: number;
  Hotel: string;
}


export const consultaH = async () => {
  try {
    const response = await api.get('/consulta');
    return response.data as ConsultaH[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaG {
  filial: string;
  quantidade: string;
  vendas: number;
}

export const consultaG = async () => {
  try {
    const response = await api.get('/consulta-g');
    return response.data.data as ConsultaG[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface Gasto {
  Soma: number;
  Hospedagem: number;
}

export const Gasto = async (id, data) => {
  try {
    const response = await api.get(`/checkout/gastos/${id}/${data}`);
    return response.data as Gasto[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface Diaria {
  Valor: number;
  Hospedagem: number;
}

export const Diaria = async (id) => {
  try {
    const response = await api.get(`/checkout/diaria/${id}`);
    return response.data as Diaria[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

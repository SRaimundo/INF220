import api from './api';

export interface ConsultaA {
  nome: string;
  email: string;
}

export const consultaA = async (Cidade, dataEntrada, dataSaida) => {
  try {
    const response = await api.get('/consulta-a', {
      params: {
        Cidade,
        dataEntrada,
        dataSaida,
      },
    });
    return response.data.clientes as ConsultaA[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaB {
  nome: string;
}

export const consultaB = async (
  Cidade,
  numeroQuarto,
  dataEntrada,
  dataSaida
) => {
  try {
    const response = await api.get('/consulta-b', {
      params: {
        Cidade,
        numeroQuarto,
        dataEntrada,
        dataSaida,
      },
    });
    return response.data.funcionarios as ConsultaB[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaC {
  Cidade_hotel: string;
  numero_ap: string;
  cliente: string;
}

export const consultaC = async (produto) => {
  try {
    const response = await api.get('/consulta-c', {
      params: {
        produto,
      },
    });
    return response.data.data as ConsultaC[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaD {
  Cidade: string;
  count: string;
}

export const consultaD = async () => {
  try {
    const response = await api.get('/consulta-d');
    return response.data.camasCasal as ConsultaD[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const consultaE = async (Cidade) => {
  try {
    const response = await api.get('/consulta-e', {
      params: {
        Cidade,
      },
    });
    return response.data.clientes as ConsultaA[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export interface ConsultaF {
  Cidade: string;
  nome: string;
  valor_total: number;
}

export const consultaF = async () => {
  try {
    const response = await api.get('/consulta-f');
    return response.data.maioresContas as ConsultaF[];
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

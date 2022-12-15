export interface Expenditures {
  Id_despesa: number;
  Hospedagem: number;
  Data: Date;
  Descricao: string;
  Valor: number;
}

export interface ResturantExpeditures{
  Id_consumo: number;
  Hospedagem: number;
  Data: Date;
  Descricao: string;
  Valor: number;
  Entregue: boolean;
}

// export interface Expenditures {
//   idConsumo: number;
//   produto: string;
//   preco: number;
//   dataConsumo: Date;
//   entregueNoQuarto: boolean;
//   idHospedagem: number;
// }


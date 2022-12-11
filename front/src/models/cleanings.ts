export interface Cleanings {
  idArruma: number;
  dataArruma: Date;
  idFuncionario: number;
  idApartamento: number;
}

export interface CleaningsTable {
  Data: Date;
  Nome: string;
  Hotel: string;
  Quarto: string;
}

export interface Funcionario {
  idFuncionario: number;
  nome: string;
  tipoFuncionario: string;
}

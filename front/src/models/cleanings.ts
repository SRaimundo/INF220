export interface Cleanings {
  idArruma: number;
  dataArruma: Date;
  Id_funcionario: number;
  idApartamento: number;
}

export interface CleaningsTable {
  Data: Date;
  Nome: string;
  Hotel: string;
  Quarto: string;
}

export interface Funcionario {
  Id_funcionario: number;
  nome: string;
  tipoFuncionario: string;
}

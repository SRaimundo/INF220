export interface Cleanings {
  idArruma: number;
  dataArruma: Date;
  idFuncionario: number;
  idApartamento: number;
}

export interface CleaningsTable {
  idArruma: number;
  dataArruma: Date;
  funcionario: string;
  hotel: string;
  quarto: string;
}

export interface Funcionario {
  idFuncionario: number;
  nome: string;
  tipoFuncionario: string;
}

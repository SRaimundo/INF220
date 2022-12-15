export interface Cleanings {
  Quarto: number;
  Data: string;
  Hotel: number;
  Funcionario: number;
}

export interface CleaningsTable {
  Data: Date;
  Nome: string;
  Hotel: string;
  Quarto: string;
}

export interface Funcionario {
  Id_funcionario: number;
  Nome: string;
  Cargo: string;
}

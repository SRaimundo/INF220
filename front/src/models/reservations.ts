export interface Reservations {
  idReserva: number;
  Codigo: number;
  idTipo: number;
  idCliente: number;
  numPessoas: number;
  cancelada: boolean;
  dataPrevistaEntrada: Date;
  dataPrevistaSaida: Date;
}

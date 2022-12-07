export interface Reservations {
  idReserva: number;
  idHotel: number;
  idTipo: number;
  idCliente: number;
  numPessoas: number;
  cancelada: boolean;
  dataPrevistaEntrada: Date;
  dataPrevistaSaida: Date;
}

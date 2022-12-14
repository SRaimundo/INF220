export interface Reservations {
  Id_reserva: number;
  Codigo: number;
  Id_tipo: number;
  Id_cliente: number;
  numPessoas: number;
  cancelada: boolean;
  dataPrevistaEntrada: Date;
  dataPrevistaSaida: Date;
}

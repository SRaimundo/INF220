export interface Accommodations {
  Id_hospedagem: number;
  idApartamento: number;
  Id_reserva: number;
  dataEntrada: Date;
  dataSaida: Date;
  diaria: number;
  saida?: boolean;
}

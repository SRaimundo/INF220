export interface Accommodations {
  idHospedagem: number;
  idApartamento: number;
  idReserva: number;
  dataEntrada: Date;
  dataSaida: Date;
  diaria: number;
  saida?: boolean;
}

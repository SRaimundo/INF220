import { Reservations } from 'src/models/reservations';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/reserva');
    return response.data.reservas as Reservations[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/reserva/${id}`);
  return response.data.reserva as Reservations;
};

export const create = async (data) => {
  const response = await api.post('/reserva', data);
  return response.data as Reservations;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/reserva/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const cancel = async (id) => {
  const response = await api.put(`/reserva/${id}`);
  return response.status as number;
};

export const remove = async (id) => {
  const response = await api.delete(`/reserva/${id}`);
  return response.data.reserva[0] as Reservations;
};

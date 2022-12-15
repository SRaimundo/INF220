import { Reservations } from 'src/models/reservations';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/reservations');
    console.log(response);
    return response.data as Reservations[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data as Reservations;
};

export const create = async (data) => {
  const response = await api.post('/reservations', data);
  return response.data as Reservations;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/reservations/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const cancel = async (id) => {
  const response = await api.put(`/reservations/${id}`);
  return response.status as number;
};

export const remove = async (id) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data as Reservations;
};

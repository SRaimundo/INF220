import { Hospede } from 'src/models/hospede';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/hotelGuests');
    // console.log(response);
    return response.data as Hospede[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/hotelGuests/${id}`);
  return response.data.cliente as Hospede;
};

export const findSearch = async (search) => {
  const response = await api.get('/hotelGuests', { params: { nome: search } });
  return response.data as Hospede[];
};

export const create = async (data) => {
  const response = await api.post('/hotelGuests', data);
  return response.data as Hospede;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/hotelGuests/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/hotelGuests/${id}`);
  return response.data as Hospede;
};

import { Expenditures } from 'src/models/expenditures';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/hotelExpenses');
    return response.data as Expenditures[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findByAccommodation = async (Id_hospedagem) => {
  const response = await api.get(`/hotelExpenses/${Id_hospedagem}`);
  return response.data as Expenditures[];
};

export const create = async (data) => {
  const response = await api.post('/hotelExpenses', data);
  return response.data as Expenditures;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/hotelExpenses/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/hotelExpenses/${id}`);
  return response.data as Expenditures;
};

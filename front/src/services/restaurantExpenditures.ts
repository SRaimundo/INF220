import { ResturantExpeditures } from 'src/models/expenditures';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/restaurantExpenses');
    return response.data as ResturantExpeditures[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findByAccommodation = async (Id_hospedagem) => {
  const response = await api.get(`/restaurantExpenses/${Id_hospedagem}`);
  return response.data as ResturantExpeditures[];
};

export const create = async (data) => {
  const response = await api.post('/restaurantExpenses', data);
  return response.data as ResturantExpeditures;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/restaurantExpenses/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/restaurantExpenses/${id}`);
  return response.data as ResturantExpeditures;
};

import { Apartments } from 'src/models/apartments';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/apartamento');
    return response.data.apartamentos as Apartments[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/apartamento/${id}`);
  return response.data.apartamento as Apartments;
};

export const create = async (data) => {
  const response = await api.post('/apartamento', data);
  return response.data as Apartments;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/apartamento/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/apartamento/${id}`);
  return response.data.apartamento[0] as Apartments;
};

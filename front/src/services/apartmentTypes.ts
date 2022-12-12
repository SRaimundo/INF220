import { ApartmentTypes } from 'src/models/apartmentTypes';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/tipo-apartamento');
    return response.data as ApartmentTypes[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/tipo-apartamento/${id}`);
  return response.data.tipoApartamento as ApartmentTypes;
};

export const create = async (data) => {
  const response = await api.post('/tipo-apartamento', data);
  return response.data as ApartmentTypes;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/tipo-apartamento/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/tipo-apartamento/${id}`);
  return response.data as ApartmentTypes;
};

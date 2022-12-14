import { Apartments } from 'src/models/apartments';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/rooms');
    // console.log(response);
    return response.data as Apartments[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/rooms/${id}`);
  return response.data.apartamento as Apartments;
};

export const create = async (data) => {
  const response = await api.post('/rooms', data);
  return response.data as Apartments;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/rooms/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/rooms/${id}`);
  return response.data as Apartments;
};

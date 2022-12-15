import { Accommodations } from 'src/models/accommodations';
import { Expenditures } from 'src/models/expenditures';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/accommodations');
    return response.data as Accommodations[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/accommodations/${id}`);
  return response.data as Accommodations;
};

export const create = async (data) => {
  const response = await api.post('/accommodations', data);
  return response.data as Accommodations;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/accommodations/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/accommodations/${id}`);
  return response.data as Accommodations;
};

export const getDiarias = async (id) => {
  const response = await api.get(`/accommodations/diarias/${id}`);
  return response.data as Expenditures[];
};

export const checkout = async (id,data) => {
  const response = await api.post(`/hotelGuests/checkout/${id}/${data}`);
  return response.data as Accommodations;
};



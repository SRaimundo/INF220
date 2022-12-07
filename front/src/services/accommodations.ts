import { Accommodations } from 'src/models/accommodations';
import { Expenditures } from 'src/models/expenditures';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/hospedagem');
    return response.data.hospedagens as Accommodations[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/hospedagem/${id}`);
  return response.data.hospedagem as Accommodations;
};

export const create = async (data) => {
  const response = await api.post('/hospedagem', data);
  return response.data as Accommodations;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/hospedagem/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/hospedagem/${id}`);
  return response.data.hospedagem[0] as Accommodations;
};

export const getDiarias = async (id) => {
  const response = await api.get(`/hospedagem/diarias/${id}`);
  return response.data.diarias as Expenditures[];
};

export const checkout = async (id, data) => {
  const response = await api.post(`/hospedagem/checkout/${id}`, data);
  return response.data.hospedagem as Accommodations;
};

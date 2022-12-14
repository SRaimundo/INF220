import { Clients } from 'src/models/clients';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/hospede');
    return response.data as Clients[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/hospede/${id}`);
  return response.data.cliente as Clients;
};

export const findSearch = async (search) => {
  const response = await api.get('/hospede', { params: { nome: search } });
  return response.data as Clients[];
};

export const create = async (data) => {
  const response = await api.post('/hospede', data);
  return response.data as Clients;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/hospede/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/hospede/${id}`);
  return response.data as Clients;
};

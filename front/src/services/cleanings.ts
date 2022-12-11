import { Cleanings, CleaningsTable, Funcionario } from 'src/models/cleanings';
import api from './api';

export const findAll = async () => {
  try {
    const response = await api.get('/arruma');
    console.log(response);
    return response.data as CleaningsTable[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const findOne = async (id) => {
  const response = await api.get(`/arruma/${id}`);
  return response.data.arruma as Cleanings;
};

export const create = async (data) => {
  const response = await api.post('/arruma', data);
  return response.data as Cleanings;
};

export const update = async (id, data) => {
  try {
    const response = await api.patch(`/arruma/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const remove = async (id) => {
  const response = await api.delete(`/arruma/${id}`);
  return response.data.arruma[0] as Cleanings;
};

export const getCamareira = async () => {
  const response = await api.get('/funcionario?tipoFuncionario=camareira');
  return response.data.funcionarios as Funcionario[];
};

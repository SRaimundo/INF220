import { Accommodations } from 'src/models/accommodations';
import { Clients } from 'src/models/clients';
import api from './api';


export const Cliente = async (id) => {
    const response = await api.get(`/checkout/cliente/${id}`);
    return response.data as Clients;
};

// export const findAll = async () => {
//   try {
//     const response = await api.get('/accommodations');
//     return response.data as Accommodations[];
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
// export const create = async (data) => {
//   const response = await api.post('/accommodations', data);
//   return response.data as Accommodations;
// };

// export const update = async (id, data) => {
//   try {
//     const response = await api.patch(`/accommodations/${id}`, data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

// export const remove = async (id) => {
//   const response = await api.delete(`/accommodations/${id}`);
//   return response.data as Accommodations;
// };

// export const getDiarias = async (id) => {
//   const response = await api.get(`/accommodations/diarias/${id}`);
//   return response.data as Expenditures[];
// };

// export const checkout = async (id, data) => {
//   const response = await api.post(`/accommodations/checkout/${id}`, data);
//   return response.data as Accommodations;
// };

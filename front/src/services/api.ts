import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3333' });

api.interceptors.request.use((config) => {
  config.timeout = 5000;
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default api;

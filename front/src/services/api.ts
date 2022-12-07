import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((config) => {
  config.timeout = 5000;
  config.headers.common['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default api;

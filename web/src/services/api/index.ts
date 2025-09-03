import axios from 'axios';

export const api = axios.create({
  baseURL: '/'
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);


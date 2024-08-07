import axios from 'axios';
import { toast } from 'react-hot-toast';

import { STATUS } from 'enums/status';
import { getPersistData, removePersistData } from 'utils/getPersistData';
import store from 'store';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL as string,
  timeout: 100000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.access_token || getPersistData();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response?.data?.status === STATUS.UNAUTHORIZED) {
      toast.error('Token expired');
      removePersistData();
      window.location.href = '/sign-in';
    }
    return response;
  },
  (error) => {
    if (error.response.status === STATUS.UNAUTHORIZED) {
      toast.error('Token expired');
      removePersistData();
      window.location.href = '/sign-in';
    }
  },
);

export default instance;

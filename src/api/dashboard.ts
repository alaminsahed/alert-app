import axios from 'config/axios';
import API_ENDPOINTS from 'constants/apiEndpoints';
import { STATUS } from '../enums/status';

export const createIncident = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.CREATE_INCIDENTS, data);
    if (response?.status === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const listIncident = async () => {
  try {
    const response = await axios.post(API_ENDPOINTS.LIST_INCIDENTS);
    if (response?.data?.code === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const singleIncident = async (id: number) => {
  try {
    const response = await axios.post(API_ENDPOINTS.SINGLE_INCIDENTS(id));
    if (response?.data?.code === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

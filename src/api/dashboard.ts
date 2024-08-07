import axios from 'config/axios';
import API_ENDPOINTS from 'constants/apiEndpoints';
import { STATUS } from '../enums/status';

export const createIncident = async (data: any) => {
  try {
    const response = await axios.post(API_ENDPOINTS.CREATE_INCIDENTS, data);
    console.log(response);
    if (response?.status === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

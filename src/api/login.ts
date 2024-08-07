import axios from 'config/axios';
import API_ENDPOINTS from 'constants/apiEndpoints';
import { STATUS } from 'enums/status';

export const login = async <T>(data: T) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, data);
    if (response?.data?.status === STATUS.SUCCESS) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    throw error;
  }
};

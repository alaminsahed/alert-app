import axios from 'config/axios';
import API_ENDPOINTS from 'constants/apiEndpoints';
import { STATUS } from 'enums/status';

export const RequestOtp = async <T>(data: T) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REQUEST_OTP, data);
    if (response?.data?.code === STATUS.SUCCESS) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const VerifyOtp = async <T>(data: T) => {
  try {
    const response = await axios.post(API_ENDPOINTS.VERIFY_OTP, data);
    if (response?.data?.code === STATUS.SUCCESS) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const areaList = async () => {
  try {
    const response = await axios.post(API_ENDPOINTS.AREA_LIST);
    if (response?.data?.code === STATUS.SUCCESS) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async <T>(data: T) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, data);
    if (response?.data?.code === STATUS.SUCCESS) {
      return response.data;
    } else {
      throw response.data;
    }
  } catch (error) {
    throw error;
  }
};

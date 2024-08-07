import axios from 'config/axios';
import API_ENDPOINTS from 'constants/apiEndpoints';
import { STATUS } from '../enums/status';

export const getDashboard = async (data: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.DASHBOARD(data));
    if (response?.status === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getDashBoardDeposit = async (data: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.DASHBOARD_PAYMENTS(data));
    if (response?.status === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getDashBoardInvoice = async (data: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.DASHBOARD_INVOICES(data));
    if (response?.status === STATUS.SUCCESS) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (error) {
    throw error;
  }
};

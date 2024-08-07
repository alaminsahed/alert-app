const API_ENDPOINTS = {
  REQUEST_OTP: '/v1/request-otp',
  VERIFY_OTP: '/v1/verify-otp',
  AREA_LIST: '/v1/areas/list',
  REGISTER: '/v1/register',
  CREATE_INCIDENTS: '/v1/incidents/create',
  LIST_INCIDENTS: '/v1/incidents/list',
  SINGLE_INCIDENTS: (id: number) => `/v1/incidents/${id}/show`,
};

export default API_ENDPOINTS;

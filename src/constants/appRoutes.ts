export const PUBLIC = {
  SIGN_IN: '/login',
  OTP: (number: any, type: any) => `/otp/${number}/${type}`,
  REGISTER: (otp: any, number: any) => `/register/${otp}/${number}`,
};

export const PRIVATE = {
  HOME: '/',
  CREATE_INCIDENT: '/create-incident',
  VIEW_INCIDENT: '/view-incident',
};

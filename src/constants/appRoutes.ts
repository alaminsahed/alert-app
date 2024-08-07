export const PUBLIC = {
  SIGN_IN: '/login',
  OTP: (number: any) => `/otp/${number}`,
  REGISTER: (otp: any, number: any) => `/register/${otp}/${number}`,
};

export const PRIVATE = {
  HOME: '/',
  CREATE_INCIDENT: '/create-incident',
  VIEW_INCIDENT: (id: unknown) => `/view-incident/${id}`,
};

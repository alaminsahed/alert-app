export const PUBLIC = {
  SIGN_IN: '/login',
  OTP: (number: any) => `/otp/${number}`,
  REGISTER: '/register',
};

export const PRIVATE = {
  HOME: '/',
  CREATE_INCIDENT: '/create-incident',
  VIEW_INCIDENT: '/view-incident',
};

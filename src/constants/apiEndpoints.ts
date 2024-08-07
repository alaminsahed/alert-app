const API_ENDPOINTS = {
  LOGIN: '/api/v1/login',

  DASHBOARD: (query: Record<string, string>): string => {
    const queryString = new URLSearchParams(query).toString();
    return `/api/v1/dashboard?${queryString}`;
  },
  INVOICE_DETAILS: '/api/v1/invoices',
  INVOICE: '/api/v1/invoice',
  DEPOSIT_DETAILS: '/api/v1/payments',
  CRATE_DEPOSIT: '/api/v1/payment',

  DISTRIBUTORS: '/api/v1/distributors',
  BANKS: '/api/v1/banks',
  UPLOAD: '/v1/upload',
  SETTLEMENT_LIST: (query: Record<string, string>): string => {
    const queryString = new URLSearchParams(query).toString();
    return `/api/v1/settlements?${queryString}`;
  },
  UPLOAD_SETTLEMENT: '/api/v1/settlement',
  REPORTS: '/api/v1/reconciliation',
  BANK_BRANCH: (query: Record<string, string>): string => {
    const queryString = new URLSearchParams(query).toString();
    return `/api/v1/branches?${queryString}`;
  },
  INVOICE_INFO: '/api/v1/invoice-details',
  ALL_TRANSACTIONS: '/api/v1/transaction-list',
  DASHBOARD_PAYMENTS: (query: Record<string, string>): string => {
    const queryString = new URLSearchParams(query).toString();
    return `/api/v1/weekly-payments?${queryString}`;
  },
  DASHBOARD_INVOICES: (query: Record<string, string>): string => {
    const queryString = new URLSearchParams(query).toString();
    return `/api/v1/weekly-payments-status?${queryString}`;
  },
  PAYMENT: (id: number) => `/api/v1/payments/${id}`,

  // CHANGE_REPORT_STATUS: (
  //   query: Record<string, string>,
  // ): ((id: number) => string) => {
  //   const queryString = new URLSearchParams(query).toString();
  //   return (id: number) => `/api/v1/reconciliations/${id}?${queryString}`;
  // },

  CHANGE_REPORT_STATUS: (id: number) => `/api/v1/reconciliations/${id}`,
  OUT_STANDING_INVOICE: '/api/v1/invoice-outstanding',
  ADD_DISTRIBUTOR: '/api/v1/distributors',

  CREATE_INCIDENTS: '/v1/incidents/create',
};

export default API_ENDPOINTS;

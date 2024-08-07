export const getStatusColor = (status: any) => {
  switch (status) {
    case 'DEPOSIT_PENDING':
      return 'yellow';
    case 'DEPOSITED':
      return 'green';
    case 'RECEIVED':
      return 'green';
    case 'RECONCILED':
      return 'blue';
    case 'DEPOSIT_RECEIVED':
      return 'green';
    case 'NOTIFICATION_RECEIVED':
      return 'green';
    default:
      return 'orange';
  }
};

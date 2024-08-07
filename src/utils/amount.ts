export const amountSeparator = (amount: any) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

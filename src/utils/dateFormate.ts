import dayjs from 'dayjs';
import 'dayjs/locale/en';

export const getTimeFromDate = (date: string) => {
  if (!date) return 'N/A';
  return dayjs(date).format('h:mm A');
};

export const getDateFormate = (date: string) => {
  if (!date) return 'N/A';
  const formattedDate = dayjs(date).format('D MMMM YYYY');
  return formattedDate;
};

import { format, isLeapYear } from 'date-fns';

type LimitType = 'any' | 'present';
const monthsWith30Days = ['04', '06', '09', '11'];
const monthsWith31Days = ['01', '03', '05', '07', '08', '10', '12'];
const february = '02';
const today = new Date();

/**
 * Mask for formatting date input in DD/MM/YYYY format.
 *
 * It validates the day, to avoid invalid dates such as 31/02/2023.
 *
 * It checks leap years for February and ensures the day does not exceed the maximum for each month.
 *
 * If the date is in the future, it returns today's date.
 *
 * @param {string} value - The input value to be formatted.
 * @returns {string} - The formatted date string in DD/MM/YYYY format.
 */
const dateMask = (value: string, limit: LimitType = 'any') => {
  // Remove all non-digit characters
  const cleanedValue = value.replace(/\D/g, '');

  // Limit the length to 8 digits
  const limitedValue = cleanedValue.slice(0, 8);

  // Format the value as DD/MM/YYYY
  const formattedValue = limitedValue.replace(
    /(\d{2})(\d{2})(\d{0,4})/,
    (match, p1, p2, p3) => {
      if (p1 > 31) {
        return '31/';
      }
      if (!p2) {
        return `${p1}/`;
      }
      if (p2 > 12) {
        return `${p1}/12/`;
      }

      // Verify the maximum day for February
      if (p2 === february && p3.length === 4) {
        const isLeap = isLeapYear(new Date(Number(p3), 0, 1));
        const maxDay = isLeap ? 29 : 28;
        if (p1 > maxDay) {
          return `${maxDay}/02/${p3}`;
        }
      }

      // April, June, September, or November and the day max day is 30
      if (monthsWith30Days.includes(p2) && p1 > 30) {
        return `30/${p2}/${p3}`;
      }

      // January, March, May, July, August, October, or December and the day max day is 31
      if (monthsWith31Days.includes(p2) && p1 > 31) {
        return `31/${p2}/${p3}`;
      }

      // If the date is in the future, return today's date
      const isFutureDate =
        new Date(Number(p3), Number(p2) - 1, Number(p1)) > today;
      if (limit === 'present' && isFutureDate) {
        return format(today, 'dd/MM/yyyy');
      }

      return p3 ? `${p1}/${p2}/${p3}` : `${p1}/${p2}`;
    },
  );

  return formattedValue;
};
export default dateMask;

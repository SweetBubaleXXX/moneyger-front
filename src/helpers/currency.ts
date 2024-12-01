import { CurrencyCode } from '../api/types';

export const formatCents = (amountCents: number, currency: CurrencyCode): string => {
  const amount = amountCents / 100;
  if (Number.isInteger(amount)) {
    return amount.toString();
  }
  const oneDecimal = amount.toFixed(1);
  const twoDecimals = amount.toFixed(2);
  return Number(oneDecimal) === Number(twoDecimals) ? oneDecimal : twoDecimals;
};

export const centsFromString = (amountString: string, currency: CurrencyCode): number => {
  const cleanedString = amountString.replace(/[^0-9.]/g, '');
  const amount = Number(cleanedString);
  return Math.round(amount * 100);
};

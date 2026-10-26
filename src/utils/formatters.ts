export const formatCurrency = (
  amountNgn: number,
  currency: 'NGN' | 'GBP' | 'USD' = 'NGN'
): string => {
  // Approximate standard diaspora benchmark rates
  const NGN_PER_GBP = 2000;
  const NGN_PER_USD = 1550;

  if (currency === 'GBP') {
    const gbp = Math.round(amountNgn / NGN_PER_GBP);
    return `£${gbp.toLocaleString('en-GB')}`;
  }

  if (currency === 'USD') {
    const usd = Math.round(amountNgn / NGN_PER_USD);
    return `$${usd.toLocaleString('en-US')}`;
  }

  return `₦${amountNgn.toLocaleString('en-NG')}`;
};

export const formatSpecificCurrency = (amount: number, curr: 'NGN' | 'GBP' | 'USD'): string => {
  if (curr === 'GBP') return `£${amount.toLocaleString('en-GB')}`;
  if (curr === 'USD') return `$${amount.toLocaleString('en-US')}`;
  return `₦${amount.toLocaleString('en-NG')}`;
};

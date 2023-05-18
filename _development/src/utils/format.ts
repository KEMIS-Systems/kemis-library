export const { format: formatPrice } = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
});

export const onlyNumber = (value: string) => {
  return value.replace(/\D/g, '');
};

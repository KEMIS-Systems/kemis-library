export const { format } = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

export const onlyNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const salePrice = (price: number, sale = 0) => {
  return Math.ceil(price * (100 - sale) * 0.01);
};

export const calcTotalPrice = (product) => {
  return product.reduce((sum, objProduct) => objProduct.price * objProduct.count + sum, 0);
};

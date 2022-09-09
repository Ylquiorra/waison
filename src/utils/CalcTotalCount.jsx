export const calcTotalCount = (product) => {
  return product.reduce((sum, objProduct) => objProduct.count + sum, 0);
};

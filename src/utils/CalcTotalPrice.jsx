export const calcDefaultPrice = (productDefaultPrice) => {
  return productDefaultPrice.reduce((sum, objProduct) => objProduct.defaultPrice * objProduct.count + sum, 0);
};

export const calcSalePrice = (productSalePrice) => {
  return productSalePrice.reduce((sum, objProduct) => objProduct.sale * objProduct.count + sum, 0);
};

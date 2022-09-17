//* Доделать калькуляцию (не может сложить price c sale)

export const calcTotalPrice = (product) => {
  if (product.find((obj) => obj.sale > 10)) {
    return product.reduce((sum, objProduct) => objProduct.sale * objProduct.count + sum, 0);
  } else {
    return product.reduce((sum, objProduct) => objProduct.price * objProduct.count + sum, 0);
  }
};

import { createSlice } from '@reduxjs/toolkit'

import { calcDefaultPrice, calcSalePrice } from '../../utils/CalcTotalPrice'
import { calcTotalCount } from '../../utils/CalcTotalCount'

const initialState = {
  productInCart: [],
  defaultPrice: 0,
  salePrice: 0,
  totalPrice: 0,
  totalCount: 0,
  valueCount: 1,
}

const productCartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {

    addProductToCart(state, action) {
      const findProductById = state.productInCart.find((obj) => obj.id === action.payload.id)
      if (findProductById) {
        findProductById.count++
      } else if (state.valueCount > 1) {
        state.productInCart.push({
          ...action.payload,
          count: state.valueCount,
        })
      } else {
        state.productInCart.push({
          ...action.payload,
          count: 1,
          defaultPrice: action.payload.defaultPrice || 0,
          sale: action.payload.sale || 0,
        })
      }
      state.totalCount = calcTotalCount(state.productInCart)
      if (state.productInCart.find((obj) => obj.sale > '0')) {
        state.salePrice = calcSalePrice(state.productInCart);
      }
      state.defaultPrice = calcDefaultPrice(state.productInCart)
      state.totalPrice = state.salePrice + state.defaultPrice

    },
    minusProductInCart(state, action) {
      const findProductById = state.productInCart.find((obj) => obj.id === action.payload)
      if (findProductById) {
        findProductById.count--;
      }
      if (state.productInCart.find((obj) => obj.sale > '0')) {
        state.salePrice = calcSalePrice(state.productInCart);
      }
      state.defaultPrice = calcDefaultPrice(state.productInCart)
      state.totalPrice = state.salePrice + state.defaultPrice
    },
    removeProductInCart(state, action) {
      state.productInCart = state.productInCart.filter((obj) => obj.id !== action.payload);

      if (state.productInCart.find((obj) => obj.sale > '0')) {
        state.salePrice = calcSalePrice(state.productInCart);
      }
      state.defaultPrice = calcDefaultPrice(state.productInCart)
      state.totalPrice = state.salePrice + state.defaultPrice
    },
    clearProductInCart(state) {
      state.productInCart = [];
      state.defaultPrice = 0;
      state.salePrice = 0;
      state.totalPrice = 0;
      state.totalCount = 0;
      state.valueCount = 1
    },
    setValueCount(state, action) {
      state.valueCount = action.payload
    }
  }
})

export const { addProductToCart, minusProductInCart, removeProductInCart, setValueCount, clearProductInCart } = productCartSlice.actions

export default productCartSlice.reducer
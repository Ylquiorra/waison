import { createSlice } from '@reduxjs/toolkit'

import { calcTotalPrice } from '../../utils/CalcTotalPrice'
import { calcTotalCount } from '../../utils/CalcTotalCount'

const initialState = {
  productInCart: [],
  totalPrice: 0,
  totalCount: 0,
}

const productCartSlice = createSlice({
  name: 'productsCart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const findProductById = state.productInCart.find((obj) => obj.id === action.payload.id)
      console.log('action', action.payload);
      if (findProductById) {
        findProductById.count++ 
      }
      state.productInCart.push({
        ...action.payload,
        count: 1,
      })
      console.log('state', state);
      state.totalCount = calcTotalCount(state.productInCart)
      state.totalPrice = calcTotalPrice(state.productInCart);
    },
    minusProductInCart(state, action) {
      const findProductById = state.productInCart.find((obj) => obj.id === action.payload)
      if (findProductById) {
        findProductById.count--;
      }
      state.totalCount = calcTotalCount(state.productInCart)
      state.totalPrice = calcTotalPrice(state.productInCart);
    },
    removeProductInCart(state, action) {
      state.productInCart = state.productInCart.filter((obj) => obj.id !== action.payload);
      state.totalCount = calcTotalCount(state.productInCart)
      state.totalPrice = calcTotalPrice(state.productInCart);
    }
  }
})

export const { addProductToCart, minusProductInCart, removeProductInCart } = productCartSlice.actions

export default productCartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

import { calcTotalPrice } from '../../utils/CalcTotalPrice'
import { calcTotalCount } from '../../utils/CalcTotalCount'

const initialState = {
  productInCart: [],
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
      } else {
        if (state.valueCount > 1) {
          state.productInCart.push({
            ...action.payload,
            count: state.valueCount,
          })
        } else {
          state.productInCart.push({
            ...action.payload,
            count: 1,
          })
        }

      }
      state.totalCount = calcTotalCount(state.productInCart)
      if (state.productInCart.sale) {

      }
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
    },
    setValueCount(state, action) {
      state.valueCount = action.payload
    }
  }
})

export const { addProductToCart, minusProductInCart, removeProductInCart, setValueCount } = productCartSlice.actions

export default productCartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productInWishlist: [],
}

const productWishlistSlice = createSlice({
  name: 'productsWishlist',
  initialState,
  reducers: {
    addProductToWishlist(state, action) {
      //? Пока работает, но нужно передать этот код (не помню )
      const findProductById = state.productInWishlist.find((obj) => obj.id === action.payload.id)
      if (findProductById) {
        findProductById.added = true;
      } else {
        state.productInWishlist.push({
          ...action.payload,
          defaultPrice: action.payload.defaultPrice || 0,
          sale: action.payload.sale || 0,
        })
      }
    },
    removeProductInCart(state, action) {
      state.productInWishlist = state.productInWishlist.filter((obj) => obj.id !== action.payload);
    }
  }
})

export const { addProductToWishlist, removeProductInCart } = productWishlistSlice.actions

export default productWishlistSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterSlice from './filter/slice'
import productSlice from './product/slice'
import productCartSlice from './productCart/slice'
import productWishlistSlice from './productWishlist/slice'
import userSlice from '../redux/user/slice'

export const store = configureStore({
  reducer: {
    filterSlice,
    productSlice,
    productCartSlice,
    productWishlistSlice,
    userSlice,
  },
})

export const useAppDispatch = useDispatch;
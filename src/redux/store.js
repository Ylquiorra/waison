import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterSlice from './filter/slice'
import productSlice from './product/slice'
import productCartSlice from './productCart/slice'
import productWishlistSlice from './productWishlist/slice'
import userSlice from './user/slice'
import userInformationSlice from './useInformation/slice'
import makeOrdersSlice from './makeOrder/slice'
import orderSlice from './order/slice'


export const store = configureStore({
  reducer: {
    filterSlice,
    productSlice,
    productCartSlice,
    productWishlistSlice,
    userSlice,
    userInformationSlice,
    makeOrdersSlice,
    orderSlice,
  },
})

export const useAppDispatch = useDispatch;
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import filterSlice from './filter/slice'
import clickOutsideSlice from './clickOutside/slice'
import productSlice from './product/slice'

export const store = configureStore({
  reducer: {
    filterSlice,
    clickOutsideSlice,
    productSlice
  },
})

export const useAppDispatch = useDispatch;
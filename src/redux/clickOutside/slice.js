import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openBurger: false,
  openSort: false,
  openCartPopup: false,
}

const clickOutsideSlice = createSlice({
  name: 'clickOutside',
  initialState,
  reducers: {
    setOpenBurger(state, action) {
      state.openBurger = action.payload;
    },
    setOpenSort(state, action) {
      state.openSort = action.payload;
    },
    setOpenCartPopup(state, action) {
      state.openCartPopup = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOpenBurger, setOpenSort, setOpenCartPopup } = clickOutsideSlice.actions

export default clickOutsideSlice.reducer
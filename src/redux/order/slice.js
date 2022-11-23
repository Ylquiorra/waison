import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  order: [],
  openOrder: [],
}

//СДЕЛАТЬ НОВЫЙ СТЕЙТ ДЛЯ ОТКРЫТЫХ
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload
    },
    setOpenOrder(state, action) {
      state.openOrder = action.payload
      console.log(action);
    },
  },
})



export const { setOrder, setOpenOrder } = orderSlice.actions

export default orderSlice.reducer
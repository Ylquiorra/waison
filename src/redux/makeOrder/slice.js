import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  makeOrder: [],
  orderPrice: 0,
  dateOrder: 'date',
  numberOfOrder: 0,
}

const makeOrdersSlice = createSlice({
  name: 'makeOrders',
  initialState,
  reducers: {
    setMakeOrder(state, action) {
      state.makeOrder.push({
        items: action.payload,
        informationOfOrder: {
          orderPrice: state.orderPrice,
          numberOfOrder: state.numberOfOrder
        }
      }
      )
    },
    setOrderPrice(state, action) {
      state.orderPrice = action.payload
    },
    setNumberOfOrder(state, action) {
      state.numberOfOrder = action.payload
    }
  },
})



export const { setMakeOrder, setOrderPrice, setNumberOfOrder } = makeOrdersSlice.actions

export default makeOrdersSlice.reducer
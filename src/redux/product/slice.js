import { createSlice } from '@reduxjs/toolkit'
import { fetchProductById } from './asyncActions'


const initialState = {
  product: [],
  status: 'loading'
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.status = 'loading';
      state.product = [];
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.product = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.status = 'error';
      state.product = [];
    })
  }
})

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions

export default productSlice.reducer
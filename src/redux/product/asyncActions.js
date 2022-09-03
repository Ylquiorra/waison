import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk('products/fetchProduct',
  async (paramsFetch) => {
    const { fetchPage, fetchCategory, fetchSortBy, fetchOrder, fetchSearch } = paramsFetch;
    const { data } = await axios.get(
      `https://630b2463f280658a59d6a747.mockapi.io/product?${fetchPage}${fetchCategory}&sortBy=${fetchSortBy}&order=${fetchOrder}${fetchSearch}`,
    );
    return data;

  },
);
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  currentPage: 1,
  changeSearchValue: '',
  changeSort: {
    name: 'Умолчанию',
    sortProperty: 'default',
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setChangeSearchValue(state, action) {
      state.changeSearchValue = action.payload;
    },
    setChangeSort(state, action) {
      state.changeSort = action.payload
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId)
      state.currentPage = Number(action.payload.currentPage)
      state.changeSearchValue = action.payload.changeSearchValue
      state.changeSort = action.payload.changeSort
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setCurrentPage, setChangeSearchValue, setChangeSort, setFilters } = filterSlice.actions

export default filterSlice.reducer
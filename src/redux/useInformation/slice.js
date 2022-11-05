import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInformation: []
}

const userInformationSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInformation(state, action) {
      state.userInformation = action.payload;
    }
  },
})

export const { setUserInformation } = userInformationSlice.actions

export default userInformationSlice.reducer
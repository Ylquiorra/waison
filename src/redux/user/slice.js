import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  id: null,
  currentNavigate: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      // переделать на UID
      state.id = { uid: action.payload.id };
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setCurrentNavigate(state, action) {
      state.currentNavigate = action.payload
    }
  },
});

export const { setUser, removeUser, setCurrentNavigate, setUserInformation } = userSlice.actions;

export default userSlice.reducer;

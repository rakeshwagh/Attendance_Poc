import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
};

const LoginUserSlice = createSlice({
  name: "LoginUserSlice",
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
    setLogout(state) {
      state.loggedInUser = null;
    },
  },
});

export const { setLoggedInUser, setLogout } = LoginUserSlice.actions;

export default LoginUserSlice.reducer;

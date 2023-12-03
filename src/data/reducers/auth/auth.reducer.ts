import {createSlice} from '@reduxjs/toolkit';
import {checkLogin, logoutUser} from './auth.actions';

type UserState = {
  authenticate: boolean;
  loggedUser:
    | {
        email: string;
        name: string;
        prefs: {
          role: string;
        };
      }
    | undefined;
};

const initialState: UserState = {
  authenticate: false,
  loggedUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(checkLogin.fulfilled, (state, {payload}) => {
      state.authenticate = true;
      state.loggedUser = payload;
    });
    builder.addCase(logoutUser.fulfilled, state => {
      state.authenticate = false;
      state.loggedUser = undefined;
    });
  },
});

export default authSlice.reducer;

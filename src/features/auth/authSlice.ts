import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  access_token: string;
  expires_in: number;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  access_token: '',
  expires_in: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload?.user;
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.access_token = '';
      state.expires_in = 0;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

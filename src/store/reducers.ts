import { combineReducers } from '@reduxjs/toolkit';
import authSlice from 'features/auth/authSlice';
import counterSlice from 'features/counter/counterSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  counter: counterSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

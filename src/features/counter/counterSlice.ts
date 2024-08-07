import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
  isCountAnimating: boolean;
}

const initialState: CounterState = {
  isCountAnimating: true,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCountAnimating: (state, action) => {
      state.isCountAnimating = action.payload;
    },
  },
});

export const { setCountAnimating } = counterSlice.actions;
export default counterSlice.reducer;

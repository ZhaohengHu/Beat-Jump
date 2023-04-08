import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levelNum: 1,
};

export const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    setLevelNum: (state, action) => {
      state.levelNum = action.payload;
    },
  },
});

export const { setLevelNum } = levelSlice.actions;

export default levelSlice.reducer; 
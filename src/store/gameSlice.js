import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  levelNum: 1,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setLevelNum: (state, action) => {
      state.levelNum = action.payload;
    },
  },
});

export const { setLevelNum } = gameSlice.actions;

export default gameSlice.reducer;
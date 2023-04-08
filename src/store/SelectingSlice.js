import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSelecting: false,
};

export const selectingSlice = createSlice({
  name: "selecting",
  initialState,
  reducers: {
    setIsSelecting: (state, action) => {
      state.isSelecting = action.payload;
    },
  },
});

export const { setIsSelecting } = selectingSlice.actions;
export default selectingSlice.reducer;
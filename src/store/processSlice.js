import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "waiting"
}

export const processSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        setProcess: (state, action) => {
            state.status = action.payload
        }
    }
})

export const { setProcess } = processSlice.actions;

export default processSlice.reducer;
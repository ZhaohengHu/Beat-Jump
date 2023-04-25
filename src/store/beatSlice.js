import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bpm: 60,
}

export const bpmSlice = createSlice({
    name: 'bpm',
    initialState,
    reducers: {
        setBpm: (state, action) => {
            state.bpm = action.payload
        }
    }
})

export const {setBpm} = bpmSlice.actions

export default bpmSlice.reducer
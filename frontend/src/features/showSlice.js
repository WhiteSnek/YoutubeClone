import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
    name: 'show',
    initialState: true,
    reducers: {
        setShow: (state, action) => {
            // action.payload will be the new value for 'show'
            return action.payload;
        }
    }
});

export const { setShow } = showSlice.actions;

export default showSlice.reducer;

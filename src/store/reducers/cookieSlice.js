import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true
};

const cookieSlice = createSlice({
    name: "cookiePolice",
    initialState,
    reducers: {
        setCookiePolice: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCookiePolice } = cookieSlice.actions;

export default cookieSlice.reducer;
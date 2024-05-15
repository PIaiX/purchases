import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    value: false
};

const rememberMeSlice = createSlice({
    name: 'rememberMe',
    initialState,
    reducers: {
        toggleRememberMe: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { toggleRememberMe } = rememberMeSlice.actions;
export default rememberMeSlice.reducer;
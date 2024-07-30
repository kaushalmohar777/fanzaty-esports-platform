// src/store/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    language: null,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLang(state, action) {
            state.language = action.payload;
        },
    },
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;

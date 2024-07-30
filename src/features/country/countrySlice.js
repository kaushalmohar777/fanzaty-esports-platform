import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    countryData: null,
};

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            state.countryData = action.payload;
        },

    },
});

export const { setCountry, } = countrySlice.actions;
export default countrySlice.reducer;
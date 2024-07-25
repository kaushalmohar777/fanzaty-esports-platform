import { createSlice } from '@reduxjs/toolkit'

// Check for token in local storage
const token = localStorage.getItem('token');

const initialState = {
    isLogin: !!token
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginState: (state, action) => {
            state.isLogin = action.payload;
        }
    }
})


export const { setLoginState } = loginSlice.actions;
export default loginSlice.reducer;

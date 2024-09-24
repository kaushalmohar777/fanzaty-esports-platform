import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    token: "",
    onlineUser: [],
    socketConnection: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state._id = ""
            state.name = ""
            state.email = ""
            state.profile_pic = ""
            state.token = ""
            state.socketConnection = null
        },
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload
        },
        setSocketConnection: (state, action) => {
            state.socketConnection = action.payload
        }

    },
});

export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } = userSlice.actions;
export default userSlice.reducer;
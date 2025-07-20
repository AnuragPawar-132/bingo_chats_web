import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser: {
        id: null,
        username: "",
        email: "",
        // token: ""
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedUser.id = action.payload.id;
            state.loggedUser.username = action.payload.username;
            state.loggedUser.email = action.payload.email;
            // state.loggedUser.token = action.payload.token;
        },
        logout: (state)=> {
            state.loggedUser.id = null;
            state.loggedUser.username = "";
            state.loggedUser.email = "";
            // state.loggedUser.token = "";
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
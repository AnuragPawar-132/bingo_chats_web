import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedUser: {
        id: null,
        username: "",
        email: "",
        token: ""
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {

        },
        logout: ()=> {

        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedFriend : {
        id: null,
        username: '',
        profile_image: ''
    }
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        chooseFriend: (state, action) => {
            state.selectedFriend.id = action.payload.id,
            state.selectedFriend.username = action.payload.username,
            state.selectedFriend.profile_image = action.payload.avatar_url
        }
    }
})

export const {chooseFriend} = chatSlice.actions;
export default chatSlice.reducer;
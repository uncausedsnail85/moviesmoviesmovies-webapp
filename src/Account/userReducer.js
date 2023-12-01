import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // null because server responds null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserToNull: (state, action) => {
            state.user = null;
        }
    },
});


export const { setUser, setUserToNull } = userSlice.actions;
export default userSlice.reducer;
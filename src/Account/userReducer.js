import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "", // "" because server responds ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserToNull: (state, action) => {
            state.user = "";
        }
    },
});


export const { setUser, setUserToNull } = userSlice.actions;
export default userSlice.reducer;
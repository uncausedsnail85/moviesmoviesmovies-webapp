import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Account/userReducer";

const store = configureStore({
  reducer: {
    userReducer,
  }
});


export default store;
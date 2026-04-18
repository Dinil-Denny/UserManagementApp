import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../store/slices/userAuthSlice";

//central hub connecting all your Redux state "slices".

export const store = configureStore({
    reducer : {
        userAuth : userAuthReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from './slices/dummy/dummy';
import userReducer from "./slices/user/user";

export const store = configureStore({
    reducer : {
        user : userReducer,
        dummy : dummyReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
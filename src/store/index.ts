import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from './slices/dummy/dummy';

export const store = configureStore({
    reducer: {
        dummy: dummyReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
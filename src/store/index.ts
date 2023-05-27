import { configureStore } from "@reduxjs/toolkit";
import dummyReducer from './slices/dummy/dummy';
import userReducer from "./slices/user/user";
import concertStateReducer from "./slices/concert/concert"
import groupStateReducer from "./slices/group/group"
import myConcertStateReducer from  "./slices/myconcert/myconcert"
import editorStateReducer from  "./slices/editor/editor"

export const store = configureStore({
    reducer : {
        user : userReducer,
        concertState : concertStateReducer,
        groupState : groupStateReducer,
        myConcertState : myConcertStateReducer,
        editorState : editorStateReducer,
        dummy : dummyReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
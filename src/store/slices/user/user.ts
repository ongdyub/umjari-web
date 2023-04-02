import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface SignUser {
    userId: string;
    password: string;
    email: string;
    nickname: string;
    intro: string;
    phoneNumber: string;
}

export interface User {
    user_id : string | null,
    phone : string | null;
    email : string | null;
    nickname : string | null;
    profile_img : string | null;
    isLogin : boolean;
    Token : string | null;
}

const initialState: User = {
    user_id : null,
    phone : null,
    email : null,
    nickname : null,
    profile_img : null,
    Token : (localStorage.getItem("Token") === null) ? null : localStorage.getItem("Token"),
    isLogin : (localStorage.getItem("Token") !== null)
};

export const testPingPong = createAsyncThunk(
    "user/testPingPong",
    async () => {
        const response = await axios.get('/api/v1/ping/')
        console.log(response)
        return response.data
    }
)

export const signUp = createAsyncThunk(
    "user/signUp",
    async (data: SignUser) => {
        const response = await axios.post('/api/v1/auth/signup/',data)
        return response.data
    }
)

export const login = createAsyncThunk(
    "user/login",
    async (data: Partial<SignUser>) => {
        const response = await axios.put('/api/v1/auth/login/',data)
        console.log(response)
        return response.data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // setToken: (
        //     state,
        //     action: PayloadAction<string>
        // ) => {
        //     state.token = action.payload;
        //     localStorage.setItem("token", action.payload)
        // },
        // loginUser: (
        //     state,
        //     action: PayloadAction<UserType>
        // ) => {
        //     state.isLogin = true;
        //     state.user = action.payload;
        //     if (action.payload.id) {
        //         localStorage.setItem("id", action.payload.id)
        //     }
        //     if (action.payload.username) {
        //         localStorage.setItem("username", action.payload.username)
        //     }
        //     if (action.payload.intro) {
        //         localStorage.setItem("intro", action.payload.intro)
        //     }
        //     if (action.payload.profile_img) {
        //         localStorage.setItem("profile_img", action.payload.profile_img)
        //     }
        //     if (action.payload.nickname) {
        //         localStorage.setItem("nickname", action.payload.nickname)
        //     }
        // },
        // logoutUser: (
        //     state,
        // ) => {
        //     state.user = null;
        //     state.token = null;
        //     state.isLogin = false;
        // },
        // editUser: (
        //     state,
        // ) => {
        //     state.user = null;
        //     state.token = null;
        //     state.isLogin = false;
        // },
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

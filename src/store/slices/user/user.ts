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
    name: string;
    // phoneNumber: string;
}

export interface User {
    user_id : string | null,
    // phone : string | null;
    email : string | null;
    nickname : string | null;
    profile_img : string | null;
    isLogin : boolean;
    accessToken : string | null;
}

const initialState: User = {
    user_id : null,
    // phone : null,
    email : null,
    nickname : null,
    profile_img : null,
    accessToken : (localStorage.getItem("Token") === null) ? null : localStorage.getItem("Token"),
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
    async (data: SignUser, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/v1/auth/signup/',data)
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const valEmailPost = createAsyncThunk(
    "user/valEmailPost",
    async (data: Partial<SignUser>, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/v1/mail-verification/', data);
            return response.data;
        } catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"]);
        }
    }
)

export const valCode = createAsyncThunk(
    "user/valCode",
    async (data: any) => {
        const response = await axios.post('/api/v1/mail-verification/validate/',data)
        return response.data
    }
)

export const valNamePost = createAsyncThunk(
    "user/valNamePost",
    async (data: Partial<SignUser>) => {
        const response = await axios.post('/api/v1/user/nickname/',data)
        return response.data
    }
)

export const login = createAsyncThunk(
    "user/login",
    async (data: Partial<SignUser>, { dispatch }) => {
        await axios.post('/api/v1/auth/login/',data).then(function (response) {
            console.log(response.data)
            dispatch(userActions.setUserId({user_id: data.userId}))
            dispatch(userActions.loginUser(response.data));
            return response.data
        })
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (
            state,
            action: PayloadAction<Partial<User>>
        ) => {
            state.isLogin = true;
            if (action.payload.accessToken) {
                state.accessToken = action.payload.accessToken
                localStorage.setItem("Token", action.payload.accessToken)
            }
        },
        setUserId: (
            state,
            action: PayloadAction<Partial<User>>
        ) => {
            if (action.payload.user_id) {
                state.user_id = action.payload.user_id;
                localStorage.setItem("user_id", action.payload.user_id)
            }
        },
        logoutUser: (
            state,
        ) => {
            state.user_id = null;
            // state.phone = null;
            state.email = null;
            state.nickname = null;
            state.profile_img = null;
            state.isLogin = false;
            localStorage.removeItem("Token")
            localStorage.removeItem("user_id")
            state.accessToken = null;
        },
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

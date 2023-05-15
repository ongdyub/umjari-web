import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {groupInfo, groupQnAItemGet, groupQnAListGet} from "../group/group";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface SignUser {
    userId: string;
    password: string;
    email: string;
    nickname: string;
    intro: string;
    profileName: string;
    // phoneNumber: string;
}

export interface User {
    // phone : string | null;
    email : string | null;
    profileName : string | null;
    profileImage : string | null | undefined;
    isLogin : boolean;
    accessToken : string | null;
    isModalOpen : boolean;
}

const initialState: User = {
    // phone : null,
    email : null,
    profileName : null,
    profileImage : null,
    accessToken : (localStorage.getItem("Token") === null) ? null : localStorage.getItem("Token"),
    isLogin : (localStorage.getItem("Token") !== null),
    isModalOpen : false
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
            dispatch(userActions.loginUser(response.data));
            return response.data
        })
    }
)

export const myInfoGet = createAsyncThunk(
    "user/myInfoGet",
    async (token: string, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/user/me/',{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
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
        logoutUser: (
            state,
        ) => {
            // state.phone = null;
            state.email = null;
            state.profileName = null;
            state.profileImage = null;
            state.isLogin = false;
            localStorage.removeItem("Token")
            localStorage.removeItem("id")
            state.accessToken = null;
        },
        openModal : (
            state,
        ) => {
            state.isModalOpen = true
        },
        closeModal : (
            state,
        ) => {
            state.isModalOpen = false
        },
        setHeaderImage : (
            state,
            action: PayloadAction<Partial<User>>
        ) => {
            state.profileImage = action.payload.profileImage
        },
        // editUser: (
        //     state,
        // ) => {
        //     state.user = null;
        //     state.token = null;
        //     state.isLogin = false;
        // },
    },

    extraReducers: (builder) => {
        builder.addCase(myInfoGet.fulfilled, (state, action) => {
            state.profileImage = action.payload.profileImage
            state.profileName = action.payload.profileName
        });
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

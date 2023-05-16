import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {groupInfo, groupQnAItemGet, groupQnAListGet} from "../group/group";
import {MyDefaultInfo} from "../myconcert/myconcert";
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
    nickname : string | null
    intro : string | null
}

const initialState: User = {
    // phone : null,
    email : null,
    profileName : null,
    profileImage : null,
    accessToken : (localStorage.getItem("Token") === null) ? null : localStorage.getItem("Token"),
    isLogin : (localStorage.getItem("Token") !== null),
    isModalOpen : false,
    nickname : null,
    intro : null
};

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

export const myNamePut = createAsyncThunk(
    "user/myNamePut",
    async ({token, data} : {token : string | null | undefined, data : Partial<User>}, {rejectWithValue}) => {
        try {
            const response = await axios.put('/api/v1/user/info/', data,{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            console.log(response.data)
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
        setMyName : (state, action: PayloadAction<Partial<User>>) => {
            if(state.profileName !== null && action.payload.profileName !== undefined){
                state.profileName = action.payload.profileName
            }
            if(state.nickname !== null && action.payload.nickname !== undefined){
                state.nickname = action.payload.nickname
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(myInfoGet.fulfilled, (state, action) => {
            state.profileImage = action.payload.profileImage
            state.profileName = action.payload.profileName
            state.nickname = action.payload.nickname
            state.intro = action.payload.intro
        });
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

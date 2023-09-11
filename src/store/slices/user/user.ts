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
    profileName: string;
    // phoneNumber: string;
}

export interface UserGroup {
    groupId: number;
    groupName : string;
    joinedAt: string | null
    leavedAt: string | null
    memberType : string
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
    career : [UserGroup] | []
    regionParent : string | null
    regionChild : string | null
    refreshed : boolean
}

const initialState: User = {
    // phone : null,
    email : null,
    profileName : (localStorage.getItem("profileName") === null) ? null : localStorage.getItem("profileName"),
    profileImage : null,
    accessToken : (localStorage.getItem("Token") === null) ? null : localStorage.getItem("Token"),
    isLogin : (localStorage.getItem("Token") !== null),
    isModalOpen : false,
    nickname : null,
    intro : null,
    career : [],
    regionParent : null,
    regionChild : null,
    refreshed : false
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

export const findEmailPost = createAsyncThunk(
    "user/findEmailPost",
    async (data: Partial<SignUser>, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/v1/auth/id-find/', data);
            return response.data;
        } catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"]);
        }
    }
)

export const resetPw = createAsyncThunk(
    "user/resetPw",
    async (data: Partial<SignUser>, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/v1/auth/password-reset/', data);
            return response.data;
        } catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"]);
        }
    }
)

export const changePw = createAsyncThunk(
    "user/changePw",
    async (data: {currentPassword : string, newPassword : string, token : string | null | undefined}, {rejectWithValue}) => {
        try {
            const response = await axios.put('/api/v1/auth/password/', data, {
                headers: {
                    Authorization: `Bearer  ${data.token}`,
                },
            });
            return response.data;
        } catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"]);
        }
    }
)

export const valCode = createAsyncThunk(
    "user/valCode",
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/v1/mail-verification/validate/',data)
            return response.data;
        } catch (err : any) {
            return rejectWithValue(err.response);
        }
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
    async (data: Partial<SignUser>, { dispatch, rejectWithValue },) => {
        try {
            const response = await axios.post('/api/v1/auth/login/',data).then(function (response) {
                dispatch(userActions.loginUser(response.data));
                return response.data
            })
            return response.data
        } catch (err : any) {
            return rejectWithValue(err.response);
        }
    }
)

export const myInfoGet = createAsyncThunk(
    "user/myInfoGet",
    async ({token, profileName} : { token : string | null, profileName : string | undefined}, {rejectWithValue}) => {
        try {

            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/`,{
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
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response.data["errorCode"])
        }
    }
)

export const userGroupGet = createAsyncThunk(
    "user/userGroupGet",
    async (token : string | null | undefined, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/v1/user/my-group/',{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
        }
    }
)

export const userGroupTimePut = createAsyncThunk(
    "user/userGroupTimePut",
    async ({data, token} : {data : Partial<UserGroup>, token : string | undefined | null}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`/api/v1/group/${data.groupId}/register/timestamp/`,{joinedAt : data.joinedAt, leavedAt : data.leavedAt},{
                headers: {
                    Authorization: `Bearer  ${token}`,
                },
            })
            return response.data
        }
        catch (err : any) {
            return rejectWithValue(err.response)
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
            state.refreshed = true
            if (action.payload.profileName) {
                state.profileName = action.payload.profileName
                localStorage.setItem("profileName", action.payload.profileName)
            }
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
            localStorage.removeItem("profileName")
            state.accessToken = null;
            state.nickname = null;
            state.career = [];
            state.refreshed = false
        },
        setRefresh : (
            state,
        ) => {
            state.refreshed = true
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
            if(state.profileName !== null && action.payload.profileName !== undefined && action.payload.profileName !== null){
                state.profileName = action.payload.profileName
                localStorage.setItem("profileName", action.payload.profileName)
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
            state.regionParent = action.payload.regionParent
            state.regionChild = action.payload.regionChild
        });
        builder.addCase(userGroupGet.fulfilled, (state, action) => {
            state.career = action.payload.career
        });
        builder.addCase(userGroupGet.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(valCode.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(userGroupTimePut.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(login.rejected, () => {
            window.alert("아이디와 비밀번호가 일치하지 않습니다.")
        });
    },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

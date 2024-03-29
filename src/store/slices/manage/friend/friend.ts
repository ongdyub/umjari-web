import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface MyFriend {
    id: number,
    user: {
        id: number,
        profileName: string,
        profileImage: string
    }
}

export interface FriendList {
    contents: [MyFriend] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface Friend {
    currentFriend : FriendList | null,
    requestFriend : FriendList | null,
    isSelfProfile : boolean,
    loadingState : 'start' | 'load' | 'ok' | 'fail' | 'base'
}

const initialState: Friend = {
    currentFriend : null,
    requestFriend : null,
    isSelfProfile : false,
    loadingState : 'base'
};

export const isSelfGet = createAsyncThunk(
    "friend/isSelfGet",
    async ({profileName, token} : {profileName : string | undefined | null, token : string | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/`, {
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

export const getRequestFriend = createAsyncThunk(
    "friend/getRequestFriend",
    async ({token, param} : {token : string | undefined | null, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/friend/requests/`, {
                params : param,
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

export const getCurFriend = createAsyncThunk(
    "friend/getCurFriend",
    async ({profileName,token, param} : {profileName : string | undefined | null, token : string | undefined | null, param : any},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/user/profile-name/${profileName}/friends/`, {
                params : param,
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

export const requestFriendPost = createAsyncThunk(
    "friend/requestFriendPost",
    async ({token, data} : {token : string | undefined | null, data : any},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/friend/`, data, {
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

export const receiveFriendPost = createAsyncThunk(
    "friend/receiveFriendPost",
    async ({token, id} : {token : string | undefined | null, id : string | undefined | null | number},  {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/friend/approval/${id}/`, {},{
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

export const rejectFriendPost = createAsyncThunk(
    "friend/rejectFriendPost",
    async ({token, id} : {token : string | undefined | null, id : string | undefined | null | number},  {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/friend/rejection/${id}/`,{
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

export const rejectCurFriend = createAsyncThunk(
    "friend/rejectCurFriend",
    async ({token, id} : {token : string | undefined | null, id : string | undefined | null | number},  {rejectWithValue}) => {
        try {
            const response = await axios.delete(`/api/v1/friend/${id}/`,{
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


export const friendStateSlice = createSlice({
    name: "friendState",
    initialState,
    reducers: {
        resetFriendState: (state) => {
            state.currentFriend = null
            state.requestFriend = null
            state.loadingState = 'base'
            state.isSelfProfile = false
        },
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(isSelfGet.fulfilled, (state, action) => {
            state.isSelfProfile = action.payload.isSelfProfile
            state.loadingState = 'ok'
        });
        builder.addCase(isSelfGet.rejected, (state, action : any) => {
            state.loadingState = 'fail'
            if(action.payload.data["errorCode"] === 4005){
                window.alert("존재하지 않는 이름입니다.")
            }
            else{
                window.alert("오류발생. 새로고침 후 다시 시도해주세요. " + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(getRequestFriend.fulfilled, (state, action) => {
            state.requestFriend = action.payload
        });
        builder.addCase(getRequestFriend.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 4005){
                window.alert("존재하지 않는 이름입니다.")
            }
            else{
                window.alert("오류발생. 새로고침 후 다시 시도해주세요. " + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(getCurFriend.fulfilled, (state, action) => {
            state.currentFriend = action.payload
        });
        builder.addCase(getCurFriend.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 4005){
                window.alert("존재하지 않는 이름입니다.")
            }
            else{
                window.alert("오류발생. 새로고침 후 다시 시도해주세요. " + "네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(requestFriendPost.fulfilled, () => {
            window.alert("요청 완료.")
        });
        builder.addCase(requestFriendPost.rejected, (state, action : any) => {
            if(action.payload.data["errorCode"] === 41){
                window.alert("이미 요청을 보냈거나, 요청이 온 대상입니다.")
            }
            else{
                window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
            }
        });
        builder.addCase(receiveFriendPost.fulfilled, () => {
            window.alert("수락 완료.")
        });
        builder.addCase(receiveFriendPost.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(rejectFriendPost.fulfilled, () => {
            window.alert("거절 완료.")
        });
        builder.addCase(rejectFriendPost.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
        builder.addCase(rejectCurFriend.fulfilled, () => {
            window.alert("삭제 완료.")
        });
        builder.addCase(rejectCurFriend.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
    },
});

export const friendStateActions = friendStateSlice.actions;
export const selectFriend = (state: RootState) => state.friendState;

export default friendStateSlice.reducer;
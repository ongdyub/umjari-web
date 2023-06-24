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
            return rejectWithValue(err.response.data["errorCode"])
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
            return rejectWithValue(err.response.data["errorCode"])
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
        builder.addCase(isSelfGet.rejected, (state, action) => {
            state.loadingState = 'fail'
            if(action.payload === 4005){
                window.alert("존재하지 않는 이름입니다.")
            }
        });
        builder.addCase(getRequestFriend.fulfilled, (state, action) => {
            state.requestFriend = action.payload
        });
        builder.addCase(getRequestFriend.rejected, (state, action) => {
            if(action.payload === 4005){
                window.alert("존재하지 않는 이름입니다.")
            }
            else{
                window.alert("네트워크 오류." + action.payload)
            }
        });
    },
});

export const friendStateActions = friendStateSlice.actions;
export const selectFriend = (state: RootState) => state.friendState;

export default friendStateSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface myPost {
    id: number,
    board: string,
    title: string,
    replyCount: number,
    isAnonymous: boolean,
    likeCount: number,
    createdAt: string
}

export interface myPostList {
    contents: [myPost] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface myReply {
    id: number,
    post: {
        id: number,
        board: string,
        title: string
    },
    content: string,
    createdAt: string,
    likeCount: number
}

export interface myReplyList {
    contents: [myReply] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface myRepliedPost {
    id: number,
    board: string,
    title: string,
    replyCount: number,
    anonymous: boolean,
    likeCount: number,
    createdAt: string,
    liked: boolean,
    author: boolean
}

export interface myRepliedPostList {
    contents: [myRepliedPost] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface myQnA {
    id: number,
    group: {
        id: number,
        name: string,
        logo: string
    },
    title: string,
    createdAt: string,
    replyCount: number
}

export interface myQnAList {
    contents: [myQnA] | [],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface Community {
    post : myPostList | null,
    reply : myReplyList | null,
    repliedPost : myRepliedPostList | null,
    likedPost : myRepliedPostList | null,
    qna : myQnAList | null
}


const initialState: Community = {
    post : null,
    reply : null,
    repliedPost : null,
    likedPost : null,
    qna : null
};

export const getMyPost = createAsyncThunk(
    "community/getMyPost",
    async ({token} : {token : string | undefined | null},  {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/v1/me/posts/`, {
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

export const communityStateSlice = createSlice({
    name: "communityState",
    initialState,
    reducers: {
        resetMyCommunityState: (state) => {
            state.post = null
            state.reply = null
            state.repliedPost = null
            state.likedPost = null
            state.qna = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getMyPost.fulfilled, (state, action : any) => {
            state.post = action.payload
        });
        builder.addCase(getMyPost.rejected, (state, action : any) => {
            window.alert("네트워크 오류. " + action.payload.data["errorCode"] + " : " + action.payload.data["detail"] + " " + action.payload.data["content"])
        });
    },
});

export const communityStateActions = communityStateSlice.actions;
export const selectCommunity = (state: RootState) => state.communityState;

export default communityStateSlice.reducer;
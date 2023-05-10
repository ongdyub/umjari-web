import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
import {SignUser} from "../user/user";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export interface GroupInfo {
    id: number
    name: string,
    logo: string,
    practiceTime: string,
    audition: boolean,
    membershipFee: number,
    monthlyFee: number,
    region: string,
    regionDetail: string,
    homepage: string,
    detailIntro: string,
    recruit: boolean
}

export interface GroupRecruit {
    id: number,
    recruit: boolean,
    recruitInstruments: [string],
    recruitDetail: string
}

export interface GroupQnAComment {
    id: number,
    author: string,
    content: string,
    isAnonymous: boolean,
    updatedAt: string,
    createAt: string,
    isAuthor: {
        "id" : string,
        "profileImage": string,
        "profileName" : string
    },
    nickname: string
}

export interface GroupQnAItem {
    id: number,
    content: string,
    title: string,
    isAnonymous: boolean,
    replyList: [GroupQnAComment],
    createAt: string,
    updatedAt: string,
    nickname: string,
    authorInfo: {
        "profileName": string,
        "profileImage" : string,
        "id" : number
    },
    isAuthor: boolean
}

export interface GroupQnAList {
    contents: [
        {
            "id": number,
            "title": string,
            "isAnonymous": boolean,
            "updatedAt": string,
            "replyCount": number,
            "createAt": string,
        }
    ],
    totalPages: number,
    totalElements: number,
    currentPage: number
}

export interface GroupState {
    groupInfo: GroupInfo | null,
    groupRecruit: GroupRecruit | null,
    groupExist: boolean,

    groupQnAList : GroupQnAList | null,
    groupQnAItem : GroupQnAItem | null
}

const initialState: GroupState = {
    groupInfo: null,
    groupRecruit: null,
    groupExist : true,

    groupQnAList : null,
    groupQnAItem : null
};

export const groupInfo = createAsyncThunk(
    "group/groupInfo",
    async (id : number | string | undefined) => {
        const response = await axios.get(`/api/v1/group/${id}/`)
        return response.data
    }
)

export const groupQnAPost = createAsyncThunk(
    "group/groupQnAPost",
    async (data : any) => {
        const response = await axios.post(`/api/v1/group/${data.id}/qna/`,data.qnaData, {
            headers: {
                Authorization: `Bearer  ${data.token}`,
            },
        })
        console.log(response.data)
        return response.data
    }
)

export const groupQnAReplyPost = createAsyncThunk(
"group/groupQnAReplyPost",
    async ({ id, qid, token, data }: { id: string | null | undefined, qid: string | null | undefined, token : string | null | undefined, data : any }, {rejectWithValue}) => {
        try {
            const response = await axios.post(`/api/v1/group/${id}/qna/${qid}/reply/`,data, {
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

export const groupQnAListGet = createAsyncThunk(
    "group/groupQnAListGet",
    async ({ id, param }: { id: string | null | undefined, param: any }) => {
        const response = await axios.get(`/api/v1/group/${id}/qna/`, {params : param})
        console.log(response.data)
        return response.data
    }
)

export const groupQnAItemGet = createAsyncThunk(
    "group/groupQnAItemGet",
    async ({ id, qid, token }: { id: string | null | undefined, qid: string | null | undefined, token : string | null | undefined }) => {
        const response = await axios.get(`/api/v1/group/${id}/qna/${qid}/`,{
            headers: {
                Authorization: `Bearer  ${token}`,
            },
        })
        console.log(response.data)
        return response.data
    }
)

// export const concert = createAsyncThunk(
//     "concert/concert",
//     async (id: string | number | undefined) => {
//         const response = await axios.get(`/api/v1/concert/${id}/`)
//         return response.data
//     }
// )

export const groupStateSlice = createSlice({
    name: "groupState",
    initialState,
    reducers: {
        resetGroupInfo: (state) => {
            state.groupInfo = null
            state.groupExist = true
        },
        resetGroupQnA : (state) => {
            state.groupQnAList = null
        },
        resetGroupQnAItem : (state) => {
            state.groupQnAItem = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(groupInfo.fulfilled, (state, action) => {
            state.groupExist = true
            state.groupInfo = action.payload
        });
        builder.addCase(groupInfo.rejected, (state, action) => {
            state.groupExist = false
        });
        builder.addCase(groupQnAListGet.fulfilled, (state, action) => {
            state.groupQnAList = action.payload
        });
        builder.addCase(groupQnAItemGet.fulfilled, (state, action) => {
            state.groupQnAItem = action.payload
        });
    },
});

export const groupStateActions = groupStateSlice.actions;
export const selectGroup = (state: RootState) => state.groupState;

export default groupStateSlice.reducer;
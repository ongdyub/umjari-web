import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../..";
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
    content: string,
    anonymous: boolean,
    updatedAt: string,
    createAt: string
}

export interface GroupQnAItem {
    id: number,
    content: string,
    title: string,
    anonymous: boolean,
    replyList: [GroupQnAComment]
}

export interface GroupQnAList {
    contents: [
        {
            "id": number,
            "title": string,
            "anonymous": boolean,
            "updatedAt": string,
            "replyCount": number,
            "createAt": string
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
        console.log(response.data)
        return response.data
    }
)

export const groupQnAPost = createAsyncThunk(
    "group/groupQnAPost",
    async (data : any) => {
        const response = await axios.post(`/api/v1/group/${data.id}/qna/`,data.qnaData, {})
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
        }
    },

    extraReducers: (builder) => {
        builder.addCase(groupInfo.fulfilled, (state, action) => {
            state.groupExist = true
            state.groupInfo = action.payload
        });
        builder.addCase(groupInfo.rejected, (state, action) => {
            state.groupExist = false
        });
    },
});

export const groupStateActions = groupStateSlice.actions;
export const selectGroup = (state: RootState) => state.groupState;

export default groupStateSlice.reducer;